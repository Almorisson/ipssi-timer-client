import React, { useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';


const cache = new InMemoryCache();
const link = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const client = new ApolloClient({
	cache,
    link
});

const Home = () => {

	return (
		<div className="container pt-5">
           <div className="jumbotron text-center h1">
                Welcome to IPSSI Timer Manager
           </div>
		</div>
	);
};

export default Home;
