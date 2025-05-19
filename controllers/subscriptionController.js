const express = require('express');
const subscriptionRouter = express.Router();
const subscriptionService = require('../services/subscriptionService');

// POST /api/subscribe
async function subscribe(req, res) {
  try {
    console.log('[POST /subscribe] Incoming request:', req.body);

    const result = await subscriptionService.subscribe(req.body);

    if (!result || !result.id) {
      console.error('[POST /subscribe] Error: Invalid result from service');
      return res.status(500).json({ error: 'Unexpected error in subscription.' });
    }

    console.log('[POST /subscribe] Success: Subscription created for', result.email);
    return res.status(200).json({ message: 'Subscription successful. Confirmation email sent.', id: result.id });

  } catch (err) {
    console.error('[POST /subscribe] Error:', err.message);

    if (err.code === 'VALIDATION') {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}


async function confirmSubscription(req, res, next) {
  const { token } = req.params;
  console.log(`[GET /confirm/${token}] Confirmation attempt`);

  try {
    const ok = await subscriptionService.confirm(token);
    if (!ok) {
      console.warn(`[GET /confirm/${token}] Invalid token`);
      return res.status(400).json({ error: 'Invalid token' });
    }

    console.log(`[GET /confirm/${token}] Subscription confirmed`);
    return res.status(200).json({ message: 'Subscription confirmed successfully' });
  } catch (err) {
    console.error(`[GET /confirm/${token}] Error:`, err.message);
    return next(err);
  }
}

async function unsubscribe(req, res, next) {
  const { token } = req.params;
  console.log(`[GET /unsubscribe/${token}] Unsubscribe attempt`);

  try {
    const ok = await subscriptionService.unsubscribe(token);
    if (!ok) {
      console.warn(`[GET /unsubscribe/${token}] Invalid token`);
      return res.status(400).json({ error: 'Invalid token' });
    }

    console.log(`[GET /unsubscribe/${token}] Successfully unsubscribed`);
    return res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error(`[GET /unsubscribe/${token}] Error:`, err.message);
    return next(err);
  }
}

subscriptionRouter.post('/subscribe', subscribe);
subscriptionRouter.get('/confirm/:token', confirmSubscription);
subscriptionRouter.get('/unsubscribe/:token', unsubscribe);

module.exports.subscriptionRouter = subscriptionRouter;
