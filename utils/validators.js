function validateSubscriptionInput({ email, city, frequency }) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  if (!city || city.trim().length < 2) return 'Invalid city';
  if (!['hourly', 'daily'].includes(frequency)) return 'Invalid frequency';
  return null;
}

function validateCityParam(city) {
  return typeof city === 'string' && city.trim().length > 1;
}

module.exports = {
  validateSubscriptionInput,
  validateCityParam
};
