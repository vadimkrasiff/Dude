import { usersAPI } from "../api/api";

const GET_DATA_USERS = "GET_DATA_USERS";

let initialState = {
    users: null,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_USERS:
            return { ...state, users: action.users };
        default:
            return state;
    }
}

const setUsersData = (users) => ({type: GET_DATA_USERS, users})

export const getDataUsers =  (page) => async(dispatch) => {
    let  response =  await usersAPI.getUsers(page);
    if(response.error === null)
    dispatch(setUsersData(response.items))
}

export default usersReducer;