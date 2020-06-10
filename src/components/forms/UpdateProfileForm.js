import React from 'react';

const UpdateProfileForm = ({ username, name, email, bio, onSubmitHandler, onChangeHandler, loading }) => {
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
					disabled={loading}
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
					disabled={loading}
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
					disabled={loading}
				/>
			</div>

			<button className="btn btn-raised btn-primary" disabled={!email || loading}>
				Mettre é jour mon profil
			</button>
		</form>
	);
};

export default UpdateProfileForm;
