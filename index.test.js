const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return HTML when requested without JSON headers', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('text/html');
    });

    it('should return JSON when requested with JSON headers', async () => {
      const response = await request(app)
        .get('/')
        .set('Accept', 'application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('AdoLina AI Logistics Engine is running!');
      expect(response.body.database).toBe('Connected');
    });
  });

  describe('Database API', () => {
    it('should fetch tasks from the database', async () => {
      const response = await request(app).get('/api/tasks');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should add a new task to the database', async () => {
      const newTask = { task: 'Test Task', status: 'Pending', adapter: 'ILSCHERY' };
      const response = await request(app)
        .post('/api/tasks')
        .send(newTask);
      expect(response.statusCode).toBe(201);
      expect(response.body.task).toBe('Test Task');
    });
  });

  describe('GET /health', () => {
    it('should return 200 OK and status UP', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body.database).toBe('UP');
    });
  });

  describe('GET /non-existent', () => {
    it('should return 404', async () => {
      const response = await request(app).get('/non-existent');
      expect(response.statusCode).toBe(404);
    });
  });
});
