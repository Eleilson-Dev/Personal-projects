import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken:
    'APP_USR-5158758577071828-102500-b03a022513ad4522ec5312d6b23d400f-294216525',
  options: { timeout: 5000 },
});

const payment = new Payment(client);

const body = {
  transaction_amount: 1,
  description: 'pix de teste',
  payment_method_id: 'pix',
  payer: {
    email: 'maxta.gamer@gmail.com',
  },
};

payment
  .create({ body })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
