const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const helpers = require('./helperfunctions')

const app = express();

app.post('/payment', async (req, res) => {
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.price * 100,
      currency: 'pln',
      metadata: {'title': req.body.title},
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
})

app.post('/webhooks', (request, response) => {
  // TESTING LOCALHOST: 
  // 1. /Web design/programs CMD - ngrok http 4000
  // 2. stripe dashboard Webooks - url/webooks
  // 3. /Web design/programs CMD - stripe listen --forward-to http://localhost:4000/webhooks OR just this line
  const event = request.body;
  const paymentIntent = event.data.object;

  switch (event.type) {
    case 'payment_intent.succeeded':
      helpers.handlePaymentIntentSucceeded(paymentIntent);
      break;
    default:
      console.log('Unhandled event:', event.type)
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

// Sendgrid example
app.post('/contact', (req, res) => {
  // let data = req.body
  
  // Example fixed data
  let data = {
    email: 'bonzo7aab@gmail.com',
    subject: 'Test subject',
    name: 'Michal S',
    phone: '1234556789',
    message: 'Test description'
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'bonzo7aab@gmail.com',
    from: data.email,
    subject: data.subject,
    html: `<p><b>Imię i nazwisko:</b><br /> ${data.name}</p>
            <p><b>Numer telefonu:</b><br /> ${data.phone}</p>
            <p><b>Wiadomość:</b><br /> ${data.message}</p>`
  };

  sgMail.send(msg)
    .then(() => {
      res.sendStatus(200)
    }).catch(err => {
      res.sendStatus(500)
    });
})

module.exports = app;