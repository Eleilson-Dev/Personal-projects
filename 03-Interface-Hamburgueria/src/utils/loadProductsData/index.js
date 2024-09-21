import { api } from '../../services/api';

export const loadProductData = async (setList) => {
  const response = await api.get('/lanches');
  setList(response.data);
};
