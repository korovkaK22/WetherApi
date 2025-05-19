const axios = require('axios');
const { adaptWeatherResponse } = require('./weatherAdapter');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_URL;

/**
 * Отримує поточну погоду для вказаного міста.
 * @param {string} city - Назва міста.
 * @returns {Promise<Object|null>} Адаптована відповідь або null.
 * @throws {Error} якщо сталася критична помилка (наприклад, неправильна конфігурація).
 */
async function getWeatherByCity(city) {
  if (!city) return null;

  if (!API_KEY || !BASE_URL) {
    throw new Error('Weather API configuration error: missing API_KEY or BASE_URL');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: city,
        lang: 'uk'
      }
    });

    const adapted = adaptWeatherResponse(response.data);
    return adapted || null;
  } catch (error) {
    // Якщо погане місто — повертаємо null (потім контролер видасть 404)
    if (error.response && [400, 404].includes(error.response.status)) {
      return null;
    }

    // Інше — кидаємо, щоб контролер повернув 500
    throw new Error(`Weather API request failed: ${error.message}`);
  }
}

module.exports = {
  getWeatherByCity
};
