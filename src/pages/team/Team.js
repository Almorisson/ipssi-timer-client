import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_TEAM, DELETE_TEAM } from '../../graphql/mutations';
import { ALL_TEAMS } from '../../graphql/queries';
import TeamCard from '../../components/TeamCard';

const initialState = {
	name: '',
	description: ''
};
const Team = () => {
	const [ values, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);

	// state values
	const { name, description } = values;
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
		onError: (err) => console.log(err.graphqQLError[0].message)
	});

	// queries
	const { data: teams } = useQuery(ALL_TEAMS);

	const [ deleteTeam ] = useMutation(DELETE_TEAM, {
		update: ({ data }) => {
			console.log('DELETE TEAM MUTATION', data);
			toast.error(`L'équipe a été supprimé !`);
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
			<hr />
			{/* 			{JSON.stringify(teams)} */}
			<div className="row p-5">
				{teams &&
					teams.teamsCreatedByAdmin.map((team) => (
						<div className="col-md-6 pt-5" key={team._id}>
							<TeamCard handleDelete={handleDelete} team={team} showDeleteButton={true} showUpdateButton={true} />
						</div>
					))}
			</div>
		</div>
	);
};

export default Team;
