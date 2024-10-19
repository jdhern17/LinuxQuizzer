const request = require('supertest');
const graphQLBaseUrl = `http://localhost:4000/graphql`;

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
      const response = await request(graphQLBaseUrl)
        .post('/')
        .send({ query });
      console.log(response.body);
      expect(response.status).toBe(200);  // Assuming 200 for failed auth, adjust as needed
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Not Authorized');  // Or your specific error message
    });
  });