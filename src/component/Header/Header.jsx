import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { connect } from "react-redux";
import css from "./Header.module.css"
import {logout} from './../../redux/auth-reducer';
import { NavLink } from "react-router-dom";

let Header = ({isAuth, logout}) => {
    
    return <header>
        <div className={css.content}>
            <div>DUDE</div>
            { isAuth ?
            <Button onClick={logout} type="text" className={css.button} icon={<LogoutOutlined />}>Sign out</Button>
        :<Button  type="text" className={css.button} icon={<LoginOutlined />}>
            <NavLink to={"/login"}>Sign in</NavLink></Button>}
        </div> 
    </header>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {logout })(Header);