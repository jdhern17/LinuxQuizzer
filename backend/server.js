const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

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

// Resolvers to return dummy data
const resolvers = {
  Query: {
    getSystemStats: () => ({
      cpuUsage: 45,
      memoryUsage: 60,
      activeProcesses: [
        { name: 'Process1', cpu: 20, memory: 30 },
        { name: 'Process2', cpu: 25, memory: 15 },
      ],
    }),
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