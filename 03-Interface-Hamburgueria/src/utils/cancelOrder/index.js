import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';

export const cancelOrder = async (setLoadingState, order, setPendingOrder) => {
  try {
    setLoadingState((prev) => ({ ...prev, pendigOrderLoad: true }));
    const token = getToken('@TOKEN');

    const orderUpdated = { id: order.id, status: 'cancelado' };

    await api.patch('/orders/update', orderUpdated, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setPendingOrder(false);

    toast.success('Pedido cancelado', { autoClose: 500 });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
  } finally {
    setLoadingState((prev) => ({ ...prev, pendigOrderLoad: false }));
  }
};
