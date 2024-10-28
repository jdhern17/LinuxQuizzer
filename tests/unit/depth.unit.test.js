const request = require('supertest');
const graphqlBaseUrl = `http://localhost:4000/graphql`;

describe('GraphQL Depth Limiting', () => {
  it('should allow a query within the allowed depth', async () => {
    const query = `
      query {
        getProcesses {
          pid
          name
          cpu
          user
        }
      }
    `;

    const response = await request(graphqlBaseUrl)
      .post('/')
      .send({ query });

    expect(response.status).toBe(200); // Expect a successful response
    expect(response.body.data).toHaveProperty('getProcesses'); // Ensure the correct data is returned
  });

  it('should reject a query exceeding the depth limit', async () => {
    const query = `
      query {
        getDepthDummyTest {
          depth2Test {
            depth3Test
    }
  }
}
    `;

    const response = await request(graphqlBaseUrl)
      .post('/')
      .send({ query });

    expect(response.status).toBe(400); // Expect a 400 error for a failed depth validation
    expect(response.body.errors[0].message).toContain('error');
    expect(response.body.errors).toBeDefined();
  });
});