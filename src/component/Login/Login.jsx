import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Formik } from "formik";
import {  useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import css from "./Login.module.css";

let Login = ({ isAuth, login }) => {

    const [isRemember, setRemember] = useState(true);
    
    const [isMove, setMove] = useState(false);

    if (isAuth) {
        return <Navigate  to="/profile" replace />
    }

    return <div className={css.form}>
        <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                login(values.email, values.password, isRemember)
                setSubmitting(false);
                
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <div className={css.formik}>
                <Form onSubmitCapture={handleSubmit}>
                    <Typography.Title level={3} >Authorization</Typography.Title>
                    <label>Email</label>
                    <Form.Item>
                    
                        <Input
                        style={{width: "450px"}}
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </Form.Item>
                    <Form.Item>
                    <label>Password</label>
                    <div className={css.password}>
                        <Input
                            type={!isMove ?"password": "text"}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                    <div className={css.eye} onClick={() => setMove(!isMove)}>
                        {!isMove ?<EyeInvisibleOutlined />
                        : <EyeOutlined />}</div>
                    </div>
                    </Form.Item>
                    <Form.Item >
                        <label className={css.rem}>Remember me</label>
                        <Checkbox 
                            checked={isRemember}
                            onChange={()=> setRemember(!isRemember)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button  className={css.logButton} type="primary">
                            Sign in
                            <button className={css.buttonIn} type="submit" disabled={isSubmitting} ></button>
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            )}
        </Formik>
    </div>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);