const client = require('./config/client');
const { handleMessage } = require('./handlers/messageHandler');
const qrcode = require('qrcode-terminal');

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready');
});

client.on('message_create', async (message) => {
  await handleMessage(message);
});

client.initialize();
