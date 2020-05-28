import React, { createContext, useReducer, useEffect } from 'react';
import { auth } from 'firebase';

// firebase reducer
const firebaseReducer = (state, action) => {
	switch (action.type) {
		case 'LOGGED_IN_USER':
			return { ...state, user: action.payload };

		default:
			return state;
	}
};
// initial state
const initialState = {
	user: null
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(firebaseReducer, initialState);

    useEffect(() => {
	const unsubscribe = auth().onAuthStateChanged(async (user) => {

		if (user) {

            const idTokenResult = await user.getIdTokenResult();
			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					email: user.email,
					token: idTokenResult.token
				}
			});
		} else {
			dispatch({
				type: 'LOGGED_IN_USER',
				payload: null
			});
		}
	});
    // call clean method to ensure that state won't lose if component is unmount and mounted again
    return () => unsubscribe();
}, []);

    const value = { state, dispatch };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export
export { AuthContext, AuthProvider };
