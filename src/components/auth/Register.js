import React, { useState } from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';

const Register = () => {
	const [ email, setEmail ] = useState('ndiayemor164@gmail.com');
	const [ loading, setLoading ] = useState(false);

	const onSubmitHandler = async (e) => {
        e.preventDefault(); // prevent the default reload of the navigator

        setLoading(true);

        const config = {
            url: process.env.REACT_APP_COMPLETE_REGISTRATION_ENDPOINT,
            handleCodeInApp: true
        }
        // send a confirmation link to the user
        const result = await auth.sendSignInLinkToEmail(email, config);
        console.log('result', result);

        // show a tost notification wheen email is sent
        toast.success(`Hé, un email vient d'être envoyé à ${email}. Cliquer dessus pour continuer la création de compte.`)
        // store user email in localStorage
        window.localStorage.setItem("emailRegistrationForm", email);
        // clear state
        setEmail('');
        setLoading(false);
	};
	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">Loading...</h4> : <h4>Création de compte - étape 1/2</h4>}
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Adresse Email</label>
					<input
						value={email}
						name="email"
						type="email"
						placeholder="Entrer une adresse email valide"
						className="form-control"
						disabled={loading}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			<button className="btn btn-raised btn-primary" disabled={!email || loading}>
				Passer à la prochaine étape
			</button>
			</form>
		</div>
	);
};

export default Register;
