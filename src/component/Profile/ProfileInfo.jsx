import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import css from "./Profile.module.css"

let ProfileInfo = ({ profile }) => {
    return <div className={css.userInfo}>
        <div className={css.titleInfo}>
            <div>
                <div className={css.userName}>{profile.fullName}</div>
                <div className={css.userStatus}>Status</div>
            </div>
            <Button type="text" className={css.editProfile} icon={<EditOutlined />}>Edit profile</Button>
        </div>
        <div className={css.partInfo}>
            <div className={css.titlePart}>Personal information</div>
            <div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>About me:</div>
                    <div className={css.contentParam}>{profile.aboutMe}</div>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Looking for a job:</div>
                    <div className={css.contentParam}>{profile.lookingForAJob ? "yes" : "no"}</div>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Description:</div>
                    <div className={css.contentParam}>{profile.lookingForAJobDescription}</div>
                </div>
            </div>
        </div>
        <div className={css.partInfo}>
            <div className={css.titlePart}>Contacts</div>
            <div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>facebook:</div>
                    <a href={profile.contacts.facebook} className={css.contentParam}>{profile.contacts.facebook}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Looking for a job:</div>
                    <div className={css.contentParam}>{profile.lookingForAJob ? "yes" : "no"}</div>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Description:</div>
                    <div className={css.contentParam}>{profile.lookingForAJobDescription}</div>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileInfo;