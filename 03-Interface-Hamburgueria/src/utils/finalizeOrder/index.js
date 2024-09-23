import { shoppingCart } from '../shoppingCart';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { toast } from 'react-toastify';
import { checkingPendingOrder } from '../chekingPendingOrder';

export const finalizeOrder = async (dataProps) => {
  try {
    const token = getToken('@TOKEN');

    const order = {
      status: 'pendente',
      hamburgers: dataProps.cartList.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      priceOrder: shoppingCart(dataProps.cartList),
    };

    dataProps.setOrderLoading(true);

    const { data } = await api.post('/orders/create', order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data?.message) {
      checkingPendingOrder({ data, dataProps });
      dataProps.toggleModal();

      const resultData = data.order[0];

      dataProps.setOrder({
        id: resultData.id,
        priceOrder: resultData.priceOrder,
        status: resultData.status,
        createdAt: resultData.createdAt,
      });

      return;
    }

    dataProps.setOrderLoading(false);

    dataProps.setCartList([]);
    toast.success('Pedido enviado');
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message);
  }
};