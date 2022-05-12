import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message} from 'antd';
import Header from '../../components/header/header';
import { reqChangePassword } from '../../api';
import storageUtils from '../../utils/storageUtils';

const Item = Form.Item;
class ChangePassword extends Component {
    constructor(props){
        super(props);
    }
      render() {
        const onChangePasswordFinish = async(data) => {

            await reqChangePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            })
            .then((response)=>{
                console.log(response);
                if(response.code === 200) {
                    message.success('Succesfully Changed Password!');
                    storageUtils.removeUser();
                    this.props.history.push("/login");
                } else if (response.code === 404) {
                    message.error(response.msg);
                }  
            })
        }
        const user = storageUtils.getUser();
        if (!user || !user.username) {
            return <Redirect to='/login' />;
        }
        return (
        <React.Fragment>
            <Header history={this.props.history}></Header>
            <div className="content">
                        <div 
                            style={{
                                marginTop: 100,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '30%',
                            }} 
                            className="form-area">
                            <Row>
                                <p
                                    style={{
                                        fontSize: 40,
                                        fontWeight: 700,
                                    }}
                                >Change Password</p>
                            </Row>
                            <Row>
                                <Col style={{width: '100%'}}>
                                <Form
                                    style={{marginTop: 15}}
                                    size="large"
                                    initialValues={{ remember: true, }}
                                    onFinish={onChangePasswordFinish}
                                >
                                    <Item name="oldPassword"
                                        rules={
                                            [
                                                {
                                                    required: true,
                                                    message: 'Please enter the old password',
                                                }, 
                                            ]}>
                                        <Input
                                            placeholder="Old Passowrd"
                                        />
                                    </Item>
                                    <Item name="newPassword"
                                        rules={
                                            [
                                                {
                                                    required: true,
                                                    message: 'Please enter the new password!',
                                                }, 
                                            ]}>
                                        <Input
                                            placeholder="New Password"
                                        />
                                    </Item>
                                    <Item>
                                        <Button style={{width: '100%', marginBottom: 20}}
                                            type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Item>
                                </Form>
                                </Col>
                            </Row>
                            {/* <LoginForm history={this.props.history} handleUserLogin={this.props.handleUserLogin} /> */}
                        </div>
            </div>

        </React.Fragment>
        )
      }

}
export default withRouter(ChangePassword);