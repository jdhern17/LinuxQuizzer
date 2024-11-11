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



  describe('getProcesses if fail in dev query', () => {
    const graphqlBaseUrl = `http://localhost:4000/graphql`;
  
    it('should return a 200 status and a list of processes', async () => {
      const query = `
        {
          getProcesses {
            pid
            name
            cpu
            memVsz
            user
            command
          }
        }
      `;
  
      const response = await request(graphqlBaseUrl)
        .post('/')
        .send({ query });
  
      expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('errors');  // Check if there's an errors field
      // expect(response.body.errors[0].message).toContain('error');  // Validate the error message
      expect(response.body.data).toHaveProperty('getProcesses');
      expect(Array.isArray(response.body.data.getProcesses)).toBe(true);
    });
  });