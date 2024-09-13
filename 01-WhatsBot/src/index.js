const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const db = require('./database/db');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

const actions = `
  1: Ação 1 - Descrição da Ação 1
  2: Ação 2 - Descrição da Ação 2
  3: Ação 3 - Descrição da Ação 3
  4: Ação 4 - Descrição da Ação 4
  5: Ação 5 - Pagamento via pix
`;

const paymentOptions = `
Opções de Pagamento:
1: Cartão de Crédito
2: Cartão de Débito
3: Pix

Por favor, responda com o número da opção desejada.
`;

client.on('message_create', async (message) => {
  console.log(message.body); // Exibe o conteúdo da mensagem no console

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
});

client.initialize();
