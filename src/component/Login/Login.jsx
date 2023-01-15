import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";

let Login  = ({isAuth}) => {
    let navigate = useNavigate();
    if(isAuth) {
       return( navigate("/profile"));
    };
    return <>Login</>
}

let mapStateToProps= (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Login);