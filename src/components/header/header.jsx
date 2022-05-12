import React, { Component } from 'react';
import logo from '../../assets/images/logo_3.jpg';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import storageUtils from '../../utils/storageUtils';


class Header extends Component {
    constructor(props) {
        super(props);
    }
    handleUserLogout = () => {
        storageUtils.removeUser();
        this.props.history.push('/login');
    }

    handleChangePassword = () => {
        this.props.history.push('/change-password');
    }


    render() {
        const user = storageUtils.getUser();
        const menu = (
            <Menu>
            <Menu.Item key="0">
                <a href="/history">Order History</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="/change-password">Change Password</a>
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>{this.handleUserLogout();}}>
                Logout
            </Menu.Item>
            </Menu>
        );
        const adminMenu = (
            <Menu>
            <Menu.Item key="1">
                <a href="/change-password">Change Password</a>
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>{this.handleUserLogout();}}>
                Logout
            </Menu.Item>
            </Menu>
        );
        return (
            <React.Fragment>
                <div 
                    style={{
                        height: '60px',
                        backgroundColor: '#FAFAFA',
                        paddingLeft: '30px',
                        borderBottom: '1px solid black',
                    }}
                    className="login-header">
                    <img style={{height: '59px'}} src={logo} alt='' 
                        onClick={()=>{
                            if(this.props.hidden==false) {
                                this.props.history.push('/car-selection');
                            }
                    }}/>
                    <Dropdown overlay={user.role === 'admin' ? adminMenu : menu} trigger={['click']}>
                        <UserOutlined  style={{marginLeft: '80%'}}></UserOutlined>
                    </Dropdown>
                    
                </div>
            </React.Fragment>

        );
    }
}

export default Header;