import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";

import css from "./Photo.module.css"

let Photo = ({open, setOpen, photo, photos, setCurrentPhoto}) => {

    const [currentIndex, setCurrentIndex] = useState('');

    const onLeft = () => {
        photos.map((el, index)=> {
            if(photo == el)
            setCurrentPhoto(photos[index-1])
        })
        
    }

    const onRight = () => {
        photos.map((el, index)=> {
            if(photo == el)
            setCurrentPhoto(photos[index+1])
        })
        {console.log(photos)}
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
            bodyStyle ={{height:600, overflow:"hidden"}}
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
                    
                    {photos && photo !== photos[0] ? <div className={css.setPhoto}  onClick={onLeft}><LeftOutlined /></div>: <div></div>}
                {photos && photo !== photos[photos.length - 1] && <div className={css.setPhoto} onClick={onRight} ><RightOutlined /></div>}
                </div>
            <Button onClick={() => setOpen(false)} type="text"
                style={{ position: "absolute", right: -50, top: 0 }} icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}></Button>
        </Modal>
    </>
}

export default Photo;