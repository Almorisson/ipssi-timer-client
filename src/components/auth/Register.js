import React, { useState } from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../forms/AuthForm';

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
			{loading ? <h4 className="text-info">En cours...</h4> : <h4>Création de compte - étape 1/2</h4>}

            <AuthForm
				email={email}
				setEmail={setEmail}
				loading={loading}
				showPassword={false}
                onSubmitHandler={onSubmitHandler}
                btnText="Passer à la prochaine étape"
                disabledBtn={!email || loading}
			/>
		</div>
	);
};

export default Register;
