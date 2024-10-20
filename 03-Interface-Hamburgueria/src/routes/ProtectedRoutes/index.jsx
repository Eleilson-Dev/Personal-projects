import { useUserContext } from '../../hooks/useUserContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedMenu = () => {
  const { isUserLoggedIn } = useUserContext();
  return !isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedActions = () => {
  const { isUserLoggedIn } = useUserContext();
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/menu/hamburguers" />;
};

export const ProtectedValidate = () => {
  const userId = sessionStorage.getItem('@USERID');
  return userId ? <Outlet /> : <Navigate to="/register" />;
};

export const ProtectedResetPass = () => {
  const TokenRecovery = sessionStorage.getItem('@TOKEN_RECOVERY');
  return TokenRecovery ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedCreateProduct = () => {
  const { user } = useUserContext();
  return user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/menu/hamburguers" />
  );
};
