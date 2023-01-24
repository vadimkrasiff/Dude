import { EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select, Typography } from "antd";
import React from "react"
import { useState } from "react";
import cssPr from "./Profile.module.css"
import css from "./EditProfile.module.css"
import { connect, Formik } from "formik";
import { saveProfile } from "../../redux/profile-reducer";


let EditProfile = ({ profile, saveProfile }) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(profile.lookingForAJob)

    const onOpen = () => setOpen(!open);

    const onChange = (e) => {
        setValue(e);
        console.log(value)
    }

    return <>
        <Button type="text" className={cssPr.editProfile} onClick={onOpen} icon={<EditOutlined />}>Edit profile</Button>
        <Modal
            footer={[]}
            centered
            closable={false}
            open={open}
            onCancel={onOpen}
            width={600}
            bodyStyle={{

                height: 800,
            }}
            onOk={() => { onOpen() }}>
            <div className={css.modal}>
                <div className={css.title}>
                    <div>
                        <Typography.Title style={{ color: "#fff", margin: 0 }} level={4} >Edit profile</Typography.Title>
                    </div>
                </div>

                <Formik
                    initialValues={{
                        ...profile,
                        aboutMe: profile.aboutMe,
                        lookingForAJob: profile.lookingForAJob,
                        lookingForAJobDescription: profile.lookingForAJobDescription,
                        fullName: profile.fullName,
                        facebook: profile.contacts.facebook,
                        website: profile.contacts.website,
                        vk: profile.contacts.vk,
                        twitter: profile.contacts.twitter,
                        instagram: profile.contacts.instagram,
                        youtube: profile.contacts.youtube,
                        github: profile.contacts.github,
                        mainLink: profile.contacts.mainLink
                    }}

                    onSubmit={(values, { setSubmitting }) => {
                        let count = 0;
                        let newProfile = {
                            ...values, lookingForAJob: value, contacts: {
                                facebook: values.facebook,
                                website: values.website,
                                vk: values.vk,
                                twitter: values.twitter,
                                instagram: values.instagram,
                                youtube: values.youtube,
                                github: values.github,
                                mainLink: values.mainLink
                            }
                        };
                        for(let key in newProfile) {
                            if(newProfile[key] !== profile[key])
                            count++
                        }
                        if(!count) {
                            saveProfile(newProfile)
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,

                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form onSubmitCapture={handleSubmit}
                            layout="horizontal"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}

                            style={{ width: 600 }}>
                            <div className={css.form}>
                                <div>
                                    <div className={cssPr.partInfo}>
                                        <div className={cssPr.titlePart}>Personal information</div>
                                        <div style={{ width: 560 }}>

                                            <Form.Item className={css.formItem} label="Full name">
                                                <Input
                                                    type="fullName"
                                                    name="fullName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.fullName}
                                                    className={css.input} />
                                            </Form.Item>


                                            <Form.Item className={css.formItem}  label="About me">
                                                <Input
                                                    type="aboutMe"
                                                    name="aboutMe"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.aboutMe}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item
                                            className={css.formItem} 
                                                label="Description">
                                                <Input
                                                    type="lookingForAJobDescription"
                                                    name="lookingForAJobDescription"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lookingForAJobDescription}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item  className={css.formItem}  label="Job search">
                                                <Select style={{ width: 250, marginTop: 10 }}
                                                    options={[
                                                        {
                                                            value: true,
                                                            label: 'true',
                                                        },
                                                        {
                                                            value: false,
                                                            label: 'false',
                                                        },
                                                    ]}
                                                    onChange={onChange}
                                                    defaultValue={profile.lookingForAJob}
                                                    value={value}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className={cssPr.partInfo}>
                                        <div className={cssPr.titlePart}>Contacts</div>
                                        <div>
                                            <Form.Item className={css.formItem}  label="Facebook">
                                                <Input
                                                    type="facebook"
                                                    name="facebook"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.facebook}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item  className={css.formItem}  label="Website">
                                                <Input
                                                    type="website"
                                                    name="website"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.website}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem} 
                                                label="VK">
                                                <Input
                                                    type="vk"
                                                    name="vk"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.vk}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem}  label="Twitter">
                                                <Input
                                                    type="twitter"
                                                    name="twitter"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.twitter}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem}  label="Instagram">
                                                <Input
                                                    type="instagram"
                                                    name="instagram"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.instagram}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem} 
                                                label="YouTube">
                                                <Input
                                                    type="youtube"
                                                    name="youtube"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.youtube}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem}  label="Github">
                                                <Input
                                                    type="github"
                                                    name="github"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.github}
                                                    className={css.input} />
                                            </Form.Item>
                                            <Form.Item className={css.formItem}  label="Main link">
                                                <Input
                                                    type="mainLink"
                                                    name="mainLink"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.mainLink}
                                                    className={css.input} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.footer}>
                                    <Button className={css.button} onClick={onOpen} >Close</Button>
                                    <Button className={css.button} onClick={onOpen} type="primary">Save
                                        <button type="submit" className={css.buttonSave} disabled={isSubmitting}></button>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </Modal>
    </>
};



export default EditProfile;