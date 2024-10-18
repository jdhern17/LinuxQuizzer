const request = require('supertest');

// New test block to verify that mutations are denied by default
describe('GraphQL Shield: Deny Mutations', () => {
  
    it('should deny all mutations', async () => {
      const mutation = `
        mutation {
          addProcess {
            pid
            name
          }
        }
      `;
  
      const response = await request(graphQLBaseUrl)
        .post('/')
        .send({ query: mutation });
  
      expect(response.status).toBe(400);  // Assuming 400 for failed auth, adjust as needed
      expect(response.body.errors[0].message).toContain('Not Authorised!'); // Or your specific error message
    });
  
  });