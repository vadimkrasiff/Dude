import {  DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import css from "./Profile.module.css"

let ProfileInfo = ({ profile, saveProfile }) => {

    const [isDeploy, setDeploy] = useState(false);

    let {userId}  = useParams();

    return <div className={css.userInfo}>
        <div className={css.titleInfo}>
            <div>
                <div className={css.userName}>{profile.fullName}</div>
                <div className={css.userStatus}>Status</div>
            </div>
            { !userId && <EditProfile profile={profile} saveProfile={saveProfile} />}
        </div>
        <div className={css.partInfo}>
            <div className={css.titlePart}>Personal information</div>
            <div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>About me:</div>
                    <div className={css.contentParam}>{profile.aboutMe  ||  "none"}</div>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Looking for a job:</div>
                    <div className={css.contentParam}>{profile.lookingForAJob ? "yes" : "no"}</div>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Description:</div>
                    <div className={css.contentParam}>{profile.lookingForAJobDescription ||  "none"}</div>
                </div>
            </div>
        </div>
        <div className={css.partInfo}>
            <div className={css.titlePart}>Contacts</div>
            <div className={!isDeploy ? css.contacts : css.fullContacts}>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Facebook:</div>
                    <a href={profile.contacts.facebook || null} className={css.contentParam}>{profile.contacts.facebook || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Website:</div>
                    <a  href={profile.contacts.website || null} className={css.contentParam}>{profile.contacts.website || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>VK:</div>
                    <a href={profile.contacts.vk || null} className={css.contentParam}>{profile.contacts.vk || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Twitter:</div>
                    <a href={profile.contacts.twitter || null} className={css.contentParam}>{profile.contacts.twitter || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Instagram:</div>
                    <a  href={profile.contacts.instagram || null} className={css.contentParam}>{profile.contacts.instagram || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Youtube:</div>
                    <a href={profile.contacts.youtube || null} className={css.contentParam}>{profile.contacts.youtube || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Github:</div>
                    <a href={profile.contacts.github || null} className={css.contentParam}>{profile.contacts.github || <div>none</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>MainLink:</div>
                    <a href={profile.contacts.mainLink || null} className={css.contentParam}>{profile.contacts.mainLink || <div>none</div>}</a>
                </div> 
            </div>
        </div>
        <Button className={css.buttonDeploy} onClick={() => setDeploy(!isDeploy)} type="text">
            {!isDeploy? <div>Подробнее <DownCircleOutlined /></div> : <div>Скрыть <UpCircleOutlined /></div>} 
            </Button>

    </div>
}

export default ProfileInfo;