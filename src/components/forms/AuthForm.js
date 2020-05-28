import React from 'react';

const AuthForm = ({
	email,
	password = '',
	setEmail,
	setPassword,
	showPassword = false,
	loading = false,
	onSubmitHandler,
	btnText,
    disabledBtn = true,
    disabledEmailInput = false
}) => {
	return (
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
                    disabled={disabledEmailInput}
				/>
			</div>
			{showPassword && (
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
			)}
			<button className="btn btn-raised btn-primary" disabled={disabledBtn}>
				{btnText}
			</button>
		</form>
	);
};

export default AuthForm;
