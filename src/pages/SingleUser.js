import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';

// query a single user infos for its public profile
export const USER_PUBLIC_PROFILE = gql`
	query publicProfile($username: String!) {
		publicProfile(username: $username) {
			_id
			name
			username
			email
			images {
				url
				public_id
			}
			bio
		}
	}
`;

const SingleUser = () => {
	let params = useParams();
	const { loading, data } = useQuery(USER_PUBLIC_PROFILE, {
		variables: { username: params.username }
	});

	if (loading) return <p className="text-info center p-5">Chargement en cours...</p>;

	return (
		<div className="container p-5">
			<UserCard user={data.publicProfile} />
		</div>
	);
};

export default SingleUser;
