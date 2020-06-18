import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const TeamCard = ({ team, handleDelete = (f) => f, showUpdateButton = false, showDeleteButton = false }) => {
	const history = useHistory();
	const { _id, name, description, createdAt } = team;
	return (
		<div className="card bg-light mb-3" style={{ maxWidth: '18rem' }}>
			<div className="card-header">Equipe créée le {createdAt}</div> {/* date to format later */}
			<div className="card-body">
				<h5 className="card-title">
					<Link to={`/team/${_id}`}>{name}</Link>
				</h5>
				<p className="card-text">{description}</p>
				<div className="row mt-5 mb-1">
					<div className="col-md-6">
						{showDeleteButton && (
							<button onClick={() => handleDelete(team._id)} className="btn btn-raised btn-danger m-2">
								Delete
							</button>
						)}
					</div>
					<div className="col-md-6">
						{showUpdateButton && (
							<button
								onClick={() => history.push(`/team/update/${team._id}`)}
								className="btn btn-raised btn-dark mt-2"
							>
								Update
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamCard;
