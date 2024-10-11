require('dotenv').config(); // Load environment variables

const request = require('supertest');
const baseUrl = `http://${process.env.EC2_PRIVATE_IP}:3001`; // Use the private IP from the .env file

describe('GET /get-processes', () => {
  it('should return a 200 status and a list of processes', async () => {
    const response = await request(baseUrl).get('/get-processes');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('processes');
    expect(Array.isArray(response.body.processes)).toBe(true);
  });

  it('should return a non-empty processes array', async () => {
    const response = await request(baseUrl).get('/get-processes');
    expect(response.body.processes.length).toBeGreaterThan(0);
  });
});