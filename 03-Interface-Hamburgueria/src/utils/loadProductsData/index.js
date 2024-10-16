import { api } from '../../services/api';

export const loadProductData = async (setList, setWindowLoad) => {
  try {
    setWindowLoad(true);
    const response = await api.get('/lanches');
    setList(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setWindowLoad(false);
  }
};
