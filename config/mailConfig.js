module.exports = {
  from: process.env.MAIL_FROM || 'WeatherAPI <247currencyexchange247@gmail.com>',

  subjects: {
    subscriptionConfirmation: 'Підтвердження підписки на погоду',
    unsubscribeConfirmation: 'Ви успішно відписалися від розсилки',
    weatherUpdate: 'Ваше оновлення погоди'
  },

  templates: {
    subscriptionConfirmation: ({ city, confirmUrl }) => `
      <h2>Ви підписалися на погодні оновлення</h2>
      <p>Дякуємо за підписку на оновлення погоди для міста <strong>${city}</strong>.</p>
      <p>Щоб підтвердити підписку, натисніть кнопку нижче:</p>
      <a href="${confirmUrl}" style="padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none; border-radius: 4px;">Підтвердити</a>
      <p>Якщо ви не підписувалися, просто проігноруйте цей лист.</p>
    `,

    unsubscribeConfirmation: () => `
      <h2>Ви відписалися від розсилки</h2>
      <p>Ми більше не будемо надсилати вам погодні оновлення.</p>
      <p>Якщо це була помилка, ви можете знову підписатися через сайт.</p>
    `,

    weatherUpdate: ({ city, temperature, humidity, description }) => `
      <h2>Поточна погода для ${city}</h2>
      <ul>
        <li><strong>Температура:</strong> ${temperature}°C</li>
        <li><strong>Вологість:</strong> ${humidity}%</li>
        <li><strong>Опис:</strong> ${description}</li>
      </ul>
    `
  }
};
