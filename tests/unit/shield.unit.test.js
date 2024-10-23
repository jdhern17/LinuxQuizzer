const request = require('supertest');
const graphqlBaseUrl = 'http://localhost:4000/graphql';

describe('GraphQL Shield: Deny getDummyData Query', () => {
  
    it('should deny getDummyData query', async () => {
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
    // temporary proxy for shield validation, needs more granular assessment
      expect(response.status).toBe(200);  // Assuming 200 for failed auth, adjust as needed
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBeDefined();
    });
  });