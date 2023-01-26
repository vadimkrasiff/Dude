
import thunkMiddleware from "redux-thunk";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
const { combineReducers, legacy_createStore, applyMiddleware, compose } = require("redux");


let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    users: usersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = legacy_createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware )));

window.store = store;

export default store;