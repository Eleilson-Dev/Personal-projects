const responseMessage = (orderNumber, orderInfo) => {
  const message =
    `Informações do Pedido: #${orderNumber}\n` +
    `Nome: ${orderInfo.name}\n` +
    `Tamanho: ${orderInfo.size}\n` +
    `Preço: ${orderInfo.price}`;
  return message;
};

module.exports = responseMessage;
