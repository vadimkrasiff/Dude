import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
    const NavigateComponent = (props) => {
        if(!props.isAuth) {
            return <Navigate replace to="/login" />;
        }
        return <Component {...props}
         />
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(NavigateComponent);

    return ConnectedAuthRedirectComponent;
};