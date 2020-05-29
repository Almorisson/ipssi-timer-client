import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import AuthForm from '../../components/forms/AuthForm';

const CREATE_USER = gql`
	mutation createUser {
		createUser {
			username
			email
		}
	}
`;

const CompleteRegistration = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const { dispatch } = useContext(AuthContext);

	let history = useHistory();

	useEffect(
		() => {
			setEmail(window.localStorage.getItem('emailRegistrationForm'));
		},
		[ history ]
	);

	const [ createUser ] = useMutation(CREATE_USER);

	const onSubmitHandler = async (e) => {
		// Avoid default Browser behavior
		e.preventDefault();

		setLoading(true);

		// Validate fields
		if (!email || !password) {
			toast.error("l'Adresse Email et le Mot de passe sont requis pour continer la création de compte.");
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(email, window.location.href);
			console.log(result);

			if (result.user.emailVerified) {
				// remove email from local storage
				window.localStorage.removeItem('emailRegistrationForm');
				// sign in user
				let user = auth.currentUser;
				// set user password
				await user.updatePassword(password);

				// dispatch user token and email
				const idTokenResult = await user.getIdTokenResult();

				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});

				// Make API request to save/update user in our mongodb database
				createUser();

				// Redirect user to Login page
				history.push('/profile');
			}
		} catch (error) {
			console.log(`[Registration Complete] Error:  ${error.message}`);
			setLoading(false);
			toast(error.message);
		}
	};

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">loading</h4> : <h4>Création de compte - étape 2/2</h4>}
            <AuthForm
				email={email}
				setEmail={setEmail}
				loading={loading}
				showPassword
                password={password}
                setPassword={setPassword}
                onSubmitHandler={onSubmitHandler}
                btnText="Terminer l'inscription"
                disabledBtn={!email || !password || loading}
                disabledEmailInput
			/>
		</div>
	);
};

export default CompleteRegistration;
