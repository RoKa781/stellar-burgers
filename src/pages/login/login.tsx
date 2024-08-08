import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearLoginError,
  loginUser,
  selectIsLoadingUser,
  selectLoginError
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export type TLoginError = {
  message: string;
};

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingUser);
  const loginError = useSelector(selectLoginError);

  useEffect(() => {
    dispatch(clearLoginError());

    return () => {
      dispatch(clearLoginError());
    };
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    dispatch(loginUser(userData)).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate('/');
      }
    });
  };

  const errorText = loginError ? (loginError as TLoginError).message : '';

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
