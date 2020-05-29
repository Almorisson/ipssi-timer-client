import React, { useState } from 'react';
import AuthForm from '../../components/forms/AuthForm';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const PasswordForgot = () => {
	const [ email, setEmail ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_REDIRECT_LOGIN_ENDPOINT,
			handleCodeInApp: true
		};

		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
                setLoading(false);

				toast.success(
					`Un email vous a été envoyé à ${email}. Cliquer sur le lien pour réinitialiser votre mot de passe.`
				);

			})
			.catch((error) => {
				setLoading(false);
				toast.error("Vérifier bien que l'email entré est valide");
				console.log(error.message);
			});
	};

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">En cours ...</h4> : <h4>Réinitialisation de mot de passe</h4>}
			<AuthForm
				email={email}
				setEmail={setEmail}
				loading={loading}
				btnText="Réinitialiser"
				disabledBtn={!email || loading}
                onSubmitHandler={onSubmitHandler}
			/>
		</div>
	);
};

export default PasswordForgot;
