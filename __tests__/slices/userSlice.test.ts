import {
  userReducer,
  initialState as initialUserState,
  authChecked,
  clearLoginError,
  loginUser,
  registerUser,
  getUser,
  logoutUser,
  updateUser
} from '../../src/services/slices/userSlice';

const localStorageMock: Storage = {
  clear: jest.fn(),
  getItem: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  length: 0
};

jest.mock('./../../src/utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('Слайс пользователя', () => {
  beforeAll(() => {
    global.localStorage = localStorageMock;
  });

  afterAll(() => {
    localStorage.clear();
    global.localStorage = localStorage;
  });

  test('проверка аутентификации пользователя', () => {
    const result = userReducer(initialUserState, { type: authChecked.type });
    expect(result.isAuthChecked).toBe(true);
  });

  test('очистка ошибок входа', () => {
    const testInitialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      data: null,
      loginUserError: 'error',
      loginUserRequest: false,
      registerUserError: null,
      isLoading: false
    };
    const result = userReducer(testInitialState, {
      type: clearLoginError.type
    });
    expect(result.loginUserError).toBe(null);
  });

  test('вход пользователя в процессе', () => {
    const result = userReducer(initialUserState, {
      type: loginUser.pending.type
    });
    const { loginUserRequest, isLoading, loginUserError } = result;
    expect(loginUserError).toBe(null);
    expect(isLoading).toBe(true);
    expect(loginUserRequest).toBe(true);
  });

  test('вход пользователя успешен', () => {
    const testPayload = {
      email: 'string',
      name: 'string'
    };
    const result = userReducer(initialUserState, {
      type: loginUser.fulfilled.type,
      payload: testPayload
    });
    const {
      isLoading,
      loginUserRequest,
      isAuthChecked,
      data,
      loginUserError,
      isAuthenticated
    } = result;

    expect(loginUserRequest).toBe(false);
    expect(isAuthenticated).toBe(true);
    expect(data).toBe(testPayload);
    expect(isAuthChecked).toBe(true);
    expect(isLoading).toBe(false);
    expect(loginUserError).toBe(null);
  });

  test('регистрация пользователя в процессе', () => {
    const result = userReducer(initialUserState, {
      type: registerUser.pending.type
    });
    expect(result.isLoading).toBe(true);
  });

  test('регистрация пользователя успешна', () => {
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {
      type: registerUser.fulfilled.type,
      payload: testPayload
    });
    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual(testPayload.user);
    expect(result.registerUserError).toBe('');
  });

  test('получение данных пользователя успешно', () => {
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {
      type: getUser.fulfilled.type,
      payload: testPayload
    });
    const { data, isLoading, loginUserRequest, isAuthenticated } = result;
    expect(data).toEqual(testPayload);
    expect(isLoading).toBe(false);
    expect(loginUserRequest).toBe(false);
    expect(isAuthenticated).toBe(true);
  });

  test('выход пользователя успешен', () => {
    const result = userReducer(initialUserState, {
      type: logoutUser.fulfilled.type
    });
    expect(result.data).toBe(null);
    expect(result.isAuthenticated).toBe(false);
  });

  test('обновление данных пользователя в процессе', () => {
    const result = userReducer(initialUserState, {
      type: updateUser.pending.type
    });
    expect(result.isLoading).toBe(true);
  });

  test('обновление данных пользователя успешно', () => {
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {
      type: updateUser.fulfilled.type,
      payload: testPayload
    });
    expect(result.data).toEqual(testPayload);
  });
});
