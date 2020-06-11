import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ALL_USERS } from '../graphql/queries';
import UserCard from '../components/UserCard';

const UsersPublicProfile = () => {
	const { data, loading } = useQuery(ALL_USERS);

	if (loading) return <p className="container text-info center p-5">Chargement en cours...</p>;

	return (
		<div className="container">
			<div className="row p-5">
				{data &&
					data.allUsers.map((user) => (
						<div className="col-md-4" key={user._id}>
							<UserCard user={user} />
						</div>
					))}
			</div>
		</div>
	);
};

export default UsersPublicProfile;
