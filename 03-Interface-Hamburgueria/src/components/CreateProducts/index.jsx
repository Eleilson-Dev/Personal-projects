import { useParams } from 'react-router-dom';

import { CreateHamburguer } from './CreateHamburguer';
import { CreateSavory } from './CreateSavory';
import { CreatePizza } from './CreatePizza';
import { CreateSoda } from './CreateSoda';
import { CreateJuice } from './CreateJuice';

export const CreateProducts = () => {
  const { productType } = useParams();

  return (
    <>
      {productType === 'hamburguer' && <CreateHamburguer />}
      {productType === 'salgado' && <CreateSavory />}
      {productType === 'pizza' && <CreatePizza />}
      {productType === 'refrigerante' && <CreateSoda />}
      {productType === 'suco' && <CreateJuice />}
    </>
  );
};
