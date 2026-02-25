const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return 200 OK and the correct message', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('AdoLina AI Logistics Engine is running!');
      expect(response.body.adapters).toHaveLength(4);
    });
  });

  describe('GET /health', () => {
    it('should return 200 OK and status UP', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('UP');
    });
  });

  describe('GET /non-existent', () => {
    it('should return 404', async () => {
      const response = await request(app).get('/non-existent');
      expect(response.statusCode).toBe(404);
    });
  });
});
