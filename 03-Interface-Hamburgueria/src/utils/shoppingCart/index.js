export const shoppingCart = (cartList) => {
  const total = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return Number(total.toFixed(2));
};
