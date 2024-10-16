import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { checkingPendingOrder } from '../chekingPendingOrder';
import { callWhatsApp } from '../callWhatsApp';

export const singleOrder = async (item, setLoadingCard, dataProps) => {
  try {
    const token = getToken('@TOKEN');

    const order = {
      status: 'pendente',
      hamburgers: [{ id: item.id, quantity: 1 }],
      priceOrder: item.price,
    };

    setLoadingCard(item.id);
    dataProps.setItemLoad(true);

    const { data } = await api.post('/orders/create', order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data?.message) {
      checkingPendingOrder({ data, dataProps });
      const resultData = data.order[0];

      dataProps.setOrder({
        id: resultData.id,
        priceOrder: resultData.priceOrder,
        status: resultData.status,
        createdAt: resultData.createdAt,
      });

      setLoadingCard(null);
      dataProps.setItemLoad(false);
      return;
    }

    console.log(data);

    toast.success('Pedido enviado', { autoClose: 500 });
    setLoadingCard(null);
    dataProps.setItemLoad(false);

    window.location.href = callWhatsApp({
      phoneNumber: '+5598985598696',
      message: `Pedido N: ${data.id}`,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
    setLoadingCard(null);
    dataProps.setItemLoad(false);
    dataProps.setPendingOrder(true);
  }
};
