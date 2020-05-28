import React, { useContext } from 'react';
import './App.css';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompleteRegistration from './components/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import CustomPrivateRoute from './components/CustomPrivateRoute';
import PasswordUpdate from './components/auth/PasswordUpdate';
import Profile from './components/auth/Profile';

import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import PasswordForgot from './components/auth/PasswordForgot';


const App = () => {
	const { state: { user } } = useContext(AuthContext);

	// create http link
	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
	});

	// setContext for authtoken
	const authLink = setContext(() => {
		return {
			headers: {
				authtoken: user ? user.token : ''
			}
		};
	});

	// concat http and authtoken link
	const link = authLink.concat(httpLink);

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link
	});

	return (
		<ApolloProvider client={client}>
			<Nav />
			<ToastContainer />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/complete-registration" component={CompleteRegistration} />
				<CustomPrivateRoute path="/password/update" component={PasswordUpdate} />
				<Route path="/password/forgot" component={PasswordForgot} />
				<CustomPrivateRoute path="/profile" component={Profile} />
			</Switch>
		</ApolloProvider>
	);
};

export default App;
