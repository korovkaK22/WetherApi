jest.mock('axios');
const axios = require('axios');
process.env.WEATHER_API_KEY = 'key';
process.env.WEATHER_API_URL = 'http://example.com';
const { getWeatherByCity } = require('../../services/weatherService');

describe('getWeatherByCity', () => {
  it('returns mapped weather for valid city', async () => {
    axios.get.mockResolvedValue({
      data: {
        current: { temp_c: 10, humidity: 80, condition: { text: 'Rain' } }
      }
    });
    const data = await getWeatherByCity('Kyiv');
    expect(data).toEqual({ temperature: 10, humidity: 80, description: 'Rain' });
  });

  it('returns null for 404', async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });
    const data = await getWeatherByCity('Unknown');
    expect(data).toBeNull();
  });
});