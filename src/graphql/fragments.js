import { gql } from 'apollo-boost';

// user fragment
export const USER_INFOS = gql`
	fragment userInfos on User {
		_id
		name
		username
		email
		images {
			url
			public_id
		}
		bio
		createdAt
		updatedAt
	}
`;

// team fragment
export const TEAM_INFOS = gql`
	fragment teamsInfosForAUser on Team {
		_id
		name
		description
		admin {
			_id
			name
			username
			email
		}
		users {
			_id
			name
			username
		}
		createdAt
		updatedAt
	}
`;
