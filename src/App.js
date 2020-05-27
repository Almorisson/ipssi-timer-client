import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompleteRegistration from './components/auth/CompleteRegistration';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const client = new ApolloClient({
	cache,
	link
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Nav />
            <ToastContainer />
			<Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/complete-registration" component={CompleteRegistration} />
            </Switch>
		</ApolloProvider>
	);
};

export default App;
