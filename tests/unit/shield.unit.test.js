const request = require('supertest');
const graphqlBaseUrl = 'http://localhost:4000/graphql';

describe('GraphQL Shield: Allow getProcesses Query', () => {
    it('should allow the getProcesses query and return a list of processes', async () => {
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
        }`;

        const response = await request(graphqlBaseUrl)
            .post('/')
            .send({ query });

        expect(response.status).toBe(200); // Assuming a successful request
        expect(response.body.data).toHaveProperty('getProcesses'); // Ensure the response has 'getProcesses'
        expect(Array.isArray(response.body.data.getProcesses)).toBe(true); // Ensure it's an array
        expect(response.body.data.getProcesses.length).toBeGreaterThan(0); // Ensure it's not empty
    });
});