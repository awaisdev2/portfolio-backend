const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const port = 4500;

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
  console.log('Received data:', req.body);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: req.body.email, // Use the user's email as the sender
    to: 'awaisdev2@gmail.com', // Change this to your target email address
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${req.body.name}</p>
      <p><strong>Email:</strong> ${req.body.email}</p>
      <p><strong>Message:</strong> ${req.body.message}</p>
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
