import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://' + process.env.EC2_IP + ':4000/graphql', // Use environment variable for backend URL
});

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: from([httpLink]),  // Set up Apollo client link
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);