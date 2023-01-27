import { CloseOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Modal, } from "antd"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import useOutsideClick from "../../hooks/useClickOtside"
import { getUserProfile, savePhoto, saveProfile } from "../../redux/profile-reducer"
import css from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo"
import userPhoto from "./../../user.jpg";

let Profile = (props) => {

    let { userId } = useParams();
    let id = userId;

    const [isPhoto, setNewPhoto] = useState(false);
    const [open, setOpen] = useState(false);
    const refModal = useRef();

    useOutsideClick(refModal, () => { setOpen(false) })


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
                    <div ref={refModal} onClick={() => props.profile.photos.large && setOpen(true)} style={{
                        cursor: "pointer",
                        backgroundImage: `url(${props.profile.photos.large})`,
                        backgroundPosition: "center",
                        height: "90%",
                        width: "90%",
                        borderRadius: 3,
                        boxShadow: "none"

                    }}>
                    </div>
                    <Modal

                        footer={null}
                        open={open}
                        closable={false}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        centered
                        style={{ height: 600 }}
                        bodyStyle={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            padding: 0,
                            backgroundImage: `url(${props.profile.photos.large || userPhoto})`,
                            backgroundSize: "100% 100%",
                            height: 600,
                            width: 600,
                            borderRadius: 5,

                        }}>
                        <Button onClick={() => setOpen(false)} type="text"
                            style={{ position: "absolute", right: -50, top: 0 }} icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}></Button>
                    </Modal>
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

            </div>
            <div className={css.rightInfo}>
                <ProfileInfo profile={props.profile} saveProfile={props.saveProfile} />
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
        isAuth: state.auth.isAuth
    })
}

export default compose(connect(mapStateToProps, { getUserProfile, savePhoto, saveProfile} ), withAuthRedirect)(Profile);