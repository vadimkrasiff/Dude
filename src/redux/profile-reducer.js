import { profileAPI, usersAPI } from "../api/api";

let initialState = {
    profile: null,
    status: "",
    isFetching: false
};

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_FETCHING = 'SET_FETCHING';

const profileReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
            case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
            case SAVE_PHOTO_SUCCESS: {
                return { ...state, profile: { ...state.profile, photos: action.photos } }}
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setFetching = (isFetching) => ({type: SET_FETCHING, isFetching});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId) => async(dispatch) => {
    dispatch(setFetching(true))
    let response = await profileAPI.getProfile(userId);
    dispatch(setFetching(false))
    dispatch(setUserProfile(response.data));
    
}

export const savePhoto = (file) => async(dispatch) => {

    let response = await profileAPI.savePhoto(file);
    
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export default profileReducer;