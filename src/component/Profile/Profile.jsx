import { CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import useOutsideClick from "../../hooks/useClickOtside"
import { getUserProfile, savePhoto, saveProfile } from "../../redux/profile-reducer"
import css from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo"
import userPhoto from "./../../user.jpg";

import { getDataFriends } from "../../redux/friends-reducer";
import Albums from "./Album/Albums"
import Photo from "./Photo"

let Profile = (props) => {

    let { userId } = useParams();
    let id = userId;
    const [isPhoto, setNewPhoto] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState('') 



    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
            setNewPhoto(!isPhoto);
        }
    }

    useEffect(() => {
        if (!id) {
            id = props.authorizedUserId;
        }
        console.log(id)
        props.getUserProfile(id);
    }, [id])

    useEffect(() => { props.getDataFriends() }, [])

    return <>{!props.profile || props.isFetching ? <div className={css.content}>
        <div className={css.leftInfo}>
            <div className={css.avatar}
                style={{
                    backgroundImage: `url(${userPhoto})`,
                    backgroundSize: "100% 100%",
                }} ></div>
            <Button type="primary" className={css.editButton} >

                <input className={css.inputFile} type="file"  ></input>
            </Button>

        </div>
        <div className={css.rightInfo}>
            <div className={css.userInfo}>
                <div className={css.titleInfo}>
                </div>
            </div>
        </div>
    </div>
        : <div className={css.content}>
            <div className={css.leftInfo}>
                <div className={css.avatar}
                    style={{
                        backgroundImage: `url(${!props.profile.photos.large && userPhoto})`,
                        backgroundSize: "100% 100%",
                    }} >
                    <div onClick={() => {props.profile.photos.large && setOpen(true);  setCurrentPhoto(props.profile.photos.large)}} style={{
                        cursor: "pointer",
                        backgroundImage: `url(${props.profile.photos.large})`,
                        backgroundPosition: "center",
                        height: "90%",
                        width: "90%",
                        borderRadius: 3,
                        boxShadow: "none"

                    }}>
                    </div>
                    <Photo open={open} setOpen={setOpen} photo={currentPhoto} />
                </div>
                {!userId ?
                    <Button type="primary" className={css.editButton} icon={<EditOutlined />}>
                        Edit photo
                        <input className={css.inputFile} type="file" onChange={onMainPhotoSelected} ></input>
                    </Button> :
                    <Button type="primary" className={css.editButton} icon={<EditOutlined />}>
                        follow
                    </Button>
                }
                {(props.friends && !userId) &&
                    <NavLink to="/friends" className={css.friends}>
                        <div className={css.title}>Friends<span className={css.friendsCount}>{props.friendsCount}</span></div>
                        <div className={css.friendsInfo}>
                            {props.friends.map((el, index) => index < 3 && (<NavLink to={`/profile/${el.id}`} className={css.friend}>
                                <div style={{
                                    backgroundImage: `url(${el.photos.small || userPhoto})`,
                                    backgroundSize: "100% 100%",
                                    height: 50,
                                    width: 50,
                                    borderRadius: "50%",
                                    backgroundPosition: "center",
                                    marginBottom: 5
                                }}></div>
                                <div className={css.nameFriend}>{el.name.includes(" ") ? el.name.slice(0, el.name.indexOf(" "))
                                    : el.name.includes("-") ? el.name.slice(0, el.name.indexOf("-")) : el.name}</div>
                            </NavLink>))}
                        </div>
                    </NavLink>}
            </div>
            <div className={css.rightInfo}>
                <ProfileInfo profile={props.profile} saveProfile={props.saveProfile} />
                {props.albums && <Albums albums={props.albums} />}
            </div>
        </div>}
    </>
}

let mapStateToProps = (state) => {
    return ({
        profile: state.profile.profile,
        isFetching: state.profile.isFetching,
        status: state.profile.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        friends: state.friends.friends,
        friendsCount: state.friends.totalCount,
        albums: state.profile.album
    })
}

export default compose(connect(mapStateToProps, { getUserProfile, savePhoto, saveProfile, getDataFriends }), withAuthRedirect)(Profile);