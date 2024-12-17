import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://' + import.meta.env.VITE_APP_EC2_IP + ':4000/graphql', // Use environment variable for backend URL
});

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  link: from([httpLink]),  // Set up Apollo client link
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>
)
