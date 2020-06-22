import { gql } from 'apollo-boost';
import { USER_INFOS, TEAM_INFOS, PROJECT_INFOS, TIMER_INFOS } from './fragments';

// query user infos
export const USER_PROFILE = gql`
	query {
		profile {
			...userInfos
		}
	}
    ${USER_INFOS}
`;

// query all users infos
export const ALL_USERS = gql`
	query {
		allUsers {
			...userInfos
		}
	}
    ${USER_INFOS}
`;

// query all teams infos
export const ALL_TEAMS = gql`
    query {
		teamsCreatedByAdmin {
			...teamsInfosForAUser
		}
	}
    ${TEAM_INFOS}
`;

// query a single team infos
export const SINGLE_TEAM = gql`
    query singleTeam($teamId: String!) {
        singleTeam(teamId: $teamId) {
            ...teamsInfosForAUser
        }
    }
    ${TEAM_INFOS}
`;

// query all teams infos
export const ALL_PROJECTS = gql`
    query {
		projectsCreatedByUser {
			...projectsInfosForAUser
		}
	}
    ${PROJECT_INFOS}
`;

// query a single team infos
export const SINGLE_PROJECT = gql`
    query singleProject($projectId: String!) {
        singleProject(projectId: $projectId) {
            ...projectsInfosForAUser
        }
    }
    ${PROJECT_INFOS}
`;

// query a single timer infos
export const SINGLE_Timer = gql`
    query singleProject($timerId: String!) {
        singleTimer(timerId: $timerId) {
            ...timerInfos
        }
    }
    ${TIMER_INFOS}
`;

// query all timers infos
export const ALL_TIMERS = gql`
    query {
		allTimersPerProject {
			...timerInfos
		}
	}
    ${TIMER_INFOS}
`;
