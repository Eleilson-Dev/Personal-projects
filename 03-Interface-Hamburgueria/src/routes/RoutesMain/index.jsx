import { Route, Routes } from 'react-router-dom';
import {
  ProtectedMenu,
  ProtectedActions,
  ProtectedValidate,
  ProtectedCreateProduct,
  ProtectedResetPass,
} from '../ProtectedRoutes';

import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { NotFound } from '../../pages/NotFound';
import { ValidateCode } from '../../pages/ValidateCode';
import { Recovering } from '../../pages/Recovering';
import { ValidateRecoverCode } from '../../pages/ValidateRecoverCode';
import { ResetPassword } from '../../pages/ResetPassword';
import { EditProducts } from '../../components/EditProducts';
import { CreateProducts } from '../../components/CreateProducts';
import { RenderMenu } from '../../components/RenderMenu';

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/menu/:productType" element={<ProtectedMenu />}>
          <Route index element={<RenderMenu />} />
        </Route>
        <Route path="/" element={<ProtectedActions />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<ProtectedActions />}>
          <Route index element={<Register />} />
        </Route>
        <Route path="/validate" element={<ProtectedValidate />}>
          <Route index element={<ValidateCode />} />
        </Route>
        <Route
          path="/create/:productType/product"
          element={<ProtectedCreateProduct />}
        >
          <Route index element={<CreateProducts />} />
        </Route>
        <Route
          path="/edit/:productType/:id"
          element={<ProtectedCreateProduct />}
        >
          <Route index element={<EditProducts />} />
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
