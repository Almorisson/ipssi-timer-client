import React, { useState, useEffect, useContext } from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const CompleteRegistration = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
    const {dispatch } = useContext(AuthContext);

    let history = useHistory();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailRegistrationForm"));
    }, [history]);

    const onSubmitHandler = async (e) => {
        // Avoid default Browser behavior
        e.preventDefault();

        setLoading(true);

        // Validate fields
        if(!email || !password) {
            setLoading(false);
            toast.error("l'Adresse Email et le Mot de passe sont requis pour continer la création de compte.");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result);
            // remove email from local storage
            window.localStorage.removeItem("emailRegistrationForm");

            if(result.user.emailVerified) {
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
                })

                // Make API request to save/update user in our mongodb database
                // Redirect user to Login page
                history.push('/');
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="container p-5">
			{ loading ?  <h4 className="text-info">loading</h4> : <h4>Création de compte - étape 2/2</h4>}
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Adresse Email</label>
					<input
						value={email}
						name="email"
						type="email"
						disabled
						className="form-control"
					/>
				</div>
                <div className="form-group">
					<label>Mot de passe</label>
					<input
						value={password}
						name="password"
						type="password"
						placeholder="Choisissez un mot de passe"
						disabled={loading}
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
					/>
				</div>
			<button className="btn btn-raised btn-primary" disabled={!email || loading}>
				Terminer l'inscription
			</button>
			</form>
		</div>
    )
}

export default CompleteRegistration;
