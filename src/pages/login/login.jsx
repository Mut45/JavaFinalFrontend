import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils';
import '../login/login.css';
import Header from '../../components/header/header';
import { reqLogin } from '../../api';
import { useHistory } from "react-router-dom";


const Item = Form.Item;
const LoginForm = (props) => {
    let history = useHistory();
    const onFinish = (
        async (values) => {
            const { username, password } = values;
            const result = await reqLogin(username, password);
            console.log(result);
            if(result.code === 401){
                message.error('Incorrect username or password！');
            } else{
                const { role, token } = result.data;
                storageUtils.saveUser(username, token ,role);
                message.success('Hello，' + username + '！');
                history.push("/car-selection");
            }
        });

    return (
        <Form
            name="normal_login"
            className="login-form"
            size="large"
            initialValues={{ remember: true, }}
            onFinish={onFinish}
        >
            <Item name="username"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your username!',
                        }, {
                            pattern: /^[a-zA-Z0-9_]+$/,
                            message: 'Your username can only include numbers/characters or _!'
                        }, {
                            whitespace: true
                        }
                    ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    placeholder="username"
                />
            </Item>
            <Item name="password"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your password!',
                        }, {
                            pattern: /^[a-zA-Z0-9_]+$/,
                            message: 'Your username can only include numbers/characters or _!'
                        }
                    ]}>
                <Input
                    prefix={
                        <LockOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="password"
                    placeholder="password" />
            </Item>
            <Item>
                <Button style={{width: '100%',
                                marginBottom: 20}}
                        type="primary" htmlType="submit" className="login-form-button">
                        Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Item>
        </Form>
    );
};

class Login extends Component {
    render() {
        const user = storageUtils.getUser();
        if (user && user.username) {
            return <Redirect to='/car-selection' />;
        }
        return (
            <React.Fragment>
                <Header/>
                <div className="login">
                    <header className="header"></header>
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
                                >Sign In</p>
                            </Row>
                            <Row>
                                <Col style={{width: '100%'}}>
                                    <LoginForm className="login-form"/>
                                </Col>
                            </Row>
                            {/* <LoginForm history={this.props.history} handleUserLogin={this.props.handleUserLogin} /> */}
                        </div>
                    </div>
            </div>
            </React.Fragment>

        );
    }
}

export default withRouter(Login);