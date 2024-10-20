import { api } from '../../services/api';

export const fetchProduct = async (requestConfig) => {
  const { id, endPoint, token, setProduct, reset, navigate } = requestConfig;

  try {
    requestConfig.setLoadingState((prev) => ({ ...prev, windowLoad: true }));
    const response = await api.get(`/${endPoint}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const productData = {
      ...response.data,
      price: response.data.price.toString(),
      ingredients: response.data.ingredients.toString(),
    };

    setProduct(productData);
    reset(productData);
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);
    navigate('/');
  } finally {
    requestConfig.setLoading(false);
    requestConfig.setLoadingState((prev) => ({ ...prev, windowLoad: false }));
  }
};
