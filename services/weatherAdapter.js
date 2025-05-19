/**
 * Адаптує відповідь від WeatherAPI до внутрішнього формату.
 * @param {object} apiResponse — Сира відповідь з WeatherAPI.
 * @returns {{ temperature: number, humidity: number, description: string } | null}
 */
function adaptWeatherResponse(apiResponse) {
  try {
    if (
      !apiResponse ||
      typeof apiResponse !== 'object' ||
      !apiResponse.current ||
      typeof apiResponse.current.temp_c !== 'number' ||
      typeof apiResponse.current.humidity !== 'number' ||
      !apiResponse.current.condition ||
      typeof apiResponse.current.condition.text !== 'string'
    ) {
      console.warn('Некоректна структура відповіді WeatherAPI:', apiResponse);
      return null;
    }

    return {
      temperature: apiResponse.current.temp_c,
      humidity: apiResponse.current.humidity,
      description: apiResponse.current.condition.text
    };
  } catch (err) {
    console.error('Помилка адаптації відповіді WeatherAPI:', err.message);
    return null;
  }
}

module.exports = { adaptWeatherResponse };
