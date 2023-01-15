import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css"

let NavBar = () => {
    return <div className={css.bar}>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/dialogs">Dialogs</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/friends">Friends</NavLink>
    </div>
}

export default NavBar;