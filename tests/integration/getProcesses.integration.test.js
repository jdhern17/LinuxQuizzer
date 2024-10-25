const request = require('supertest');

describe('Backend container - GraphQL getProcesses query', () => {
    const graphqlBaseUrl = `http://localhost:4000/graphql`;
  
    it('validating structure of responses', async () => {
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
      expect(response.body.errors).toBeFalsy(); // Could be undefined, null, or an empty array
      expect(response.body.errors).toBeUndefined(); // Ensure no error field exists
      expect(response.body.data).toHaveProperty('getProcesses');
      expect(Array.isArray(response.body.data.getProcesses)).toBe(true);
      expect(response.body.data.getProcesses.length).toBeGreaterThan(0);
    });
    
    it('field by field testing in response', async () => {
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
          
      expect(response.body.data.getProcesses[0].pid).toBeGreaterThan(0); // Ensure a valid process ID is returned
      expect(response.body.data.getProcesses[0].name).not.toBeNull();    // Ensure the process name is not null      
      expect(response.body.data.getProcesses[0].pid).not.toBeNull();
      expect(response.body.data.getProcesses[0].memVsz).not.toBeNull(); // Ensure memory info is present
      expect(response.body.data.getProcesses[0].user).not.toBeNull();  // Ensure user info is present
      expect(response.body.data.getProcesses[0].command).not.toBeNull();  // Ensure command info is present
      expect(typeof response.body.data.getProcesses[0].name).toBe('string');  // Name should be a string
      expect(response.body.data.getProcesses[0].memVsz).toBeGreaterThan(0);  // Ensure valid memory size
      expect(response.body.data.getProcesses[0].user).toMatch(/[a-z]+/);  // User should be a valid string
    });
  });

