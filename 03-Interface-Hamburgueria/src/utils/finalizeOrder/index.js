import { shoppingCart } from '../shoppingCart';
import { api } from '../../services/api';
import { getToken } from '../tokenActions';
import { toast } from 'react-toastify';
import { checkingPendingOrder } from '../chekingPendingOrder';
import { callWhatsApp } from '../callWhatsApp';

export const finalizeOrder = async (setLoadingState, dataProps) => {
  try {
    setLoadingState((prev) => ({ ...prev, orderLoading: true }));

    const totalPrice = shoppingCart(dataProps.cartList);
    const token = getToken('@TOKEN');

    if (totalPrice < 15) {
      toast.warn(
        'O valor mínimo para finalizar a compra é de 15 reais. Adicione mais itens ao seu carrinho.'
      );
      return;
    }

    const order = {
      status: 'pendente',
      items: dataProps.cartList.map((item) => ({
        id: item.id,
        type: item.type,
        quantity: item.quantity,
      })),
      priceOrder: totalPrice,
    };

    const { data } = await api.post('/orders/create', order, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data?.message) {
      checkingPendingOrder({ data, setLoadingState, dataProps });
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

    dataProps.setCartList([]);
    toast.success('Pedido enviado', { autoClose: 500 });

    window.location.href = callWhatsApp({
      phoneNumber: '+5598985598696',
      message: `Pedido N: ${data.id}`,
    });

    dataProps.toggleModal();
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data.message, { autoClose: 500 });
  } finally {
    setLoadingState((prev) => ({ ...prev, orderLoading: false }));
  }
};
