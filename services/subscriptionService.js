const crypto = require('crypto');
const { Subscription } = require('../models');
const mailService = require('./mailService');
const { validateSubscriptionInput } = require('../utils/validators');

async function subscribe({ email, city, frequency }) {
  const validationError = validateSubscriptionInput({ email, city, frequency });
  if (validationError) {
    const err = new Error(validationError);
    err.code = 'VALIDATION';
    throw err;
  }

  const existing = await Subscription.findOne({ where: { email } });
  if (existing) {
    const err = new Error('Email already subscribed');
    err.code = 'CONFLICT';
    throw err;
  }

  const token = crypto.randomBytes(32).toString('hex');
  const subscription = await Subscription.create({ email, city, frequency, confirmed: false, token });

  await mailService.sendSubscriptionConfirmationEmail({ to: email, city, token });
  return subscription;
}

async function confirm(token) {
  if (!token) return false;
  const sub = await Subscription.findOne({ where: { token } });
  if (!sub) return false;
  sub.confirmed = true;
  await sub.save();
  return true;
}

async function unsubscribe(token) {
  if (!token) return false;
  const sub = await Subscription.findOne({ where: { token } });
  if (!sub) return false;
  await sub.destroy();
  return true;
}

module.exports = { subscribe, confirm, unsubscribe };
