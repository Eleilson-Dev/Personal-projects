import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const createProduct = async ({
  setList,
  setLoadingState,
  productData,
  endPoint,
  navigate,
}) => {
  try {
    setList([]);
    setLoadingState((prev) => ({ ...prev, formLoad: true }));
    const token = getToken('@TOKEN');

    await api.post(`/${endPoint}/create`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success('Produto adicionado na lista');
    navigate(`/menu/${endPoint}`);
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
  } finally {
    setLoadingState((prev) => ({ ...prev, formLoad: false }));
  }
};
