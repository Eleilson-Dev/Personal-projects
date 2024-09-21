import { useUserContext } from '../../hooks/useUserContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedMenu = () => {
  const { isUserLoggedIn } = useUserContext();
  return !isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export const ProtectedActions = () => {
  const { isUserLoggedIn } = useUserContext();
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};