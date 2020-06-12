import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const CustomPublicRoute = ({ ...rest }) => {
	const { state } = useContext(AuthContext);
	let history = useHistory();

	useEffect(
		() => {
			if (state.user) {
				// if user is connected we also redirect hom to profile page when it try to go on /login or register
				history.push('/profile');
			}
		},
		[ state.user, history ]
	);

	return <Route {...rest} />;
};

export default CustomPublicRoute;
