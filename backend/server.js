const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');
const { shield, allow, deny } = require('graphql-shield');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const {ApolloArmor} = require('@escape.tech/graphql-armor');

const permissions = shield({
  Query: {
    "*": deny,        // Deny all queries by default
    getProcesses: allow,  // Allow the getProcesses query
  },
});

const typeDefs = gql`
  type Query {
    getProcesses: [Process]
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
      getProcesses: async () => {
        try {
          const response = await fetch('http://dummy:3001/get-processes');
          const data = await response.json();
          return data.processes.map(({ 
            pid, 
            parentPid, 
            name, 
            cpu, 
            cpuu, 
            cpus, 
            memVsz, 
            memRss, 
            nice, 
            started, 
            state, 
            tty, 
            user, 
            command, 
            params, 
            path 
          }) => ({
            pid,
            parentPid,
            name,
            cpu,
            cpuu,
            cpus,
            memVsz,
            memRss,
            nice,
            started,
            state,
            tty,
            user,
            command,
            params,
            path
          }));
        } catch (error) {
          console.error('Error fetching processes:', error);
          throw new Error('Failed to retrieve processes');
        }
      },
    },
  };



// Initialize Express and ApolloServer
const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const armor = new ApolloArmor({
  maxDepth: {
    n: 2, // Adjust depth limit here
  },
  // Other armor settings like costLimit, maxTokens, etc.
});

const protection = armor.protect();

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  ...protection,
  plugins: [...protection.plugins],
  validationRules: [...protection.validationRules],
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