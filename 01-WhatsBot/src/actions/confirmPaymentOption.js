const confirmPaymentOption = (paymentOption) => {
  return (
    `Você escolheu a opção ${paymentOption}. Deseja confirmar essa forma de pagamento?\n\n` +
    `Responda com "sim" para confirmar ou "não" para escolher outra forma de pagamento.`
  );
};

module.exports = confirmPaymentOption;
