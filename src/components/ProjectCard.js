import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const ProjectCard = ({ project, handleDelete = (f) => f, showUpdateButton = false, showDeleteButton = false }) => {
	const history = useHistory();
	const { _id, name, description, createdAt, tasks } = project;
	return (
		<div className="card bg-light mb-3" style={{ width: '22rem' }}>
			<div className="card-header">Projet crÃ©Ã©e le {createdAt}</div> {/* date to format later */}
			<div className="card-body">
				<h5 className="card-title">
					<Link to={`/project/${_id}`}>{name}</Link>
				</h5>
				<p className="card-text">{description}</p>
				<hr />
				{/* <h6 className="card-text">Tâches associées à ce projet</h6> */}
				{/* <div className="card-text">
					{tasks && tasks.map((task) => <small key={task._id}>{JSON.stringify(task.title)}</small>)}
				</div> */}
				<div className="row mt-5 mb-1">
					<div className="col-md-6 p-3">
						{showDeleteButton && (
							<button onClick={() => handleDelete(_id)} className="btn btn-raised btn-danger mt-2">
								Supprimer
							</button>
						)}
					</div>
					<div className="col-md-6 p-3">
						{showUpdateButton && (
							<button
								onClick={() => history.push(`/project/update/${_id}`)}
								className="btn btn-raised btn-dark mt-2"
							>
								Mettre à jour
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
