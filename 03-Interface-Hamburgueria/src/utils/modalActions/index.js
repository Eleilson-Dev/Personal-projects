import { toast } from 'react-toastify';

export const addItemIntoModal = (item, cartList, setCartList) => {
  const itemExists = cartList.some((cartItem) => cartItem.id === item.id);

  if (itemExists) {
    toast.warn('Pedido já existe no carrinho!');
    return;
  }

  setCartList((prevState) => {
    return [...prevState, item];
  });

  toast.success('Pedido adicionado ao carrinho');
};

export const removeItemOfModal = (itemId, cartList, setCartList) => {
  const itensFiltered = cartList.filter((item) => {
    return item.id !== itemId;
  });

  setCartList(itensFiltered);
};

export const cleanCart = (setCartList) => {
  setCartList([]);
};
