import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserData } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUserData);
  const name = userData ? userData.name : 'Личный кабинет';

  return <AppHeaderUI userName={name} />;
};
