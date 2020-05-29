import { gql } from 'apollo-boost';
import { USER_INFOS} from './fragments';

// Mutation(update user infos)
export const UPDATE_USER_PROFILE = gql`
	mutation updateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
				...userInfos
		}
	}
    ${USER_INFOS}
`;
