const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const typeDefs = gql`
  type Query {
    getDummyData: DummyData
  }

  type DummyData {
    message: String
    simpleValue: Int
  }
`;


  // Resolvers updated to pull from dummy container
  const resolvers = {
    Query: {
      getDummyData: async () => {
        try {
          // Make a request to the dummy container's /dummy endpoint
          // curl -X POST http://localhost:4000/graphql \
          // -H "Content-Type: application/json" \
          // -d '{"query": "{ getDummyData { message simpleValue } }"}'
          const response = await fetch('http://dummy:3001/dummy');
          const data = await response.json();

          // Destructure the response data to match GraphQL schema
          const { message, simpleValue } = data;
          
          return { message, simpleValue };
        } catch (error) {
          console.error('Error fetching system stats:', error);
          throw new Error('Failed to fetch system stats');
        }
      },
    },
  };


// Initialize Express and ApolloServer
const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    // Log the full error details for debugging
    console.error('GraphQL Error:', err);

    // Return a generic error message to the client
    return new Error('An internal server error occurred');
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000' + server.graphqlPath);
  });
});