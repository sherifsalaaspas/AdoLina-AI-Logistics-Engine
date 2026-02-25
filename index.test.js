const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('should return 200 OK and the correct message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('AdoLina AI Logistics Engine is running!');
    expect(response.body.adapters).toHaveLength(4);
  });
});
