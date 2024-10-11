const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');

// Type definitions (schema)
const typeDefs = gql`
  type Query {
    getSystemStats: SystemStats
  }

  type SystemStats {
    cpuUsage: Int
    memoryUsage: Int
    activeProcesses: [Process]
  }

  type Process {
    name: String
    cpu: Int
    memory: Int
  }
`;


  // Resolvers updated to pull from dummy container
  const resolvers = {
    Query: {
      getSystemStats: async () => {
        try {
          // Make a request to the dummy container's /stats endpoint
          const response = await fetch('http://dummy:3001/stats');
          const data = await response.json();

          // Destructure the response data to match GraphQL schema
          const { cpuUsage, memoryUsage, activeProcesses } = data;
          
          return {
            cpuUsage,
            memoryUsage,
            activeProcesses,
          };
        } catch (error) {
          console.error('Error fetching system stats:', error);
          throw new Error('Failed to fetch system stats');
        }
      },
    },
  };


// Initialize Express and ApolloServer
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000' + server.graphqlPath);
  });
});