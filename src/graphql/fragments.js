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
