import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_TEAM, DELETE_TEAM } from '../../graphql/mutations';
import { ALL_TEAMS, ALL_USERS } from '../../graphql/queries';
import TeamCard from '../../components/TeamCard';
import TeamForm from '../../components/forms/TeamForm';
import omitDeep from 'omit-deep';

const initialState = {
	name: '',
	description: ''
	//users: []
};
const Team = () => {
	const [ values, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);
	const [ selected, setSelected ] = useState([]);

	// state values
	const { name, description, users } = values;
	// mutation
	const [ createTeam ] = useMutation(CREATE_TEAM, {
		// read query from cache / write query to cache
		update: (cache, { data: { createTeam } }) => {
			// read Query from cache for performance purpose later
			const { teamsCreatedByAdmin } = cache.readQuery({
				query: ALL_TEAMS
			});
			// write Query to cache
			cache.writeQuery({
				query: ALL_TEAMS,
				data: {
					teamsCreatedByAdmin: [ createTeam, ...teamsCreatedByAdmin ]
				}
			});
		},
		onError: (err) => console.log(err.graphQLError[0].message)
	});

	// queries
	const { data: teams } = useQuery(ALL_TEAMS);
	const { data: usersFomDb } = useQuery(ALL_USERS);

	/* useEffect(() => {
		setValues({ users: usersFomDb && [ ...usersFomDb.allUsers ] });
	}, []); */

	/* 	useMemo(
		() => {
			if (users) {
				setValues({
					...values,
					users: usersFomDb && usersFomDb.allUsers
				});
			}
		},
		[ users ]
	); */

	const [ deleteTeam ] = useMutation(DELETE_TEAM, {
		update: ({ data }) => {
			console.log('DELETE TEAM MUTATION', data);
			toast.info(`L'équipe a été supprimé !`);
		},
		onError: (err) => {
			console.log(err);
			toast.error("Une Erreur est survenue lors de la suppression de l'équipe !");
		}
	});

	const handleDelete = async (teamId) => {
		// Ask user if he really want to delete
		let answer = window.confirm('Voulez-vous vraiment supprimé cette équipe ?');
		if (answer) {
			setLoading(true);
			deleteTeam({
				variables: { teamId },
				refetchQueries: [ { query: ALL_TEAMS } ]
			});
			setLoading(false);
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		await createTeam({ variables: { input: values } });
		setValues(initialState);
		setLoading(false);
		toast.success('Votre équipe a été créée avec succès!');
	};

	const onChangeHandler = (e) => {
		e.preventDefault();
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSelectChange = (e) => {
		let options = e.target.options;
		let users = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				users.push(options[i].value);
			}
		}
		//setValues({ users: users, ...values });
	};

	const createTeamForm = () => {
		return (
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Nom de l'équipe</label>
					<input
						value={name || ''}
						name="name"
						type="text"
						placeholder="Entrer le nom de l'équipe"
						onChange={onChangeHandler}
						className="form-control"
						disabled={loading}
					/>
				</div>
				<div className="form-group">
					<textarea
						value={description}
						onChange={onChangeHandler}
						name="description"
						rows="5"
						className="md-textarea form-control"
						placeholder="Une description cool et brève"
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
				<button className="btn btn-raised btn-primary" type="submit" disabled={loading || !name}>
					Créer l'équipe
				</button>
			</form>
		);
	};
	return (
		<div className="container p-5">
			<div className="row">
				{loading ? (
					<h4 className="text-info">Chargement en cours...</h4>
				) : (
					<h4 className="py-5">Créer une nouvelle équipe</h4>
				)}
			</div>
			{createTeamForm()}
			{/* <TeamForm
				onChangeHandler={onSubmitHandler}
				onChangeHandler={onChangeHandler}
				labelTitle="Nom de l'équipe"
                name={name}
                description={description}
                loading={loading}
                btnText="Créer l'équipe"
                /> */}
			<hr />
			{/* Need to make a check otherwise users.allUsers provoke an error */}
			<div className="row p-5">
				{teams &&
					teams.teamsCreatedByAdmin.map((team) => (
						<div className="col-md-6 pt-5" key={team._id}>
							<TeamCard
								handleDelete={handleDelete}
								team={team}
								showDeleteButton={true}
								showUpdateButton={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Team;
