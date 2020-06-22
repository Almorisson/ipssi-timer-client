import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { SINGLE_TEAM, ALL_USERS, SINGLE_PROJECT } from '../../graphql/queries';
import { UPDATE_TEAM, UPDATE_PROJECT } from '../../graphql/mutations';
import { useParams } from 'react-router-dom';
import omitDeep from 'omit-deep';
import TimerView from '../timer/TimerView';

const ProjectUpdate = () => {
	const [ values, setValues ] = useState({
		name: '',
		description: '',
	});
	const [ getSingleProject, { data: singleProject } ] = useLazyQuery(SINGLE_PROJECT);
	const [ updateProject ] = useMutation(UPDATE_PROJECT);

	const [ loading, setLoading ] = useState(false);

	// For routing
	const { projectid } = useParams();

	// Grab data inside state
	const { name, description } = values;
    const { data: usersFomDb } = useQuery(ALL_USERS);

	useMemo(
		() => {
			if (singleProject) {
				setValues({
					...values,
					_id: singleProject.singleProject._id,
					name: singleProject.singleProject.name,
					description: singleProject.singleProject.description,
				});
			}
		},
		[ singleProject ]
	);

	useEffect(() => {
		console.log(projectid);
		getSingleProject({ variables: { projectId: projectid } });
	}, []);

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		updateProject({ variables: { input: values } });
		setLoading(false);
		toast.success("Les informations du projet sont mise à jour avec succès !");
	};


	const updateForm = () => (
		<form onSubmit={onSubmitHandler}>
			<div className="form-group">
				<label>Nom du Projet</label>
				<input
					value={name || ''}
					name="name"
					type="text"
					placeholder={!name ? "Enter le nom du projet" : undefined}
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

			<button className="btn btn-raised btn-primary" type="submit" disabled={loading || !name || !description}>
				Mettre à jour
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			{loading ? <h4 className="text-danger">Chargement en cours...</h4> : <h4>Administration des projets</h4>}
			{updateForm()}
            <hr/>
            <TimerView />
			<hr />
			{singleProject && JSON.stringify(singleProject)}
		</div>
	);
};

export default ProjectUpdate;
