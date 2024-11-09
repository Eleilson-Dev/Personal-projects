import { toast } from 'react-toastify';

export const addItemIntoModal = (item, cartList, setCartList) => {
  const itemExists = cartList.some(
    (cartItem) =>
      cartItem.categoryName === item.categoryName && cartItem.id === item.id
  );

  if (itemExists) {
    toast.warn('Pedido já existe no carrinho!', { autoClose: 500 });
    return;
  }

  setCartList((prevState) => {
    return [...prevState, item];
  });

  toast.success('Pedido adicionado ao carrinho', { autoClose: 500 });
  return;
};

export const removeItemOfModal = (item, cartList, setCartList) => {
  const itensFiltered = cartList.filter((itemOfList) => {
    return !(
      item.id === itemOfList.id && item.categoryName === itemOfList.categoryName
    );
  });

  setCartList(itensFiltered);
};

export const cleanCart = (setCartList) => {
  setCartList([]);
};
