import { TConstructorIngredient } from '../../src/utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  constructorIngredientsReducer,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  burgerConstructorSlice,
  initialState as burgerConstructorInitial
} from '../../src/services/slices/burgerConstructorSlice';

const bun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0
};

const meat = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: 0
};

const payload: TConstructorIngredient = {
  ...bun,
  id: '435'
};

const action: PayloadAction<TConstructorIngredient> = {
  type: burgerConstructorSlice.actions.addIngredient.type,
  payload: payload
};

const payloadMeat: TConstructorIngredient = {
  ...meat,
  id: '435'
};

const actionMeat: PayloadAction<TConstructorIngredient> = {
  type: burgerConstructorSlice.actions.addIngredient.type,
  payload: payloadMeat
};

describe('Проверяем редьюсер слайса burgerConstructor', () => {
  test('Добавление булки', () => {
    const result = constructorIngredientsReducer(
      burgerConstructorInitial,
      action
    );

    const { bun, addedIngredients } = result;

    expect(addedIngredients).toEqual([]);
    expect(bun.bunDetails).toEqual({
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      id: '435'
    });
  });

  test('Добавить мясо', () => {
    const result = constructorIngredientsReducer(
      burgerConstructorInitial,
      actionMeat
    );

    const { bun, addedIngredients } = result;

    expect(bun.bunDetails).toEqual(null);
    expect(addedIngredients).toEqual([{ ...meat, id: '435' }]);
  });

  test('Удаление ингредиента', () => {
    const initialState = {
      addedIngredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          id: '1'
        }
      ],
      bun: {
        _id: '',
        bunDetails: null
      }
    };
    const result = constructorIngredientsReducer(
      initialState,
      removeIngredient(initialState.addedIngredients[0])
    );
    expect(result.addedIngredients).toEqual([]);
  });

  test('Перемещаем', () => {
    const initialState = {
      addedIngredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          id: '1'
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          id: '2'
        }
      ],
      bun: {
        _id: '',
        bunDetails: null
      }
    };

    const resultMoveUp = constructorIngredientsReducer(
      initialState,
      moveUpIngredient(initialState.addedIngredients[1])
    );
    expect(resultMoveUp.addedIngredients[0].id).toBe('2');
    const resultMoveDown = constructorIngredientsReducer(
      initialState,
      moveDownIngredient(initialState.addedIngredients[0])
    );
    expect(resultMoveDown.addedIngredients[0].id).toBe('2');
  });
});
