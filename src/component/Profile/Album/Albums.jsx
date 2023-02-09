import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import Photo from "../Photo";
import Album from "./Album";
import css from "./Albums.module.css"

let Albums = ({ albums }) => {

    let i = 0;
    const photos = []
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState('')
    const [currentPhotos, setCurrentPhotos] = useState([""])
    const onPhotos = (album) => {
        album.map(el=> {
            el.photo.map(photo=>
            photos.push(photo))
            
        })
        console.log(photos)
        setCurrentPhotos(photos);
    }
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <>
    <Photo open={open} setOpen={setOpen} setCurrentPhoto={setCurrentPhoto} photo={currentPhoto} photos={currentPhotos}  />
        <div className={css.albums}>
            <div className={css.titleAlbum}>Albums  <Button type="primary" onClick={showModal} className={css.button} >Show all</Button></div>
            <div className={css.photos}>
                {albums.map((el) => (el.photo.map((photo) => photo !== null  &&  (<div onClick={() => {
                    setOpen(true); setCurrentPhoto(photo); onPhotos(albums)}}
                    style={{
                    backgroundImage: `url(${photo})`,
                    backgroundSize: "100% 100%",
                    cursor: "pointer",
                    height: 240,
                    minWidth: 240,
                    borderRadius: 3,
                    marginRight: 12,
                    backgroundPosition: "center",
                }}></div>))))}
            </div>

        </div>
        <Modal open={isModalOpen} footer={[]} width={800} onCancel={handleCancel}>
            <div className={css.modalTittle}><Typography.Title level={3}>Photos</Typography.Title></div>
            <div className={css.tittle}><Typography.Title level={4}>Albums</Typography.Title></div>
            <Album albums={albums} open={open} setOpen={setOpen} currentPhoto={currentPhoto} setCurrentPhoto={setCurrentPhoto} onPhotos={onPhotos} />
            <Photo open={open} setOpen={setOpen} setCurrentPhoto={setCurrentPhoto} photo={currentPhoto} photos={currentPhotos}  />
            <div className={css.modalPhotos}>

                {albums.map(el => (el.photo.map((photo) => (photo!== null &&<div> <div onClick={() => { setOpen(true); setCurrentPhoto(photo); onPhotos(albums)}} style={{
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
                </div>))))}
            </div>
        </Modal>
        
    </>
}

export default Albums;