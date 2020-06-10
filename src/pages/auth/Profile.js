import React, { useState, useMemo, useContext } from 'react';

// Apollo imports --
import { useQuery, useMutation } from '@apollo/react-hooks';

// Others dependencies imports --
import { toast } from 'react-toastify';
import omitDeep from 'omit-deep';

// context imports --
import { AuthContext } from '../../context/authContext';

// graphql imports --
import { USER_PROFILE } from '../../graphql/queries';
import { UPDATE_USER_PROFILE } from '../../graphql/mutations';
import UpdateProfileForm from '../../components/forms/UpdateProfileForm';


const Profile = () => {
    const { dispatch } = useContext(AuthContext);

	const [ profile, setProfile ] = useState({
		name: '',
		username: '',
		email: '',
		bio: '',
		images: []
	});

	const [ loading, setLoading ] = useState(false);

	const { data } = useQuery(USER_PROFILE);

	const [ updateUser ] = useMutation(UPDATE_USER_PROFILE, {
		update: ({ data }) => {
			console.log('UPDATED USER PROFILE: ', data);
			toast.success('Vos informations ont été mise à jour avec succès!');
		}
	});

	useMemo(
		() => {
			if (data) {
				setProfile({
					username: data.profile.username,
					name: data.profile.name,
					email: data.profile.email,
					bio: data.profile.bio,
					images: omitDeep(data.profile.images, [ '__typename' ])
				});

				//TODO: Fix warning messages when code are executed - We dispatch new infos to global state
				/* dispatch({
					type: 'LOGGED_IN_USER',
					payload: { ...data['profile'] }
				});*/
			}
		},
		[ data ]
	);

	const profileUpdateForm = () => {
        // Will come later to image upload - Not a must for the project
		const { username, name, email, bio, images } = profile;

		const onSubmitHandler = async (e) => {
			e.preventDefault();
			setLoading(true);
			//console.log(profile);
			try {
                // execute the mutation responsible to update user profile infos
				await updateUser({ variables: { input: profile } });
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};

		const onChangeHandler = (e) => {
			// we update the profile state by keeping the unmodified values and update changed properties
			setProfile({ ...profile, [e.target.name]: e.target.value });
		};

		const handleImagesUpload = () => {};

		return (
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Nom d'utilisateur</label>
					<input
						type="text"
						className="form-control"
						name="username"
						value={username}
						placeholder="Votre nouveau Nom d'utilisateur"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label>Nom</label>
					<input
						type="text"
						className="form-control"
						name="name"
						value={name || ''}
						placeholder="Votre nouveau Nom"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label>Adresse Email</label>
					<input type="email" className="form-control" name="email" value={email} disabled />
				</div>
				<div className="form-group">
					<label>Bio</label>
					<textarea
						type="text"
						className="form-control"
						name="bio"
						value={bio || ''}
						placeholder="votre biographie"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="form-group">
					<label>Images de Profil</label>
					<input
						type="file"
						accept="image/*"
						className="form-control"
						name="profileImages"
						onChange={handleImagesUpload}
					/>
				</div>

				<button className="btn btn-raised btn-primary" disabled={loading}>
					Mettre à jour mon profil
				</button>
			</form>
		);
	};
	return (
		<div className="container p-5">
			{loading ? <h4 className="text-info">En cours...</h4> : <h4 className="py-5">Mon Profil utilisateur</h4>}
			{profileUpdateForm()}
		</div>
	);
};

export default Profile;
