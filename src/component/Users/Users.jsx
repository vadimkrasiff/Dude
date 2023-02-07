import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import { follow, getDataUsers, setCurrentPage, setPortionPage, unfollow } from "../../redux/users-reducer";
import css from "./Users.module.css";
import userPhoto from "./../../user.jpg";
import { Button, Form, Input } from "antd";
import Paginator from "../../comon/Paginator";
import { SearchOutlined } from "@ant-design/icons";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let Users = ({ getDataUsers, users, isFetching, totalCount, currentPage, setCurrentPage, setPortionPage, portionPage, follow, unfollow, followingInProgress }) => {
    const lipUsers = ["", "", "", "", "", "", "", ""]

    const onFinish = (values) => {
        getDataUsers(currentPage, null, null,values.search) 
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    useEffect(() => { getDataUsers(currentPage) }, [currentPage])

    if (!users || isFetching) {
        return <div className={css.users}>
            <div className={css.search}></div>
            {lipUsers.map((el) => {
                return <div className={css.user}>
                    <div className={css.info}>
                        <div className={css.avatar}
                            style={{
                                backgroundImage: `url(${userPhoto})`,
                                backgroundSize: "100% 100%",
                                width: 100,
                                height: 100,
                                borderRadius: "50%"
                            }}
                        ></div>
                        <div className={css.infoUsers}>
                            <div className={css.name} style={{ backgroundColor: "#CCCCCC", width: 100, height: 25, borderRadius: 5 }}></div>
                            <Button type="primary" className={css.button}></Button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    }

    return <div className={css.users}>
        <div className={css.search}>
            <Form
            name="basic"
             onFinish={onFinish}
             onFinishFailed={onFinishFailed}
            initialValues={{
                search: ""
            }}
            >
                <Form.Item 
                name="search" 
                rules={[
                    {
                      required: true,
                      message: 'Please input your search!',
                    },
                  ]}>
                    <Input placeholder="search..."  style={{width: 930,  height: 40, position: "relative"}}/>
                </Form.Item>
                <Button n type='primary' style={{height: 40, width: 40, }} className={css.buttonSearch} htmlType='submit' icon={<SearchOutlined />} ></Button>
            </Form>
        </div>
        {users.map((el) => {
            return <div className={css.user}>
                <div className={css.info}>
                    <NavLink to={`/profile/${el.id}`}>
                        <div className={css.avatar}
                            style={{
                                backgroundImage: `url(${el.photos.small || userPhoto})`,
                                backgroundSize: "100% 100%",
                                width: 100,
                                height: 100,
                                borderRadius: "50%"
                            }}
                        ></div>
                    </NavLink>
                    <div className={css.infoUsers}>
                        <div className={css.name}>{el.name}</div>
                        <div className={css.friendship}>{el.followed ? "Friend" : "Not friend"}</div>
                        {el.followed ? <Button type="primary" disabled={followingInProgress.some(id => id === el.id)}
                            onClick={() => unfollow(el.id)} className={css.button}>Unfollow</Button>
                            : <Button type="primary" disabled={followingInProgress.some(id => id === el.id)}
                                onClick={() => follow(el.id)} className={css.button}>Follow</Button>}
                    </div>
                </div>
                <div className={css.frog}>{el.followed && <div>DUDE</div>}</div>
            </div>
        })}
        <Paginator totalCount={totalCount} setCurrentPage={setCurrentPage} currentPage={currentPage} portionPage={portionPage} setPortionPage={setPortionPage} />
    </div>
}

let mapStateToProps = (state) => ({
    users: state.users.users,
    isFetching: state.users.isFetching,
    totalCount: state.users.totalCount,
    currentPage: state.users.currentPage,
    portionPage: state.users.portion,
    followingInProgress: state.users.followingInProgress
})
export default compose(connect(mapStateToProps, { getDataUsers, setCurrentPage, setPortionPage, follow, unfollow }), withAuthRedirect)(Users);