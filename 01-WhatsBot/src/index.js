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
  5: Ação 5 - Pagamento via pix
`;

const paymentOptions = `
Opções de Pagamento:
1: Cartão de Crédito
2: Cartão de Débito
3: Pix

Por favor, responda com o número da opção desejada.
`;

// Listening to all incoming messages
client.on('message_create', async (message) => {
  console.log(message.body); // Exibe o conteúdo da mensagem no console

  // Evita responder às mensagens que o próprio bot enviou
  // if (message.fromMe) return;

  // Verifica se message.body é uma string e responde com uma lista de mensagens

  if (message.body.toLocaleLowerCase() === 'env') {
    await client.sendMessage(message.from, actions);
  }

  if (message.body.includes('Nome')) {
    await client.sendMessage(message.from, paymentOptions);
  }

  switch (message.body) {
    case '1':
      await client.sendMessage(
        message.from,
        'Na opção cartão de Crédito você faz o pagamento na hora da entrega e sem desconto'
      );
      break;
    case '2':
      await client.sendMessage(
        message.from,
        'Na opção cartão de Débito você faz o pagamento na hora da entrega e sem desconto'
      );
      break;
    case '3':
      await client.sendMessage(
        message.from,
        'Na opção Pix vc efetua o pagamento e tem 3% de desconto'
      );
      break;
  }
});

client.initialize();
