import { profileAPI } from "../api/api";
import { initializeApp } from "./app-reducer";
import { getPhotoProfile, setPhotoProfile } from "./auth-reducer";

let initialState = {
    profile: null,
    status: "",
    isFetching: false
};

const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_DATA = 'SAVE_PROFILE_DATA';
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
            case SAVE_PROFILE_DATA: {
                return {...state, profile: action.profile}
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
    setTimeout(()=> dispatch(setFetching(false)), 300)
    
    dispatch(setUserProfile(response.data));
    
}

export const savePhoto = (file) => async(dispatch) => {

    let response = await profileAPI.savePhoto(file);
    
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
        dispatch(setPhotoProfile(response.data.data.photos.small))
    }
};

export const saveProfile = (profile) => async(dispatch) => {
    
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(profile.userId))
    }
}

export default profileReducer;