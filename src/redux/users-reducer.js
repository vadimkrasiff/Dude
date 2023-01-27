import { usersAPI } from "../api/api";

const GET_DATA_USERS = "GET_DATA_USERS";
const SET_FETCHING = 'SET_FETCHING';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

let initialState = {
    users: null,
    isFetching: false,
    totalCount: 0,
    currentPage:1
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

const setUsersData = (users) => ({ type: GET_DATA_USERS, users })
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const setCurrentPage = (currentPage =1) => ({ type: SET_TOTAL_COUNT, currentPage });

export const getDataUsers = (page) => async (dispatch) => {
    dispatch(setFetching(true))
    let response = await usersAPI.getUsers(page);
    setTimeout(() => dispatch(setFetching(false)), 300)
    if (response.error === null)
        dispatch(setUsersData(response.items))
        dispatch(setTotalCount(response.totalCount))
        dispatch(setCurrentPage(page))
}

export default usersReducer;