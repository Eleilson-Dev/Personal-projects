import { api } from '../../services/api';

export const fetchProduct = async (requestConfig) => {
  const { id, endPoint, token, setOriginalImgUrl, setHasImg, reset, navigate } =
    requestConfig;

  try {
    requestConfig.setLoadingState((prev) => ({ ...prev, windowLoad: true }));

    const { data } = await api.get(`/${endPoint}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    let productData;

    if (data?.ingredients) {
      productData = {
        ...data,
        price: data.price.toString(),
        ingredients: data.ingredients.toString(),
      };

      setOriginalImgUrl(data.imageUrl),
        setHasImg(data.imageUrl),
        reset(productData);
      return;
    }

    productData = {
      ...data,
      price: data.price.toString(),
    };
    reset(productData);
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);
    navigate('/');
  } finally {
    requestConfig.setLoading(false);
    requestConfig.setLoadingState((prev) => ({ ...prev, windowLoad: false }));
  }
};
