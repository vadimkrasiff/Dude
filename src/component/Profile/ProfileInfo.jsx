import {  DownCircleOutlined, EditOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useState } from "react";
import css from "./Profile.module.css"

let ProfileInfo = ({ profile }) => {

    const [isDeploy, setDeploy] = useState(false);

    

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
            <div className={!isDeploy ? css.contacts : css.fullContacts}>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Facebook:</div>
                    <a href={profile.contacts.facebook || null} className={css.contentParam}>{profile.contacts.facebook || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Website:</div>
                    <a  href={profile.contacts.website || null} className={css.contentParam}>{profile.contacts.website || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>VK:</div>
                    <a href={profile.contacts.vk || null} className={css.contentParam}>{profile.contacts.vk || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Twitter:</div>
                    <a href={profile.contacts.twitter || null} className={css.contentParam}>{profile.contacts.twitter || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Instagram:</div>
                    <a  href={profile.contacts.instagram || null} className={css.contentParam}>{profile.contacts.instagram || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Youtube:</div>
                    <a href={profile.contacts.youtube || null} className={css.contentParam}>{profile.contacts.youtube || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>Github:</div>
                    <a href={profile.contacts.github || null} className={css.contentParam}>{profile.contacts.github || <div>no</div>}</a>
                </div>
                <div className={css.userParam}>
                    <div className={css.titleParam}>MainLink:</div>
                    <a href={profile.contacts.mainLink || null} className={css.contentParam}>{profile.contacts.mainLink || <div>no</div>}</a>
                </div>
            </div>
        </div>
        <Button className={css.buttonDeploy} onClick={() => setDeploy(!isDeploy)} type="text">
            {!isDeploy? <div>Подробнее <DownCircleOutlined /></div> : <div>Скрыть <UpCircleOutlined /></div>} 
            </Button>

    </div>
}

export default ProfileInfo;