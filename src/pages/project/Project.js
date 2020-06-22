import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_PROJECT, DELETE_PROJECT } from '../../graphql/mutations';
import { ALL_PROJECTS } from '../../graphql/queries';
import ProjectCard from '../../components/ProjectCard';

const initialState = {
	name: '',
	description: ''
};
const Project = () => {
	const [ values, setValues ] = useState(initialState);
	const [ loading, setLoading ] = useState(false);

	// state values
	const { name, description } = values;
	// mutation
	const [ createProject ] = useMutation(CREATE_PROJECT, {
		// read query from cache / write query to cache
		update: (cache, { data: { createProject } }) => {
			// read Query from cache for performance purpose later
			const { projectsCreatedByUser } = cache.readQuery({
				query: ALL_PROJECTS
			});
			// write Query to cache
			cache.writeQuery({
				query: ALL_PROJECTS,
				data: {
					projectsCreatedByUser: [ createProject, ...projectsCreatedByUser ]
				}
			});
		},
		onError: (err) => {
			console.log(err.graphQLError);
			//toast.error(err.graphQLError[0].message)
		}
	});

	// queries
	const { data: projects } = useQuery(ALL_PROJECTS);

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

	const [ deleteProject ] = useMutation(DELETE_PROJECT, {
		update: ({ data }) => {
			console.log('DELETE PROJECT MUTATION', data);
			toast.info(`Le projet a été supprimé !`);
		},
		onError: (err) => {
			console.log(err);
			toast.error('Une Erreur est survenue lors de la suppression du projet !');
		}
	});

	const handleDelete = async (projectId) => {
		// Ask user if he really want to delete
		let answer = window.confirm('Voulez-vous vraiment supprimé ce projet ?');
		if (answer) {
			setLoading(true);
			deleteProject({
				variables: { projectId },
				refetchQueries: [ { query: ALL_PROJECTS } ]
			});
			setLoading(false);
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		await createProject({ variables: { input: values } });
		setValues(initialState);
		setLoading(false);
		toast.success('Le projet a été créée avec succès!');
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
		setValues({ users: users, ...values });
	};

	const createProjectForm = () => {
		return (
			<form onSubmit={onSubmitHandler}>
				<div className="form-group">
					<label>Nom du projet</label>
					<input
						value={name || ''}
						name="name"
						type="text"
						placeholder="Entrer le nom du projet"
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
					Créer le projet
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
					<h4 className="py-5">Créer un nouveau projet</h4>
				)}
			</div>
			{createProjectForm()}
			<hr />
			{/* {projects && JSON.stringify(projects)} */}
			{/* Need to make a check otherwise users.allUsers provoke an error */}
			<div className="row p-5">
				{projects &&
					projects.projectsCreatedByUser.map((project) => (
						<div className="col-md-12 p-3" key={project._id}>
							<ProjectCard
								handleDelete={handleDelete}
								project={project}
								showDeleteButton={true}
								showUpdateButton={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Project;
