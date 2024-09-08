const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
  5: Ação 5 - Descrição da Ação 5
`;

// Listening to all incoming messages
client.on('message_create', async (message) => {
  console.log(message.body); // Exibe o conteúdo da mensagem no console

  // Evita responder às mensagens que o próprio bot enviou
  if (message.fromMe) return;

  // Verifica se message.body é uma string e responde com uma lista de mensagens

  if (message.body.toLocaleLowerCase() === 'env') {
    await client.sendMessage(message.from, actions);
  }

  switch (message.body) {
    case '1':
      await client.sendMessage(message.from, 'ação numero 1: ir comprar pão');
      break;
    case '2':
      await client.sendMessage(message.from, 'ação numero 2: abastecer a moto');
      break;
    case '3':
      await client.sendMessage(message.from, 'ação numero 3: pagar no credito');
      break;
    case '4':
      await client.sendMessage(message.from, 'ação numero 4: pagar no debito');
      break;
    case '5':
      await client.sendMessage(message.from, 'ação numero 5: pagar via pix');
      break;
  }
});

client.initialize();
