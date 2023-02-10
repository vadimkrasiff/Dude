import { CloseOutlined, HeartFilled, HeartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";

import css from "./Photo.module.css"

let Photo = ({ open, setOpen, photo, photos, setCurrentPhoto, profile }) => {

    let date = new Date();
    const [currentIndex, setCurrentIndex] = useState('');
    const[like, setLike] = useState(false)

    const onLeft = () => {
        photos.map((el, index) => {
            if (photo == el)
                setCurrentPhoto(photos[index - 1])
        })

    }

    const onRight = () => {
        photos.map((el, index) => {
            if (photo == el)
                setCurrentPhoto(photos[index + 1])
        })
        { console.log(photos) }
    }

    return <>
        <Modal
            footer={null}
            open={open}
            closable={false}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            width={800}
            bodyStyle={{ height: 600, overflow: "hidden" }}
        >

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: `url(${photo})`,
                backgroundSize: "100% 100%",
                height: "100%",
                width: 500,
                borderRadius: "5px 0  0 5px",
            }}>

                {photos && photo !== photos[0] ? <div className={css.setPhoto} onClick={onLeft}><LeftOutlined /></div> : <div></div>}
                {photos && photo !== photos[photos.length - 1] && <div className={css.setPhoto} onClick={onRight} ><RightOutlined /></div>}
            </div>
            {profile && <div className={css.photoInfo}>

                <div className={css.userInfo}>
                    <div style={{
                        backgroundImage: `url(${profile.photos.small})`,
                        backgroundSize: "100% 100%",
                        height: 50,
                        width: 50,
                        borderRadius: "50%",
                        backgroundPosition: "center",
                        marginRight: 10
                    }}></div>
                    <div >
                        <div className={css.name}> {profile.fullName}</div>
                        <div className={css.date}>{date.toLocaleDateString()}</div>
                    </div>
                </div>
                <div className={css.buttons}>
                    <div className={css.like} onClick={()=>{setLike(!like)}}>{!like ? <HeartOutlined/> : < HeartFilled style={{color:"#FF3347"}} />}</div>
                </div>
            </div>}
            <Button onClick={() => setOpen(false)} type="text"
                style={{ position: "absolute", right: -50, top: 0 }} icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}></Button>
        </Modal>
    </>
}

let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps)(Photo);