import React, { useState } from 'react';
import AuthForm from '../../components/forms/AuthForm';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const PasswordUpdate = () => {
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		// grab the infos of the current authenticate user and updates it
		await auth.currentUser.updatePassword(password).then(() => {
            setLoading(false)
            toast.success("Votre mot de passe a été mise à jour !");
            setPassword('');
        }).catch((error) => {
			setLoading(false);
			toast.error(error.message);
		});

	};

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">En cours ...</h4> : <h4 className="py-5">Modification de mot de passe</h4>}
			<AuthForm
				password={password}
				setPassword={setPassword}
				loading={loading}
				btnText="Mettre à jour"
				disabledBtn={!password || loading}
				onSubmitHandler={onSubmitHandler}
				showPasswordInput
				hideEmailInput
			/>
		</div>
	);
};

export default PasswordUpdate;
