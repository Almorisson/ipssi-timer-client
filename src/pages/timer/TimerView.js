import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_TIMER } from '../../graphql/mutations';
import { useParams } from 'react-router-dom';
import { SINGLE_PROJECT, ALL_TIMERS } from '../../graphql/queries';
import moment from 'moment';

const TimerView = () => {
	const [ loading, setLoading ] = useState(false);
	const [ timer, setTimer ] = useState(0);
	const [ paused, setPaused ] = useState(false);
	const [ values, setValues ] = useState({
		loggedTime: 0,
		title: '',
		description: ''
	});

	const [ createTimer ] = useMutation(CREATE_TIMER);
    const { data: allLoggedTimers } = useLazyQuery(ALL_TIMERS);
	const [ getSingleProject, { data: singleProject } ] = useLazyQuery(SINGLE_PROJECT);

	// For routeing
	const { projectid } = useParams();
	const { title, description, loggedTime } = values;

	/* 	useEffect(() => {
		console.log(projectid);
		getSingleProject({ variables: { projectId: projectid } });
	}, []); */

	const renderStartButton = () => {
		return (
			<button
				className="btn btn-raised btn-primary"
				onClick={() => {
					setInterval(() => {
						console.log(timer);
						!paused && setTimer((prevTimer) => prevTimer + 1000);
					}, 1000);
				}}
			>
				Logger une nouvelle tâche
			</button>
		);
	};

	const onChangeHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			createTimer({ variables: { input: values, projectId: projectid } });
		} catch (error) {
			toast.error('Le champ titre est requis pour créer la tâche');
			console.log(error);
		}
		setLoading(false);
		toast.success('Une nouvelle tâche a été créée avec succès !');
	};

	const logTimer = (e) => {
		e.preventDefault();
		setLoading(true);
		createTimer({ variables: { input: values, projectId: projectid } });
		setLoading(false);
		toast.success('Une nouvelle tâche a été créée avec succès !');
	};

	const pauseTimer = (e) => {
		e.preventDefault();
		setPaused(!paused);
	};

	const renderRunningTimer = () => {
		return (
			<form
				onSubmit={() => {
					setPaused(true);
					setValues({ ...values, loggedTime: timer });
				}}
			>
				<div className="form-group">
					<label>Nom du la tâche</label>
					<input
						value={title || ''}
						name="title"
						type="text"
						placeholder={'Enter le nom dee la tâche'}
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
				<div className="row">
					<div
						className="col-md-6"
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'space-between',
							justifyContent: 'center'
						}}
					>
						<button className="btn btn-raised btn-danger" onClick={pauseTimer}>
							{paused ? 'Reprendre' : 'Pause'}
						</button>
						<button
							className="btn btn-raised btn-dark btn-primary"
							onClick={(e) => {
								logTimer(e);
								setTimer(0);
							}}
						>
							Logger cette tâche
						</button>
					</div>
					<div className="col-md-6" style={{ alignItems: 'center', fontSize: '4.5em' }}>
						<input type="hidden" name="loggedTime" value={timer} onChange={onChangeHandler} />
						{moment.utc(timer).format('HH:mm:ss')}
					</div>
				</div>
			</form>
		);
	};

	return (
		<div style={{ flex: 1 }}>
			<h4 className="py-5">Démarrer un nouvelle tâche</h4>
			{timer > 0 ? renderRunningTimer() : renderStartButton()}
        <hr/>
        {JSON.stringify(allLoggedTimers && allLoggedTimers.allTimersPerProject)}
		</div>

	);
};

export default TimerView;
