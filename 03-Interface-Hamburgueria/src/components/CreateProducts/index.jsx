import { useParams } from 'react-router-dom';
import { CreatePizza } from './CreatePizza';
import { CreateHamburguer } from './CreateHamburguer';
import { CreateRefrigerante } from './CreateRefrigerante';

export const CreateProducts = () => {
  const { productType } = useParams();

  return (
    <>
      {productType === 'hamburguer' && <CreateHamburguer />}
      {productType === 'pizza' && <CreatePizza />}
      {productType === 'refrigerante' && <CreateRefrigerante />}
    </>
  );
};
