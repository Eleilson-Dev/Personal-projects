import { Route, Routes } from 'react-router-dom';
import {
  ProtectedMenu,
  ProtectedActions,
  ProtectedValidate,
  ProtectedCreateProduct,
  ProtectedResetPass,
} from '../ProtectedRoutes';

import { HamburguersMenu } from '../../pages/HamburguersMenu';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { NotFound } from '../../pages/NotFound';
import { ValidateCode } from '../../pages/ValidateCode';
import { Recovering } from '../../pages/Recovering';
import { ValidateRecoverCode } from '../../pages/ValidateRecoverCode';
import { ResetPassword } from '../../pages/ResetPassword';
import { RefrigerantesMenu } from '../../pages/RefrigerantesMenu';
import { PizzasMenu } from '../../pages/PizzasMenu';
import { EditProducts } from '../../components/EditProducts';
import { CreateProducts } from '../../components/CreateProducts';

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/menu/hamburguers" element={<ProtectedMenu />}>
          <Route index element={<HamburguersMenu />} />
        </Route>
        <Route path="/menu/pizzas" element={<ProtectedMenu />}>
          <Route index element={<PizzasMenu />} />
        </Route>
        <Route path="/menu/refrigerantes" element={<ProtectedMenu />}>
          <Route index element={<RefrigerantesMenu />} />
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
