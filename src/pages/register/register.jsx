import React, { Component, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Row, Col, Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined, PhoneOutlined, CarOutlined, NumberOutlined, FieldNumberOutlined } from '@ant-design/icons';
import storageUtils from '../../utils/storageUtils';
import '../login/login.css';
import Header from '../../components/header/header';
import { reqCorporateRegister, reqCustomerRegister, reqLogin } from '../../api';
import { useHistory } from "react-router-dom";


const Item = Form.Item;
const RegisterForm = (props) => {
    const [isCorporate, setIsCorporate] = useState(false);
    let history = useHistory();
    const onFinish = (
        async (values) => {
            if (isCorporate) {
                await reqCorporateRegister({
                    email: values.email,
                    employeeId: values.employeeId,
                    name: values.name,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    registrationNumber: values.registrationNumber,
                    username: values.username,
                }).then((response) => {
                    console.log(response);
                    if(response.code === 200) {
                        history.push("/login");
                    } else if (response.code === 404) {
                        console.log('error');
                        message.error(response.msg);
                    }
                }) 
            } else {
                await reqCustomerRegister({
                    driverLicenseNumber: values.driverLicenseNumber,
                    email: values.email,
                    firstName: values.firstName,
                    insuranceCompanyName: values.insuranceCompanyName,
                    insurancePolicyNumber: values.insurancePolicyNumber,
                    lastName: values.lastName,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    username: values.username
                }).then((response) => {
                    console.log(response);
                    if(response.code === 200) {
                        history.push("/login");
                    } else if (response.code === 404) {
                        message.error(response.msg);
                    }
                }) 
            }
        });

    return (
        <React.Fragment>
        <Checkbox 
            onChange={() => {
                setIsCorporate(prevState => !prevState);
            }}
        >
            This is a corporate account
        </Checkbox>
        <Form
            style={{marginTop: 15}}
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
                    placeholder="Username"
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
                    placeholder="Password" />
            </Item>

            <Item name="email"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your email!',
                        }, {
                            type: "email",
                            message: 'Your email is not in the right format'
                        }
                    ]}>
                <Input
                    prefix={
                        <MailOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="email"
                    placeholder="Email" />
            </Item>
            {!isCorporate && (<Item name="firstName"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your first name!',
                        }, {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'Please enter your first name in the correct format!'
                        }, 
                    ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    placeholder="First name"
                />
            </Item>)}
            {!isCorporate && (<Item name="lastName"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your last name!',
                        }, {
                            pattern: /^[a-zA-Z]+$/,
                            message: 'Please enter your last name in the correct format!'
                        }, 
                    ]}>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    placeholder="Last name"
                />
            </Item>)}
            <Item name="phoneNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your phone number!',
                        }
                    ]}>
                <Input
                    prefix={
                        <PhoneOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type='number'
                    placeholder="Phone number" />
            </Item>
            {isCorporate && (<Item name="employeeId"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your employee id!',
                        }
                    ]}>
                <Input
                    prefix={
                        <NumberOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type='text'
                    placeholder="Employee ID" />
            </Item>)}
            {isCorporate && (<Item name="name"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your company name',
                        }
                    ]}>
                <Input
                    prefix={
                        <HomeOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="text"
                    placeholder="Company name" />
            </Item>)}
            {isCorporate && (<Item name="registrationNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your registration number!',
                        }
                    ]}>
                <Input
                    prefix={
                        <FieldNumberOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type='text'
                    placeholder="Registration Number" />
            </Item>)}
            {!isCorporate && (<Item name="driverLicenseNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your driver license!',
                        }
                    ]}>
                <Input
                    prefix={
                        <CarOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="text"
                    placeholder="Driver License" />
            </Item>)}
            {!isCorporate && (<Item name="insuranceCompanyName"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your insurance compnay name!',
                        }
                    ]}>
                <Input
                    prefix={
                        <HomeOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="text"
                    placeholder="Insurance company name" />
            </Item>)}
            {!isCorporate && (<Item name="insurancePolicyNumber"
                rules={
                    [
                        {
                            required: true,
                            message: 'Please enter your insurance policy number!',
                        }
                    ]}>
                <Input
                    prefix={
                        <CarOutlined className="site-form-item-icon" style={{ color: '#707070' }} />}
                    type="text"
                    placeholder="Insurance Policy Number" />
            </Item>)}
            <Item>
                <Button style={{width: '100%',
                                marginBottom: 20}}
                        type="primary" htmlType="submit" className="login-form-button">
                        Register
                </Button>
            </Item>
        </Form>
        </React.Fragment>
    );
};

class Register extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="login">
                    <header className="header"></header>
                    <div className="content">
                        <div 
                            style={{
                                marginTop: 25,
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
                                >Register</p>
                            </Row>
                            <Row>
                                <Col style={{width: '100%'}}>
                                    <RegisterForm className="register-form"/>
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

export default withRouter(Register);