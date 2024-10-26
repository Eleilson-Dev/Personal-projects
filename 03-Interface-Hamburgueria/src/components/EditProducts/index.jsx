import { useParams } from 'react-router-dom';

import { EditHamburguer } from './EditHamburguer';
import { EditPizza } from './EditPizza';
import { EditRefrigerante } from './EditRefrigerante';

export const EditProducts = () => {
  const { productType } = useParams();

  return (
    <>
      {productType === 'hamburguer' && <EditHamburguer />}
      {productType === 'pizza' && <EditPizza />}
      {productType === 'refrigerante' && <EditRefrigerante />}
    </>
  );
};
