import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { NotFound } from '../../pages/NotFound';
import { ProtectedMenu, ProtectedActions } from '../ProtectedRoutes';

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedMenu />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<ProtectedActions />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<ProtectedActions />}>
          <Route index element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
