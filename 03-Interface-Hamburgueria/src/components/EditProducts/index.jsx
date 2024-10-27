import { useParams } from 'react-router-dom';

import { EditHamburguer } from './EditHamburguer';
import { EditPizza } from './EditPizza';
import { EditSavory } from './EditSavory';
import { EditSoda } from './EditSoda';
import { EditJuice } from './EditJuice';

export const EditProducts = () => {
  const { productType } = useParams();

  return (
    <>
      {productType === 'hamburguer' && <EditHamburguer />}
      {productType === 'salgado' && <EditSavory />}
      {productType === 'pizza' && <EditPizza />}
      {productType === 'refrigerante' && <EditSoda />}
      {productType === 'suco' && <EditJuice />}
    </>
  );
};
