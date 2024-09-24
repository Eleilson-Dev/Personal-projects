import { shoppingCart } from '../shoppingCart';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { toast } from 'react-toastify';
import { checkingPendingOrder } from '../chekingPendingOrder';
import { callWhatsApp } from '../callWhatsApp';

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
    toast.success('Pedido enviado', { autoClose: 500 });

    window.location.href = callWhatsApp({
      phoneNumber: '+5598985598696',
      message: `Pedido N: #${data.id}`,
    });

    dataProps.toggleModal();
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
  }
};
