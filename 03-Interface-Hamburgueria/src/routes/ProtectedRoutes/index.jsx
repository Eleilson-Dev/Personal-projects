import { useUserContext } from '../../hooks/useUserContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedMenu = () => {
  const { userIsLoged } = useUserContext();
  return !userIsLoged ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedActions = () => {
  const { userIsLoged } = useUserContext();
  return userIsLoged ? <Outlet /> : <Navigate to="/" />;
};
