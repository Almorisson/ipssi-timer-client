import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
    const { state } = useContext(AuthContext);
	return (
		<div className="container pt-5">
           <div className="jumbotron text-center h1">
                Welcome to IPSSI Timer Manager
           </div>
           <hr/>
            {JSON.stringify(state.user)}
		</div>
	);
};

export default Home;
