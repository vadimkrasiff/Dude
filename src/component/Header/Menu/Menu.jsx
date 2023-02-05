import { CaretDownOutlined, DownOutlined, LogoutOutlined, UserOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/auth-reducer";

import useOutsideClick from "../../../hooks/useClickOtside"
import css from "./Menu.module.css"

let Menu = ({ logout, photo, login }) => {

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

    if (!photo) {
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
            backgroundImage: `url(${photo})`,
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
        <NavLink to="/profile"><UserOutlined style={{marginLeft: 5, marginRight: 10}} />Profile</NavLink>
        <NavLink to="/dialogs"><MessageOutlined style={{marginLeft: 5, marginRight: 10}}  /> Dialogs</NavLink>
        <NavLink to="/friends">
            <div style={{position: "relative", display: "flex", marginLeft: 2, marginRight:13}}>
            <UserOutlined style={{
            }} />
            <UserOutlined style={{
                position: "absolute",
                top: 0, left: 12,
                overflow:"hidden",
                borderBottomRightRadius: "100%",
                transform: "scale(-1, 1)",
                
                width: 10
            }} />
                </div> Friends</NavLink>
        <NavLink to="/users">
            <div style={{position: "relative", display: "flex", marginRight: 5}}>
            <UserOutlined style={{
                overflow:"hidden",
                borderBottomRightRadius: "100%",
                // backgroundColor: "red",
                
                width: 10
            }} />
            <UserOutlined style={{
                overflow:"hidden",
                borderBottomRightRadius: "100%",
                marginLeft: 5.9,
                transform: "scale(-1, 1)",
                // backgroundColor: "red",
                
                width: 10.1
            }} />
            
            
            <UserOutlined style={{
                position: "absolute",
                width: 10,
                top:1, left: 5,
            }} />
           
                </div>Users</NavLink>
        <NavLink to="/settings"><SettingOutlined style={{marginLeft: 5, marginRight: 10}}  />Settings</NavLink>
        <Button onClick={logout} type="primary" className={css.button} icon={<LogoutOutlined />}>Sign out</Button>
        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        photo: state.auth.photo
    }
}

export default connect(mapStateToProps, { logout})(Menu);