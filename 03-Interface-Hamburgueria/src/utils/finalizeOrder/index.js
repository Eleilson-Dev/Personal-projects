import { shoppingCart } from '../shoppingCart';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { toast } from 'react-toastify';

export const finalizeOrder = async (cartList, setCartList, setOrderLoading) => {
  try {
    const token = getToken('@TOKEN');

    const order = {
      status: 'pending',
      hamburgers: cartList.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      priceOrder: shoppingCart(cartList),
    };

    console.log(order);
    setOrderLoading(true);

    await api.post('/orders/create', order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setOrderLoading(false);

    setCartList([]);
    toast.success('Pedido enviado');
  } catch (err) {
    toast.warn(err.response?.data.message);
  }
};
