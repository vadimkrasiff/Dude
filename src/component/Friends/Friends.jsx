import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { compose } from "redux";
import css from "./Friends.module.css";
import userPhoto from "./../../user.jpg";
import { Button } from "antd";
import useQuery from "../../hooks/useQuery";
import Paginator from "../../comon/Paginator";
import { getDataFriends, setCurrentPage, setPortionPage, unfollow } from "../../redux/friends-reducer";
import Preloader from "../../comon/Preloader";

let Friends = ({ getDataFriends, friends, isFetching, totalCount, currentPage, setCurrentPage, setPortionPage, portionPage, unfollow, followingInProgress }) => {
    const lipUsers = ["", "", "", "", "", "", "", "", "", ""]

    useEffect(() => { getDataFriends(currentPage) }, [currentPage])

    if ( isFetching) {
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

    if(!totalCount) {
        return <div className={css.notFriends}>
            <div>You don't have any friends yet((</div>
            <div className={css.frogNotFreind}><Preloader/></div> 
        </div>
    }

    return <div className={css.users}>
        {
        friends.map((el) => {
            if(el.followed == true)
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
                        <Button type="primary" disabled={followingInProgress.some(id => id === el.id)}
                            onClick={() => unfollow(el.id)} className={css.button}>Unfollow</Button>

                    </div>
                </div>
                <div className={css.frog}>{el.followed && <div>DUDE</div>}</div>
            </div>
        })}
    </div>
}

let mapStateToProps = (state) => ({
    friends: state.friends.friends,
    isFetching: state.friends.isFetching,
    totalCount: state.friends.totalCount,
    currentPage: state.friends.currentPage,
    portionPage: state.friends.portion,
    followingInProgress: state.friends.followingInProgress
})
export default compose(connect(mapStateToProps, { getDataFriends, unfollow }))(Friends);