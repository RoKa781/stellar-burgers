import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearRegisterError,
  loginUser,
  registerUser,
  selectRegisterError,
  selectUserAuthenticated
} from '../../services/slices/userSlice';
import { TRegisterData } from '@api';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const registerErrorText = useSelector(selectRegisterError);
  const isAuthenticated = useSelector(selectUserAuthenticated);

  useEffect(() => {
    dispatch(clearRegisterError());

    return () => {
      dispatch(clearRegisterError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      await dispatch(loginUser(userData)).unwrap();
    } catch (error) {
      return;
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <RegisterUI
      errorText={registerErrorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
