const verifyPaymentOption = require('../verifyPaymentOption');
const handlePaymentConfirmation = require('../handlePaymentConfirmation');

const processPaymentFlow = async (client) => {
  let awaitingConfirmation = false;
  let selectedPayment = null;

  return new Promise((resolve, reject) => {
    client.on('message', async (message) => {
      try {
        if (!awaitingConfirmation) {
          await verifyPaymentOption(message, client, (payment) => {
            selectedPayment = payment;
          });
          awaitingConfirmation = true;
        } else {
          await handlePaymentConfirmation(
            message,
            client,
            selectedPayment,
            (value) => {
              awaitingConfirmation = value;
            }
          );

          resolve({ status: 'success', payment: selectedPayment });
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  });
};

module.exports = processPaymentFlow;
