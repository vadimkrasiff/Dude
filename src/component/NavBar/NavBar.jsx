import { UserOutlined } from "@ant-design/icons";
import { MessageOutlined, SettingOutlined } from "@ant-design/icons/lib/icons";
import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css"

let NavBar = () => {
    return <div className={css.bar}>
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
        
    </div>
}

export default NavBar;