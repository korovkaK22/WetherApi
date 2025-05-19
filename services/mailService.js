const nodemailer = require('nodemailer');
const mailConfig = require('../config/mailConfig');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendEmail(to, subject, html) {
  if (!to || !subject || !html) throw new Error('Missing email parameters');
  const mailOptions = { from: mailConfig.from, to, subject, html };
  return transporter.sendMail(mailOptions);
}

async function sendSubscriptionConfirmationEmail({ to, city, token }) {
  const confirmUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/confirm/${token}`;
  const html = mailConfig.templates.subscriptionConfirmation({ city, confirmUrl });
  return sendEmail(to, mailConfig.subjects.subscriptionConfirmation, html);
}

module.exports = {
  sendEmail,
  sendSubscriptionConfirmationEmail
};