import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AuthContextProvider from './store/authcontext';
import axios from 'axios'
import isBaseURL from "@halfbug/is_base_url";


const baseURL =isBaseURL() === "localhost" ?'http://localhost:4000/':"/"
axios.defaults.baseURL = baseURL; 

// apollo client setup
const client = new ApolloClient({
    uri: baseURL+'graphql', 
    // uri: '/graphql',
    fetchOptions: {
        credentials: "include"
      },
      request: operation => {
        const token = localStorage.getItem("token");
        operation.setContext({
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          }
        });
      },
      onError: ({ networkError }) => {
          console.log(networkError);
        // if (networkError) {
        //   localStorage.setItem("token", "");
        // }
      }
});

ReactDOM.render(
<ApolloProvider client={client}>
    <AuthContextProvider>
         <App />
    </AuthContextProvider>
</ApolloProvider>, document.getElementById('root'));
