import React, { useContext } from 'react';

// Apollo imports --
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';

// components imports --
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import CustomPrivateRoute from './components/CustomPrivateRoute';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';

// react-router imports --
import { Switch, Route } from 'react-router-dom';

// react-toastify imports --
import { ToastContainer } from 'react-toastify';

// react-toastify imports --
import './App.css';
import CustomPublicRoute from './components/CustomPublicRoute';

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
				<CustomPublicRoute path="/login" component={Login} />
				<CustomPublicRoute path="/register" component={Register} />
				<Route path="/complete-registration" component={CompleteRegistration} />
				<CustomPrivateRoute path="/password/update" component={PasswordUpdate} />
				<Route path="/password/forgot" component={PasswordForgot} />
				<CustomPrivateRoute path="/profile" component={Profile} />
			</Switch>
		</ApolloProvider>
	);
};

export default App;
