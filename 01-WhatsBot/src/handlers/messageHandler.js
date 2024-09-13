const db = require('../database/db');
const client = require('../config/client');

const handleMessage = async (message) => {
  if (message.fromMe) {
    return;
  }

  console.log(message.body);

  const match = message.body.match(/pedido:\s*#(\d+)/i);

  if (match) {
    const pedidoNumero = match[1];

    try {
      const result = await db.query(
        `SELECT * FROM "Hamburguer" WHERE id = $1`,
        [pedidoNumero]
      );

      if (result.rows.length > 0) {
        const pedidoInfo = result.rows[0];
        console.log(pedidoInfo);

        const responseMessage =
          `Informações do Pedido: #${pedidoNumero}\n` +
          `Nome: ${pedidoInfo.name}\n` +
          `Descrição: ${pedidoInfo.description}\n` +
          `Preço: ${pedidoInfo.price}\n` +
          `Ingredientes: ${pedidoInfo.ingredients}\n` +
          `Tamanho: ${pedidoInfo.size}\n`;

        await client.sendMessage(message.from, responseMessage);
      } else {
        await client.sendMessage(
          message.from,
          `Pedido: #${pedidoNumero} não encontrado.`
        );
      }
    } catch (err) {
      console.error('Erro ao consultar o banco:', err);
      await client.sendMessage(
        message.from,
        'Ocorreu um erro ao consultar o pedido.'
      );
    }
  }
};

module.exports = { handleMessage };
