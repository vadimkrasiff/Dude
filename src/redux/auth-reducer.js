import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { initializeApp, initializedSucces } from "./app-reducer";

const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCES = 'sumurai-network/auth/GET-CAPTCHA-URL-SUCCES';
const GET_PHOTO_PROFILE = "GET_PHOTO_PROFILE";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    photo: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                ...action.payload
            }
        case GET_PHOTO_PROFILE:
            return {
                ...state,
                photo: action.photo
            }
        default:
            return state;
    }

}

export const setPhotoProfile = (photo) => ({ type: GET_PHOTO_PROFILE, photo })

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

export const getCaptchaUrlSucces = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCES, payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => {
    
    let response = await authAPI.me();
    
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        let photo =  await authAPI.getPhoto(id);
        dispatch(setAuthUserData(id, email, login, true));
        dispatch(setPhotoProfile(photo))
    }
};



export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(initializedSucces(false))

        dispatch(getAuthUserData());
        
        setTimeout(()=> dispatch(initializedSucces(true)),1000)
    } else {
        // if (response.data.resultCode === 10) {
        //     dispatch(getCaptchaUrl());
        // }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }

};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(initializedSucces(false))
        dispatch(setAuthUserData(null, null, null, false));
        setTimeout(()=> dispatch(initializedSucces(true)),1000)
    }

};

export default authReducer;