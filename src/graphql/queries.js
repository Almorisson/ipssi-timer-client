import { gql } from 'apollo-boost';
import { USER_INFOS} from './fragments';

// query user infos
export const USER_PROFILE = gql`
	query {
		profile {
			...userInfos
		}
	}
    ${USER_INFOS}
`;

// query user infos
export const ALL_USERS = gql`
	query {
		allUsers {
			...userInfos
		}
	}
    ${USER_INFOS}
`;
