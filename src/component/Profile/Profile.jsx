import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { connect } from "react-redux"
import { compose } from "redux"
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import css from "./Profile.module.css"

let Profile = () => {
    return <div className={css.content}>
        <div className={css.leftInfo}>
            <div className={css.avatar}>Photo</div>
                <Button type="primary" className={css.editButton} icon={<EditOutlined />}>Edit profile</Button>
        </div>
        <div className={css.rightInfo}>
            <div className={css.userInfo}>
                <div className={css.titleInfo}>
                    <div className={css.userName}>Name</div>
                    <div className={css.userStatus}>Status</div>
                </div>
            </div>
        </div>
    </div>
}

export default compose(connect() , withAuthRedirect)(Profile);