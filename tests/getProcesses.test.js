// require('dotenv').config(); // Load environment variables

const request = require('supertest');

describe('dummy container GET /get-processes', () => {
  const dummyBaseUrl = `http://localhost:3001`; // Use the private IP from the .env file
  it('should return a 200 status and a list of processes', async () => {
    const response = await request(dummyBaseUrl).get('/get-processes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('processes');
    expect(Array.isArray(response.body.processes)).toBe(true);
  });

  it('should return a non-empty processes array', async () => {
    const response = await request(dummyBaseUrl).get('/get-processes');
    expect(response.body.processes.length).toBeGreaterThan(0);
  });
});