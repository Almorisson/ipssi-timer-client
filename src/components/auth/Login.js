import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from 'firebase';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

const Login = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ success, setSuccess ] = useState(false);

	const { state, dispatch } = useContext(AuthContext);
	let history = useHistory();

	const onSubmitHandler = async (e) => {
		e.preventDefault(); // prevent the default Browser behavior
		setLoading(true);

		try {
			// sign in user with firebase
			await auth().signInWithEmailAndPassword(email, password).then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();

				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});

				// send info to our server and mongodb to either create/update

				// redirect user
				history.push('/');
			});
		} catch (error) {
			console.log(`Error ${error}`);
			toast.error('Les identifiants entrés sont invalides');
            setLoading(false);
		}
	};

	return (
		<div className="container p-5">
			<h4>Se connecter à son compte</h4>
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Adresse Email</label>
					<input
						value={email}
						name="email"
						type="email"
						placeholder="Entrer votre adresse email"
						onChange={(e) => setEmail(e.target.value)}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Mot de passe</label>
					<input
						value={password}
						name="password"
						type="password"
						placeholder="Entrer votre un mot de passe"
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-raised btn-primary" disabled={!email || !password || loading}>
					Se connecter
				</button>
			</form>
		</div>
	);
};

export default Login;
