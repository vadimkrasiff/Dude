import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../comon/objects-helper";

const GET_DATA_USERS = "GET_DATA_USERS";
const SET_FETCHING = 'SET_FETCHING';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_PORTION = 'SET_PORTION';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

let initialState = {
    users: null,
    isFetching: false,
    totalCount: null,
    currentPage: 1,
    portion: 20,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case GET_DATA_USERS:
            return { ...state, users: action.users };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_PORTION:
            return {
                ...state,
                portion: action.portion
            }
        default:
            return state;
    }
}

const setUsersData = (users) => ({ type: GET_DATA_USERS, users })
export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const setCurrentPage = (currentPage = 1) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setPortionPage = (portion) => ({ type: SET_PORTION, portion });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getDataUsers = (page, count, friend=null, term) => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await usersAPI.getUsers(page, count, friend, term);
    setTimeout(() => dispatch(setFetching(false)), 300)
    if (response.error === null)
        dispatch(setUsersData(response.items))
    dispatch(setTotalCount(response.totalCount))
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    };
};

export const unfollow = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    };
};

export default usersReducer;