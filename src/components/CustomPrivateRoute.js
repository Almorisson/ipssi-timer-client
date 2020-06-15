import React, { useContext, useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import RedirectLoader from './RedirectLoader';

const CustomPrivateRoute = ({children,  ...rest }) => {
    const { state } = useContext(AuthContext);
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (state.user) {
            setUser(true);
        }
    }, [state.user]);

    const sideNav = () => (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                        Profil
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/teams">
                        Equipes
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/projects">
                        Projets
                    </Link>
                </li>
                <hr />
                <li className="nav-item">
                    <Link className="nav-link" to="/password/update">
                        Mot de passe
                    </Link>
                </li>
            </ul>
        </nav>
    );

    const renderMainContent = () => (
        <div className="container-fluid pt-5">
            <div className="row">
                <div className="col-md-3">{sideNav()}</div>
                <div className="col-md-9">
                    <Route {...rest} />
                </div>
            </div>
        </div>
    );

    return user ? renderMainContent() : <RedirectLoader path="/" />;
};

export default CustomPrivateRoute;
