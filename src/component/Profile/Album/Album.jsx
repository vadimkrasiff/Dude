import { Modal } from "antd";
import React, { useState } from "react";
import Photo from "../Photo";
import css from "./Albums.module.css"

let Album = ({ albums }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState([])
    const [currentPhoto, setCurrentPhoto] = useState('')
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return <>
        <div className={css.modalAlbums}>
            {albums.map((al) => (<div onClick={() => {showModal(); setCurrentAlbum(al.photo)}} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                backgroundImage: `url(${al.photo[0]})`,
                cursor: "pointer",
                backgroundSize: "100% 100%",
                padding: 10,
                height: 220,
                width: 220,
                backgroundPosition: "center",
                marginBottom: 15,
                marginRight: 15,
                fontWeight: 500,
                fontSize: "1rem",
                color: "#ffffffbd",
            }}>
                <div>{al.name}</div>
                <div>{al.photo.length}</div>
            </div>))}
        </div>
        <Modal open={isModalOpen} footer={[]} width={800}  onCancel={handleCancel}>
            <div className={css.modalPhotos}>
            {currentAlbum.map((photo) => (<div> <div onClick={() => { setOpen(true); setCurrentPhoto(photo) }} style={{
                    backgroundImage: `url(${photo})`,
                    cursor: "pointer",
                    backgroundSize: "100% 100%",
                    height: 240,
                    width: 240,
                    backgroundPosition: "center",
                    marginBottom: 15,
                    marginRight: 15,
                }}>

                </div>
                    <Photo open={open} setOpen={setOpen} photo={currentPhoto} />
                </div>))}
                </div>
        </Modal>
    </>
}

export default Album;