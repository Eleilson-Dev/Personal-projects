const db = require('../database/db');
const client = require('../config/client');
const responseMessage = require('../actions/responseMessage');
const paymentOptions = require('../actions/paymentOptions');
const verifyPaymentOption = require('../actions//verifyPaymentOption');
const handlePaymentConfirmation = require('../actions/handlePaymentConfirmation');
const processPaymentFlow = require('../actions/processPaymentFlow');

let selectedPayment = '';
let awaitingConfirmation = false;

const setSelectedPayment = (payment) => {
  selectedPayment = payment;
};

const setAwaitingConfirmation = (state) => {
  awaitingConfirmation = state;
};

class MessageHandler {
  replyMessage = async (message) => {
    if (message.fromMe) {
      return;
    }

    console.log(message.body);

    const match = message.body.match(/pedido:\s*#(\d+)/i);

    if (match) {
      const orderNumber = match[1];

      try {
        const result = await db.query(
          `SELECT * FROM "Hamburguer" WHERE id = $1`,
          [orderNumber]
        );

        if (result.rows.length > 0) {
          const orderInfo = result.rows[0];
          console.log(orderInfo);

          await client.sendMessage(
            message.from,
            responseMessage(orderNumber, orderInfo)
          );

          await client.sendMessage(message.from, paymentOptions());

          await processPaymentFlow(client);
        } else {
          await client.sendMessage(
            message.from,
            `Pedido: #${pedidoNumero} não encontrado.`
          );
        }
      } catch (err) {
        console.log('Erro ao consultar o banco:', err);
        await client.sendMessage(
          message.from,
          `Ocorreu um erro ao consultar o pedido.`
        );
      }
    }
  };
}

const messageHandler = new MessageHandler();

module.exports = { messageHandler };
