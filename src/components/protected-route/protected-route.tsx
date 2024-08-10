import { Preloader } from '@ui';
import { ReactNode, FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import {
  selectUserAuthenticated,
  selectIsAuthChecked
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const userAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();
  if (!userAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
