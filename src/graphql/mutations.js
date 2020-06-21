import { gql } from 'apollo-boost';
import { USER_INFOS, TEAM_INFOS, PROJECT_INFOS} from './fragments';

// Mutation(update user infos)
export const UPDATE_USER_PROFILE = gql`
	mutation updateUser($input: UpdateUserInput!) {
		updateUser(input: $input) {
				...userInfos
		}
	}
    ${USER_INFOS}
`;

// Mutation(create user)
export const CREATE_TEAM = gql`
    mutation createTeam($input: CreateTeamInput!) {
        createTeam(input: $input) {
            ...teamsInfosForAUser
        }
    }
    ${TEAM_INFOS}
`;

// Mutation(create project)
export const CREATE_PROJECT = gql`
    mutation createProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            ...projectsInfosForAUser
        }
    }
    ${PROJECT_INFOS}
`;

// Mutation(update team infos)
export const UPDATE_TEAM = gql`
    mutation updateTeam($input: UpdateTeamInput!) {
        updateTeam(input: $input) {
            ...teamsInfosForAUser
        }
    }
    ${TEAM_INFOS}
`;

// Mutation(update project infos)
export const UPDATE_PROJECT = gql`
    mutation updateProject($input: UpdateProjectInput!) {
        updateProject(input: $input) {
            ...projectsInfosForAUser
        }
    }
    ${PROJECT_INFOS}
`;

// Mutation(delete user infos)
export const DELETE_TEAM = gql`
    mutation deleteTeam($teamId: String!) {
        deleteTeam(teamId: $teamId) {
            _id
        }
    }
`;

// Mutation(delete user infos)
export const DELETE_PROJECT = gql`
    mutation deleteProject($projectId: String!) {
        deleteProject(projectId: $projectId) {
            _id
        }
    }
`;
