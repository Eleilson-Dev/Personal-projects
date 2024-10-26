import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { checkingPendingOrder } from '../chekingPendingOrder';
import { callWhatsApp } from '../callWhatsApp';

export const singleOrder = async (
  item,
  type,
  setLoadItem,
  setLoadingState,
  setPendingOrder,
  setOrder
) => {
  try {
    const token = getToken('@TOKEN');
    setLoadItem({ state: true, id: item.id });

    const order = {
      status: 'pendente',
      items: [
        {
          id: item.id,
          type: type,
          quantity: 1,
        },
      ],
      priceOrder: item.price,
    };

    const { data } = await api.post('/orders/create', order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLoadItem({ state: false, id: null });

    if (data?.message) {
      checkingPendingOrder({ data, setLoadingState, setPendingOrder });
      const resultData = data.order[0];
      setOrder({
        id: resultData.id,
        priceOrder: resultData.priceOrder,
        status: resultData.status,
        createdAt: resultData.createdAt,
      });
      return;
    }
    toast.success('Pedido enviado', { autoClose: 500 });
    window.location.href = callWhatsApp({
      phoneNumber: '+5598985598696',
      message: `Pedido N: ${data.id}`,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
    setPendingOrder(true);
  } finally {
    setLoadItem({ state: false, id: null });
  }
};
