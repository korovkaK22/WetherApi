const request = require('supertest');

jest.mock('../../services/weatherService');
const weatherService = require('../../services/weatherService');
const app = require('../../app');

describe('GET /api/weather', () => {
  it('returns 400 for missing city', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.status).toBe(400);
  });

  it('returns 200 with weather', async () => {
    weatherService.getWeatherByCity.mockResolvedValue({ temperature: 1, humidity: 50, description: 'Clear' });
    const res = await request(app).get('/api/weather?city=Kyiv');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ temperature: 1, humidity: 50, description: 'Clear' });
  });
});
