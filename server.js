require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 4000

const app = express();
app.use(cors());

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


app.listen(PORT, () => console.log(`Server Listening on port ${PORT}...`))