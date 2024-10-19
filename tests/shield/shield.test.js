// const request = require('supertest');
// const graphQLBaseUrl = `http://localhost:4000/graphql`;

// // New test block to verify that mutations are denied by default
// describe('GraphQL Shield: Deny Mutations', () => {
    
//     it('should deny all mutations', async () => {
//         const mutation = `
//         mutation {
//           addProcess {
//             pid
//             name
//           }
//         }
//       `;
  
//       const response = await request(graphQLBaseUrl)
//         .post('/')
//         .send({ query: mutation });
  
//       expect(response.status).toBe(200);  // Assuming 200 for failed auth, adjust as needed
//     expect(response.body.errors).toBeDefined();
//       expect(response.body.errors[0].message).toContain('Not Authorized!'); // Or your specific error message
//     });
  
//   });
