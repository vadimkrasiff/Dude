import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { getDataUsers } from "../../redux/users-reducer";
import css from "./Users.module.css";






let Users = ({ getDataUsers, users }) => {
    const lipUsers = ["","","","","","","",""]
    const { currentPage } = useParams();
    
    useEffect(() => { getDataUsers(currentPage) }, [currentPage])



    if(!users) {
        return <div className={css.users}>
            {lipUsers.map((el)=> {
                return <div className={css.user}></div>
                })}
        </div>
    }

    return <div>
    </div>
}

let mapStateToProps = (state) => ({
    users: state.users.users
})

export default compose(connect(mapStateToProps, { getDataUsers }))(Users);