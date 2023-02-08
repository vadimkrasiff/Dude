import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useRef } from "react";
import useOutsideClick from "../../hooks/useClickOtside";

let Photo = ({open, setOpen, photo}) => {

    const refModal = useRef();
    useOutsideClick(refModal, () => { setOpen(false) })

return <>
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
                backgroundImage: `url(${photo})`,
                backgroundSize: "100% 100%",
                height: 600,
                width: 600,
                borderRadius: 5,
            }}>
            <Button onClick={() => setOpen(false)} type="text"
                style={{ position: "absolute", right: -50, top: 0 }} icon={<CloseOutlined style={{ color: "white", fontSize: "20px" }} />}></Button>
        </Modal>
    </>
}

export default Photo;