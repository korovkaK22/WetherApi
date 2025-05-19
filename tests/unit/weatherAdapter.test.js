const { adaptWeatherResponse } = require('../../services/weatherAdapter');

describe('adaptWeatherResponse', () => {
  it('returns mapped object for valid API response', () => {
    const apiResp = {
      current: {
        temp_c: 22,
        humidity: 55,
        condition: { text: 'Sunny' }
      }
    };
    expect(adaptWeatherResponse(apiResp)).toEqual({
      temperature: 22,
      humidity: 55,
      description: 'Sunny'
    });
  });

  it('returns null for invalid response', () => {
    expect(adaptWeatherResponse({})).toBeNull();
  });
});