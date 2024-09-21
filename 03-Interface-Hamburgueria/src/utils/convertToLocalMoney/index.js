export const convertToLocalMoney = (monay) => {
  return monay.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
