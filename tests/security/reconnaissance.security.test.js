const request = require('supertest');
const graphqlBaseUrl = 'http://localhost:4000/graphql';

describe('malicious actor attempting query to nonexisting type', () => {
  
    it('should deny query', async () => {
      const query = `
        query {
          getDummyData {
            message
            simpleValue
          }
        }
      `;
      const response = await request(graphqlBaseUrl)
        .post('/')
        .send({ query });
      expect(response.status).toBe(400);  // 400 failing at the graphql validation level
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBeDefined();
    });
  });