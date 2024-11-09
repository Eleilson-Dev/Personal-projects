import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const createProduct = async ({
  listName,
  setLists,
  setLoadingState,
  productData,
  endPoint,
  setHasImg,
  setImageFile,
  reset,
}) => {
  try {
    setLoadingState((prev) => ({ ...prev, formLoad: true }));
    const token = getToken('@TOKEN');

    await api.post(`/${endPoint}/create`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    setLists((prevLists) => ({
      ...prevLists,
      [listName]: (prevLists[listName] = []),
    }));

    toast.success('Produto adicionado na lista');

    setHasImg(null), setImageFile(null), reset();
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
  } finally {
    setLoadingState((prev) => ({ ...prev, formLoad: false }));
  }
};
