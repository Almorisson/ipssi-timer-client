import { gql } from 'apollo-boost';
import { USER_INFOS, TEAM_INFOS} from './fragments';

// Mutation(update user infos)
export const UPDATE_USER_PROFILE = gql`
	mutation updateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
				...userInfos
		}
	}
    ${USER_INFOS}
`;

export const CREATE_TEAM = gql`
    mutation createTeam($input: CreateTeamInput!) {
        createTeam(input: $input) {
            ...teamsInfosForAUser
        }
    }
    ${TEAM_INFOS}
`;
