const cron = require('node-cron');
const { Subscription } = require('../models');
const { getWeatherByCity } = require('../services/weatherService');
const { sendEmail } = require('../services/mailService');
const mailConfig = require('../config/mailConfig');

// Надсилання оновлень погоди
async function notifySubscribers(frequency) {
  const subscriptions = await Subscription.findAll({
    where: { confirmed: true, frequency }
  });

  for (const sub of subscriptions) {
    try {
      const weather = await getWeatherByCity(sub.city);
      if (!weather) continue;

      const html = mailConfig.templates.weatherUpdate({
        city: sub.city,
        temperature: weather.temperature,
        humidity: weather.humidity,
        description: weather.description
      });

      await sendEmail(
        sub.email,
        mailConfig.subjects.weatherUpdate,
        html
      );
    } catch (err) {
      console.error(`❌ Failed to send to ${sub.email}:`, err.message);
    }
  }
}

// Запускається щогодини для підписок з frequency = 'hourly'
cron.schedule('0 * * * *', () => {
  console.log('⏰ Hourly weather notification task running...');
  notifySubscribers('hourly');
});

// Запускається щодня о 7 ранку для frequency = 'daily'
cron.schedule('0 7 * * *', () => {
  console.log('📬 Daily weather notification task running...');
  notifySubscribers('daily');
});
