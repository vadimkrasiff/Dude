import { EditOutlined, UserOutlined } from "@ant-design/icons"
import { Button,  } from "antd"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { compose } from "redux"
import Preloader from "../../comon/Preloader"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import  { getUserProfile, savePhoto } from "../../redux/profile-reducer"
import css from "./Profile.module.css"

let Profile = (props) => {

    let navigate = useNavigate();
    let {id} = useParams();
    let userId = id;
    let [isPhoto, setNewPhoto] = useState(false);

    const refreshProfile = () => {
        if(!userId){
            userId = props.authorizedUserId;

            props.getUserProfile(userId);
        }
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length ){
             props.savePhoto(e.target.files[0])
             setNewPhoto(!isPhoto);
        }
      }

    useEffect(()=> refreshProfile(), [userId])

     
    return <>{!props.profile  || props.isFetching  ? <div className={css.content}>
    <div className={css.leftInfo}>
        <div className={css.avatar}>

        </div>
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
            <div className={css.avatar}>
                <div style={{

                    backgroundImage: `url(${props.profile.photos.large})`,
                    backgroundPosition: "center",
                    height: "90%",
                    width: "90%",
                    borderRadius: 3,
                    
                }}>                    
                </div>
            </div>
            <Button type="primary" className={css.editButton} icon={<EditOutlined />}>
                Edit photo
                <input className={css.inputFile} type="file" onChange={onMainPhotoSelected} ></input>
                </Button>
            
        </div>
        <div className={css.rightInfo}>
            <div className={css.userInfo}>
                <div className={css.titleInfo}>
                    <div>
                    <div className={css.userName}>{props.profile.fullName}</div>
                    <div className={css.userStatus}>Status</div>
                    </div>
                    <Button type="text" className={css.editProfile} icon={<EditOutlined />}>Edit profile</Button>
                </div>
            </div>
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

export default compose(connect(mapStateToProps, {getUserProfile, savePhoto}) , withAuthRedirect)(Profile);