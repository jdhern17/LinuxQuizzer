const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');

// Type definitions (schema)
const typeDefs = gql`
  type Query {
    getSystemStats: SystemStats
    getProcesses: [Process]
  }

  type SystemStats {
    cpuUsage: Int
    memoryUsage: Int
    activeProcesses: [Process]
  }

type Process {
  pid: Int
  parentPid: Int
  name: String
  cpu: Float
  cpuu: Float
  cpus: Float
  memVsz: Int
  memRss: Int
  nice: Int
  started: String
  state: String
  tty: String
  user: String
  command: String
  params: String
  path: String
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