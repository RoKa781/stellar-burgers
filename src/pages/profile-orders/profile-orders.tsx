import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  clearUserOrders,
  getUserOrders,
  selectUserOrders,
  selectUserOrdersIsLoading
} from '../../services/slices/userOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserOrdersIsLoading);

  useEffect(() => {
    dispatch(getUserOrders());

    return () => {
      dispatch(clearUserOrders());
    };
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} isLoading={isLoading} />;
};
