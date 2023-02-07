import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import css from "./Header.module.css"
import {logout} from './../../redux/auth-reducer';
import { NavLink } from "react-router-dom";
import Menu from "./Menu/Menu";
import { getUserProfile } from "../../redux/profile-reducer";

let Header = ({isAuth, logout, getUserProfile}) => {
    
    return <header>
        <div className={css.content}>
            <NavLink to='/profile' className={css.logo}><div className={css.icon}></div>DUDES</NavLink>
            { isAuth ?
            <Menu logout={logout}  />
        :<Button  type="text" className={css.button} icon={<LoginOutlined />}>
            <NavLink to={"/login"}>Sign in</NavLink></Button>}
        </div> 
    </header>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    
});

export default connect(mapStateToProps, {logout, getUserProfile })(Header);