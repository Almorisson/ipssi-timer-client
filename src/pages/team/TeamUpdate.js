import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_TEAM, ALL_USERS } from '../../graphql/queries';
import { UPDATE_TEAM } from '../../graphql/mutations';
import { useParams } from 'react-router-dom';
import TeamForm from '../../components/forms/TeamForm';
import omitDeep from 'omit-deep';
import TimerView from '../timer/TimerView';

const TeamUpdate = () => {
	const [ values, setValues ] = useState({
		name: '',
		description: '',
		users: [] // I will take care of it later
	});
	const [ getSingleTeam, { data: singleTeam } ] = useLazyQuery(SINGLE_TEAM);
	const [ updateTeam ] = useMutation(UPDATE_TEAM);

	const [ loading, setLoading ] = useState(false);

	// For routeing
	const { teamid } = useParams();

	// Grab data inside state
	const { name, description, users } = values;
    const { data: usersFomDb } = useQuery(ALL_USERS);

	useMemo(
		() => {
			if (singleTeam) {
				setValues({
					...values,
					_id: singleTeam.singleTeam._id,
					name: singleTeam.singleTeam.name,
					description: singleTeam.singleTeam.description,
					users: omitDeep(singleTeam.singleTeam.users, [ '__typename' ])
				});
			}
		},
		[ singleTeam ]
	);

	useEffect(() => {
		console.log(teamid);
		getSingleTeam({ variables: { teamId: teamid } });
	}, []);

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		updateTeam({ variables: { input: values } });
		setLoading(false);
		toast.success("Les informations de l'équipe sont mise à jour avec succès !");
	};

	const onSelectChange = (e) => {
		let options = e.target.options;
		let users = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				users.push(options[i].value);
			}
		}
		setValues({ users: users, ...values });
	};

	const updateForm = () => (
		<form onSubmit={onSubmitHandler}>
			<div className="form-group">
				<label>Nom de l'équipe</label>
				<input
					value={name || ''}
					name="name"
					type="text"
					placeholder={!name ? "Enter le nom de l'équipe" : undefined}
					onChange={onChangeHandler}
					className="form-control"
					disabled={loading}
				/>
			</div>
			<div className="form-group">
				<textarea
					value={description || ''}
					onChange={onChangeHandler}
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

			<div className="form-group mb-5 mt-3">
				<label>Ajouter des personnes à votre équipe</label>
				<select
					multiple={true}
					onChange={onSelectChange}
					name="users"
					className="custom-select"
					id="inputGroupSelect02"
				>
					{usersFomDb &&
						usersFomDb.allUsers.map((user) => (
							<option key={user._id} value={user}>
								{user.name}
							</option>
						))}
				</select>
			</div>

			<button className="btn btn-raised btn-primary" type="submit" disabled={loading || !name || !description}>
				Mettre à jour
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-danger">Chargement en cours...</h4> : <h4>Mise à jour d'une équipe</h4>}
			{updateForm()}
            <hr/>
            <TimerView />
			<hr />
			{/* {singleTeam && JSON.stringify(singleTeam)} */}
			{/* <TeamForm
				onChangeHandler={onSubmitHandler}
				onChangeHandler={onChangeHandler}
				labelTitle="Nom de l'équipe"
                name={name}
                description={description}
                loading={loading}
                btnText="Mettre à jour"
			/> */}
		</div>
	);
};

export default TeamUpdate;
