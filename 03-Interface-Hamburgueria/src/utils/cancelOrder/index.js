import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const cancelOrder = async (dataProps) => {
  try {
    const token = getToken('@TOKEN');

    const orderUpdated = { id: dataProps.order.id, status: 'cancelado' };
    dataProps.setCancelOrderLoad(true);

    await api.patch('/orders/update', orderUpdated, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dataProps.setCancelOrderLoad(false);
    dataProps.setPendingOrder(false);

    toast.success('Pedido cancelado', { autoClose: 500 });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
  }
};
