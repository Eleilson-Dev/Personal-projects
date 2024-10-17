import { Route, Routes } from 'react-router-dom';
import {
  ProtectedMenu,
  ProtectedActions,
  ProtectedValidate,
  ProtectedCreateProduct,
  ProtectedResetPass,
} from '../ProtectedRoutes';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { NotFound } from '../../pages/NotFound';
import { ValidateCode } from '../../pages/ValidateCode';
import { CreateProduct } from '../../pages/CreateProduct';
import { EditProduct } from '../../pages/EditProduct';
import { Recovering } from '../../pages/Recovering';
import { ValidateRecoverCode } from '../../pages/ValidateRecoverCode';
import { ResetPassword } from '../../pages/ResetPassword';

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
        <Route path="/validate" element={<ProtectedValidate />}>
          <Route index element={<ValidateCode />} />
        </Route>
        <Route path="/create/product" element={<ProtectedCreateProduct />}>
          <Route index element={<CreateProduct />} />
        </Route>
        <Route path="/edit/product/:id" element={<ProtectedCreateProduct />}>
          <Route index element={<EditProduct />} />
        </Route>
        <Route path="/reset/password" element={<ProtectedResetPass />}>
          <Route index element={<ResetPassword />} />
        </Route>
        <Route path="/validate/recover" element={<ValidateRecoverCode />} />
        <Route path="/recovering" element={<Recovering />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
