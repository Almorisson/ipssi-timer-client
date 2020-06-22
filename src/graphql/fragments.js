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

// team fragment
export const PROJECT_INFOS = gql`
	fragment projectsInfosForAUser on Project {
		_id
		name
		description
		createdBy {
			_id
			name
			username
			email
		}
		assignedTeams {
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
		}

		createdAt
		updatedAt
	}
`;

// team fragment
export const TIMER_INFOS = gql`
	fragment timerInfos on Timer {
		_id
		title
		description
		project {
			_id
			name
			description
		}
		createdAt
		updatedAt
	}
`;
