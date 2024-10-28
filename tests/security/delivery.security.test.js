const request = require('supertest');
const graphqlBaseUrl = 'http://localhost:4000/graphql';

describe('Malicious actor attempting a high-resource depth query', () => {
  it('should deny the deep nested query', async () => {
    // Craft a malicious query that exceeds typical depth limits
    const query = `
      query {
        getProcesses {
          pid
          parentPid
          name
          user {
            name
            processes {
              pid
              user {
                name
                processes {
                  pid
                  user {
                    name
                    processes {
                      pid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await request(graphqlBaseUrl)
      .post('/')
      .send({ query });

    // Expect a failure, potentially a 400 Bad Request if Apollo rejects it or fails validation
    expect(response.status).toBe(400); // Failing at GraphQL validation or server-level protection
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeDefined();
  });
});