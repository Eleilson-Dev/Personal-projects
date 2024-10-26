import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const updateProduct = async (
  id,
  productUpdateData,
  setList,
  endPoint,
  setLoadingState
) => {
  try {
    const { category, categoryId, ...filteredData } = productUpdateData;
    const token = getToken('@TOKEN');

    setLoadingState((prev) => ({ ...prev, formLoad: true }));
    setList([]);

    await api.patch(`/${endPoint}/edit/product/${id}`, filteredData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success('Produto editado');
  } catch (err) {
    console.log('Erro ao tentar editar o produto', err);
    throw err;
  } finally {
    setLoadingState((prev) => ({ ...prev, formLoad: false }));
  }
};
