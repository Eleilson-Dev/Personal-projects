import { useParams } from 'react-router-dom';

import { HamburguersMenu } from '../../pages/HamburguersMenu';
import { SavorysMenu } from '../../pages/SavorysMenu';
import { PizzasMenu } from '../../pages/PizzasMenu';
import { SodasMenu } from '../../pages/SodasMenu';
import { JuicesMenu } from '../../pages/JuicesMenu';
import { CakesMenu } from '../../pages/CakesMenu';

export const RenderMenu = () => {
  const { productType } = useParams();

  return (
    <>
      {productType === 'hamburguers' && <HamburguersMenu />}
      {productType === 'salgados' && <SavorysMenu />}
      {productType === 'pizzas' && <PizzasMenu />}
      {productType === 'refrigerantes' && <SodasMenu />}
      {productType === 'sucos' && <JuicesMenu />}
      {productType === 'bolos' && <CakesMenu />}
    </>
  );
};
