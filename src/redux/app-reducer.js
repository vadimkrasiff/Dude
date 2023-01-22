import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED-SUCCES';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCES:
            return {
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSucces = () => ({
    type: INITIALIZED_SUCCES
});

export const initializeApp = () => (dispatch) => {
    
    let promise = dispatch(getAuthUserData());
    
    Promise.all([promise])
        .then(() => {
            setTimeout(()=> dispatch(initializedSucces()),1000)
            
        });
};

export default appReducer;
