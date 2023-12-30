const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = 4500;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  console.log('Received data:', req.body);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'awaisdev2@gmail.com',
        pass: 'uabahgdvmybdrnbr',
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: 'awaisdev2@gmail.com',
    subject: 'Contact Form Submission',
    html: `
    <div style="background-color: #f0f0f0; align-items: center; height: fit-content; text-align: center; padding: 30px 0;">
    <h1>Contact Form Submission</h1>
    <p><strong>Name:</strong> ${req.body.name}</p>
    <p><strong>Email:</strong> ${req.body.email}</p>
    <p><strong>Message:</strong> ${req.body.message}</p>
  </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Portfolio backend listening on http://localhost:${port}`);
});
