const paymentOptions = () => {
  const options =
    `Opções de Pagamento:\n` +
    `\n` +
    `1: Cartão de Crédito\n` +
    `2: Cartão de Débito\n` +
    `3: Pix\n` +
    `\n` +
    `Por favor, responda com o número da opção desejada.`;
  return options;
};

module.exports = paymentOptions;
