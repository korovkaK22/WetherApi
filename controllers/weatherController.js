const express = require('express');
const weatherRouter = express.Router();
const { getWeatherByCity } = require('../services/weatherService');
const { validateCityParam } = require('../utils/validators');

// GET /api/weather?city={city}
async function getWeather(req, res, next) {
  const city = (req.query.city || '').trim();
  console.log(`[GET /weather] Request for city: "${city}"`);

  try {
    if (!validateCityParam(city)) {
      console.warn(`[GET /weather] Invalid city parameter`);
      return res.status(400).json({ error: 'Parameter "city" is required and must be a non-empty string.' });
    }

    const weather = await getWeatherByCity(city);

    if (!weather) {
      console.warn(`[GET /weather] Weather not found for: "${city}"`);
      return res.status(404).json({ error: `Weather data for "${city}" not found.` });
    }

    console.log(`[GET /weather] Weather retrieved for: "${city}"`);
    return res.status(200).json(weather);
  } catch (err) {
    console.error(`[GET /weather] Error:`, err.message);
    return next(err);
  }
}

weatherRouter.get('/weather', getWeather);
module.exports.weatherRouter = weatherRouter;
