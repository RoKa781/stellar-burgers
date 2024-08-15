import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  selectAddedBunDetails,
  selectAddedIngredients
} from '../../services/slices/burgerConstructorSlice';
import {
  cleanOrderData,
  orderBurger,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/burgerOrderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../services/slices/userSlice';

type TconstructorItems = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

type TBun = {
  price: number;
};

export const BurgerConstructor: FC = () => {
  const addedIngredients = useSelector(selectAddedIngredients);
  const addedBunDetails = useSelector(selectAddedBunDetails);
  const user = useSelector(selectUserData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems: TconstructorItems = {
    bun: addedBunDetails,
    ingredients: addedIngredients
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const idIngredients = addedIngredients.map((ingredient) => ingredient._id);
    const bun = addedBunDetails?._id;
    if (bun) {
      idIngredients.push(bun, bun);
    }
    dispatch(orderBurger(idIngredients)).then(() => {
      dispatch(clearConstructor());
    });
  };
  const closeOrderModal = () => {
    dispatch(cleanOrderData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
