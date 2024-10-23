const request = require('supertest');

describe('Backend container - GraphQL getProcesses query', () => {
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
      expect(response.body.data.getProcesses[0].pid).toBeGreaterThan(0); // Ensure a valid process ID is returned
      expect(response.body.data.getProcesses[0].name).not.toBeNull();    // Ensure the process name is not null      
      expect(response.body.data.getProcesses[0].pid).not.toBeNull();
      // expect(response.body.errors).toBeFalsy(); // Could be undefined, null, or an empty array
      expect(response.body.errors).toBeUndefined(); // Ensure no error field exists
      expect(response.body.data).toHaveProperty('getProcesses');
      expect(Array.isArray(response.body.data.getProcesses)).toBe(true);
    });
  
    it('should return a non-empty processes array', async () => {
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
  
      expect(response.body.data.getProcesses.length).toBeGreaterThan(0);
    });
  });
