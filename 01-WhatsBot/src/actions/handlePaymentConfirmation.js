const paymentOptions = require('./paymentOptions');
const confirmPaymentOption = require('./confirmPaymentOption');

let paymentConfirmed = false;

const handlePaymentConfirmation = async (
  confirmMessage,
  client,
  selectedPayment,
  awaitingConfirmationSetter
) => {
  const confirmation = confirmMessage.body.trim().toLowerCase();

  if (paymentConfirmed) {
    await client.sendMessage(
      confirmMessage.from,
      'Pagamento já foi confirmado. Não é necessário confirmar novamente.'
    );
    return; // Sai da função se o pagamento já estiver confirmado
  }

  if (confirmation === 'sim') {
    await client.sendMessage(
      confirmMessage.from,
      `Pagamento com ${selectedPayment} confirmado. Processando pagamento...`
    );

    // Aqui você pode adicionar a lógica de processamento real do pagamento

    paymentConfirmed = true;
    awaitingConfirmationSetter(false); // Resetar o estado de aguardando confirmação

    return;
  } else if (confirmation === 'não') {
    await client.sendMessage(
      confirmMessage.from,
      'Por favor, escolha outra forma de pagamento.'
    );
    await client.sendMessage(confirmMessage.from, paymentOptions());
    awaitingConfirmationSetter(false); // Reseta o estado de confirmação

    return;
  } else {
    await client.sendMessage(
      confirmMessage.from,
      'Resposta inválida. Por favor, responda com "sim" ou "não".'
    );
    await client.sendMessage(
      confirmMessage.from,
      confirmPaymentOption(selectedPayment)
    );

    return;
  }
};

module.exports = handlePaymentConfirmation;
