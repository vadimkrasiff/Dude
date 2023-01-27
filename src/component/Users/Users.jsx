import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { compose } from "redux";
import { getDataUsers } from "../../redux/users-reducer";
import css from "./Users.module.css";
import userPhoto from "./../../user.jpg";
import { Button } from "antd";

let Users = ({ getDataUsers, users, isFetching, totalCount, currentPage}) => {
    const lipUsers = ["", "", "", "", "", "", "", "", "", ""]


    useEffect(() => { getDataUsers() }, [])



    if (!users || isFetching) {
        return <div className={css.users}>
            {lipUsers.map((el) => {
                return <div className={css.user}>
                    <div className={css.info}>
                        <div className={css.avatar}
                            style={{
                                backgroundImage: `url(${userPhoto})`,
                                backgroundSize: "100% 100%",
                                width: 100,
                                height: 100,
                                borderRadius: "50%"
                            }}
                        ></div>
                        <div className={css.infoUsers}>
                            <div className={css.name} style={{ backgroundColor: "#CCCCCC", width: 100, height: 25, borderRadius: 5 }}></div>
                            <Button type="primary" className={css.button}></Button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    return <div className={css.users}>
        {users.map((el) => {
            return <div className={css.user}>
                <div className={css.info}>
                    <NavLink to={`/profile/${el.id}`}>
                        <div className={css.avatar}
                            style={{
                                backgroundImage: `url(${el.photos.small || userPhoto})`,
                                backgroundSize: "100% 100%",
                                width: 100,
                                height: 100,
                                borderRadius: "50%"
                            }}
                        ></div>
                    </NavLink>
                    <div className={css.infoUsers}>
                        <div className={css.name}>{el.name}</div>
                        <div className={css.friendship}>{el.followed ? "Friend" : "Not friend"}</div>
                        {el.followed ? <Button type="primary" className={css.button}>Unfollow</Button>
                        :<Button type="primary" className={css.button}>Follow</Button>}
                    </div>
                </div>
                <div className={css.frog}>{el.followed && <div>DUDE</div>}</div>
            </div>
        })}
    </div>
}

let mapStateToProps = (state) => ({
    users: state.users.users,
    isFetching: state.users.isFetching,
    totalCount: state.users.totalCount,
    currentPage: state.users.currentPage
})

export default compose(connect(mapStateToProps, { getDataUsers }))(Users);