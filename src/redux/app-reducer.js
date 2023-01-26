import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED-SUCCES';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCES:
            return {
                initialized: action.initialized
            }

        default:
            return state;
    }
}

export const initializedSucces = (initialized) => ({
    type: INITIALIZED_SUCCES, initialized
});

export const initializeApp = () => (dispatch) => {
    dispatch(initializedSucces(false))
    let promise = dispatch(getAuthUserData());
    
    Promise.all([promise])
        .then(() => {
            setTimeout(()=> dispatch(initializedSucces(true)),1000)
            
        });
};

export default appReducer;
