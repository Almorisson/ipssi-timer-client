import React, { useContext, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from 'firebase';
import { AuthContext } from '../context/authContext';

const Nav = () => {
	const { state: { user }, dispatch } = useContext(AuthContext);
	let history = useHistory();

	const logoutHandler = () => {
		// sign out the current user
		auth().signOut();

		// clean the user on the state
		dispatch({
			type: 'LOGGED_IN_USER',
			payload: null
		});
		// redirect to login page
		history.push('/login');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				IPSSI Timer Manager
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/">
							Accueil <span className="sr-only">(current)</span>
						</Link>
					</li>
					{user && (
						<li className="nav-item">
							<Link className="nav-link" to="/profile">
								{ user.updatedAt ? user.username.toLowerCase() : user.email.split("@")[0]}
							</Link>
						</li>
					)}

					{!user && (
						<Fragment>
							<li className="nav-item">
								<Link className="nav-link" to="/register">
									Créer un compte
								</Link>
							</li>
						</Fragment>
					)}

					{user ? (
						<li className="nav-item">
							<Link className="nav-link" to="/login" type="button" onClick={logoutHandler}>
								Se Déconnecter
							</Link>
						</li>
					) : (
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Se connecter
							</Link>
						</li>
					)}
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
						Search
					</button>
				</form>
			</div>
		</nav>
	);
};

export default Nav;
