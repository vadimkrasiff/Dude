
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { initializeApp } from "../../redux/app-reducer";
import { login } from "../../redux/auth-reducer";
import css from "./Login.module.css";

let Login = ({ isAuth, login }) => {

    const onFinish = (values) => {
        initializeApp()
        login(values.email, values.password, values.remember)
    }
    if (isAuth) {
        return <Navigate to="/profile" replace />
    }

    return <div className={css.form}>
        <div className={css.formik}>
        <Form 
            onFinish={onFinish}
            initialValues={{
                email: "",
                password: "",
                remember: true,
            }}
        >
            <Typography.Title level={3} >Authorization</Typography.Title>
            <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
    >
      <Button className={css.logButton} type="primary" htmlType="submit">
        Sign in
      </Button>
    </Form.Item>
        </Form>
        </div>
    </div>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);