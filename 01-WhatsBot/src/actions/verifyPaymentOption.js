const paymentOptions = require('./paymentOptions');
const confirmPaymentOption = require('./confirmPaymentOption');

const verifyPaymentOption = async (message, client, selectedPaymentSetter) => {
  const paymentOption = message.body.trim().toLowerCase();
  let selectedPayment = '';

  switch (paymentOption) {
    case '1':
    case 'cartão de crédito':
      selectedPayment = 'Cartão de Crédito';
      break;

    case '2':
    case 'cartão de débito':
      selectedPayment = 'Cartão de Débito';
      break;

    case '3':
    case 'pix':
      selectedPayment = 'Pix';
      break;

    default:
      await client.sendMessage(
        message.from,
        'Opção inválida. Por favor, escolha uma das opções: 1 (Cartão de Crédito), 2 (Cartão de Débito) ou 3 (Pix).'
      );
      await client.sendMessage(message.from, paymentOptions());
      return;
  }

  selectedPaymentSetter(selectedPayment);

  await client.sendMessage(message.from, confirmPaymentOption(selectedPayment));
};

module.exports = verifyPaymentOption;
