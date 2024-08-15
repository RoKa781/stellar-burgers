import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { TLoginError } from 'src/pages/login/login';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: TLoginError | string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  isLoading: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  isLoading: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginUserApi({ email, password });

      if (!data?.success) {
        return rejectWithValue(data.message);
      }

      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    });
  }
);

export const updateUser = createAsyncThunk(
  'user/updateData',
  async ({ email, name, password }: TRegisterData) => {
    const data = await updateUserApi({ email, name, password });
    if (!data.success) {
      return null;
    } else {
      return data.user;
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi({ email, name, password });
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Что-то пошло не так');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    },
    clearLoginError: (state) => {
      state.loginUserError = null;
    },
    clearRegisterError: (state) => {
      state.registerUserError = null;
    }
  },
  selectors: {
    selectUserAuthenticated: (state) => state.isAuthenticated,
    selectUserData: (state) => state.data,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectLoginError: (state) => state.loginUserError,
    selectRegisterError: (state) => state.registerUserError,
    selectIsLoadingUser: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.isLoading = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.data = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload as string;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserError = action.payload as string;
        state.data = null;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
        state.registerUserError = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.data = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      });
  }
});

export const { authChecked, userLogout, clearLoginError, clearRegisterError } =
  userSlice.actions;
export const {
  selectUserAuthenticated,
  selectUserData,
  selectIsAuthChecked,
  selectLoginError,
  selectRegisterError,
  selectIsLoadingUser
} = userSlice.selectors;

export const userReducer = userSlice.reducer;
