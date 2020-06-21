import React from 'react';

const TeamForm = ({
	onSubmitHandler = (f) => f,
	onChangeHandler = (f) => f,
	labelTitle,
	name,
	description,
	btnText,
	loading
}) => {
	return (
		<form onSubmit={onSubmitHandler}>
			<div className="form-group">
				<label>{labelTitle}</label>
				<input
					value={name || ''}
					name="name"
					type="text"
					placeholder={!name ? "Enter le nom de l'équipe" : undefined}
					onChange={e => onChangeHandler(e)}
					className="form-control"
					disabled={loading}
				/>
			</div>
			<div className="form-group">
				<textarea
					value={description || ''}
					onChange={e => onChangeHandler(e)}
					name="description"
					rows="5"
					className="md-textarea form-control"
					placeholder={
						!description ? "Ecrivez une description digne d'un Dev et non d'un Admin :)" : undefined
					}
					maxLength="150"
					disabled={loading}
				/>
			</div>

			<button className="btn btn-raised btn-primary" type="submit" disabled={loading || !name || !description}>
				{btnText}
			</button>
		</form>
	);
};

export default TeamForm;
