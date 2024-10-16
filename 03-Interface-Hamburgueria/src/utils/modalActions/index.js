import { toast } from 'react-toastify';

export const addItemIntoModal = (item, dataProps) => {
  const itemExists = dataProps.cartList.some(
    (cartItem) => cartItem.id === item.id
  );

  if (itemExists) {
    toast.warn('Pedido já existe no carrinho!', { autoClose: 500 });
    return;
  }

  dataProps.setCartList((prevState) => {
    return [...prevState, item];
  });

  toast.success('Pedido adicionado ao carrinho', { autoClose: 500 });
  return;
};

export const removeItemOfModal = (itemId, dataProps) => {
  const itensFiltered = dataProps.cartList.filter((item) => {
    return item.id !== itemId;
  });

  dataProps.setCartList(itensFiltered);
};

export const cleanCart = (setCartList) => {
  setCartList([]);
};
