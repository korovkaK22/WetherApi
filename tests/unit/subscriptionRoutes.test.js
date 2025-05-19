jest.mock('../../services/subscriptionService');
const subscriptionService = require('../../services/subscriptionService');

const request = require('supertest');
const app = require('../../app');

describe('POST /api/subscribe', () => {
  it('returns 400 for invalid payload', async () => {
      subscriptionService.subscribe.mockImplementation(() => {
    const err = new Error('Invalid email or city');
    err.code = 'VALIDATION';
    throw err;
  });

    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'bad', city: '', frequency: 'daily' });
    expect(res.status).toBe(400);
  });

  it('returns 200 on success', async () => {
    subscriptionService.subscribe.mockResolvedValue({ id: 1 });
    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'a@b.c', city: 'Kyiv', frequency: 'daily' });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });
});
