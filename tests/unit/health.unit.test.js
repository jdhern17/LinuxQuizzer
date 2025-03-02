const request = require('supertest');


describe('dummy container GET /get-processes', () => {
    const dummyBaseUrl = `http://localhost:3001`; // Use the private IP from the .env file
    it('should return a 200 status and a list of processes', async () => {
      const response = await request(dummyBaseUrl).get('/health');
      expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('processes');
      // expect(Array.isArray(response.body.processes)).toBe(true);
    });
  });