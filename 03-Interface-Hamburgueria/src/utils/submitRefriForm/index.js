import { updateProduct } from '../updateProduct';

export const submitRefriForm = async (
  id,
  productUpdateData,
  setList,
  setLoadingState,
  navigate
) => {
  const priceFormatted =
    typeof productUpdateData.price === 'number'
      ? productUpdateData.price.toString()
      : productUpdateData.price.replace(',', '.');

  const formData = {
    ...productUpdateData,
    price: Number(priceFormatted),
  };

  await updateProduct(id, formData, setList, setLoadingState);
  navigate('/menu/refrigerantes');
};
