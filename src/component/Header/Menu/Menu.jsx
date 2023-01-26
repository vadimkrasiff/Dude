import { CaretDownOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/auth-reducer";

import useOutsideClick from "../../../hooks/useClickOtside"
import { getUserProfile } from "../../../redux/profile-reducer";
import css from "./Menu.module.css"

let Menu = ({ logout, profile, login }) => {

    let [openMenu, setMenu] = useState(false);

    const activeMenu = () => {
        setMenu(!openMenu);
    }

    const deactiveMenu = () => {
        setMenu(false);
    }   
    const ref = useRef();
    const lolRef = useRef();
    useOutsideClick(ref, deactiveMenu);

    if (!profile) {
        return <div className={css.menu}>
            <div style={{
                backgroundColor: "#fff",
                height: 50,
                width: 50,
                borderRadius: "50%",
                backgroundPosition: "center"
            }}>
            </div>
            <div><DownOutlined /></div>
        </div>
    }
    return <div className={css.menu}>
        
        <div style={openMenu ? {backgroundColor: "#3F7A7E"}: {}}  onClick={() =>{!openMenu && activeMenu()}} className={css.trigger}>
        <div ref={ref} style={{margin: 0}} className={!openMenu && css.ref}></div>
        <div style={{
            backgroundImage: `url(${profile.photos.small})`,
            backgroundSize: "100% 100%",
            height: 50,
            width: 50,
            borderRadius: "50%",
            backgroundPosition: "center"
        }}></div>
        <div className={css.name}>{login}</div>
        <div><CaretDownOutlined /></div>
        </div>
        <div className={`${css.contextMenu} ${!openMenu && css.closeMenu}`}>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/dialogs">Dialogs</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/friends">Friends</NavLink>
        <Button onClick={logout} type="primary" className={css.button} icon={<LogoutOutlined />}>Sign out</Button>
        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { logout, getUserProfile })(Menu);