import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const updateProduct = async ({
  id,
  productUpdateData,
  listName,
  setLists,
  endPoint,
  setLoadingState,
}) => {
  try {
    const { category, categoryId, ...filteredData } = productUpdateData;
    const token = getToken('@TOKEN');

    setLoadingState((prev) => ({ ...prev, formLoad: true }));

    await api.patch(`/${endPoint}/edit/product/${id}`, filteredData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    setLists((prevLists) => ({
      ...prevLists,
      [listName]: (prevLists[listName] = []),
    }));

    toast.success('Produto editado');
  } catch (err) {
    console.log('Erro ao tentar editar o produto', err);
    throw err;
  } finally {
    setLoadingState((prev) => ({ ...prev, formLoad: false }));
  }
};
