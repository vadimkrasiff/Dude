import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../comon/objects-helper";

const GET_DATA_FRIENDS = "GET_DATA_FRIENDS";
const SET_FETCHING = 'SET_FETCHING';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';
const UNFRIEND = 'UNFRIEND';

let initialState = {
    friends: null,
    isFetching: false,
    totalCount: null,

    followingInProgress: []
}

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UNFRIEND:
            return {
                ...state,
                friends: updateObjectInArray(state.friends, action.userId, "id", {followed: false}),
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case GET_DATA_FRIENDS:
            return { ...state, friends: action.friends };
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
        default:
            return state;
    }
}

const setFriendsData = (friends) => ({ type: GET_DATA_FRIENDS, friends })
export const unfollowSuccess = (userId) => { return ( {  type: UNFRIEND, userId })};
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getDataFriends = (page, count) => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await usersAPI.getUsers(page, count, true);
    setTimeout(() => dispatch(setFetching(false)), 300)
    if (response.error === null)
        dispatch(setFriendsData(response.items))
    dispatch(setTotalCount(response.totalCount))
}

export const unfollow =  ( userId) => async(dispatch) => {

    dispatch(toggleFollowingProgress(true, userId));
    let response = await usersAPI.unfollow.bind(usersAPI)(userId);
    if (response.data.resultCode == 0) {
        dispatch( unfollowSuccess(userId));
    }
    
    dispatch(toggleFollowingProgress(false, userId));
    let data = await usersAPI.getUsers( null, null, true);
    if (data.error === null)
    dispatch(setTotalCount(data.totalCount))
};

// export const unfollow = (userId) => {

//     return async (dispatch) => {
//         followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
//     };
// };

export default friendsReducer;