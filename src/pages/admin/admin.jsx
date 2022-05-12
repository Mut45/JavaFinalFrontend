import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import { Layout, Menu, Row, Col, Tabs, Form, Input, Button, message} from 'antd';
import { reqAddCoupon, reqAssignDiscount, reqManagePickup, reqManageDropoff } from '../../api';
import Header from '../../components/header/header';
const { TabPane } = Tabs;
const Item = Form.Item;

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }
      render() {
        const onAddDiscountFinish = async(data) => {
          await reqAssignDiscount({
            discount: data.discount,
            id: data.id
          })
          .then((response) => {
            console.log(response);
          })
        }
        const onDropoffFinish = async(data) => {
            await reqManageDropoff({
                endOdometer: data.endOdometer,
                id: data.id,
            })
            .then ((response)=>{
                console.log(response);
                if (response.code === 200) {
                    message.success('Successfully dropped off!');
                }
            })
        }
        const onPickupFinish = async(data) => {
            await reqManagePickup({
                id: data.id,
                startOdometer: data.startOdometer,
            }).then ((response)=>{
                console.log(response);
                if (response.code === 200) {
                    message.success('Successfully picked up!');
                }
            })
        }
        const onAddCouponFinish = async(data) => {
            await reqAddCoupon({
                description: data.description,
                discount: data.discount,
                endDate: data.endDate,
                id: data.id,
                individualId: data.individualId,
                startDate: data.startDate,
                status: data.status,
            })
        }
        const user = storageUtils.getUser();
            if (!user || !user.username || user.role != 'admin') {
                return <Redirect to='/login' />;
            }
        return (
            <React.Fragment>
                <Header hidden={false} history={this.props.history}/>
                <Row span={24}>
                    <Col span={6}>
                    </Col>
                    <Col span={12}>
                        <Row style={{marginTop: 16}}>
                            <h1 style={{fontSize: 64}}>
                                Admin
                            </h1>                            
                        </Row>
                            <Row>
                                <Tabs defaultActiveKey="1" onChange={()=>{}} size="large">
                                    <TabPane tab="Add Discount" style={{width: 750}} key="1">
                                    <Form
                                        style={{marginTop: 15}}
                                        name="normal_login"
                                        className="login-form"
                                        size="large"
                                        initialValues={{ remember: true, }}
                                        onFinish={onAddDiscountFinish}
                                    >
                                        <Item name="discount"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the discount!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Discount"
                                            />
                                        </Item>
                                        <Item name="id"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the corporate id!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Corporate ID"
                                            />
                                        </Item>
                                        <Item>
                                            <Button style={{width: '100%', marginBottom: 20}}
                                                type="primary" htmlType="submit" className="login-form-button">
                                                Add Discount
                                             </Button>
                                        </Item>
                                    </Form>
                                    
                                    </TabPane>
                                    <TabPane tab="Add Coupon" key="2" style={{width: 750}}>
                                    <Form
                                        style={{marginTop: 15}}
                                        name="normal_login"
                                        className="login-form"
                                        size="large"
                                        initialValues={{ remember: true, }}
                                        onFinish={onAddCouponFinish}
                                    >
                                        <Item name="description"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the description!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Description"
                                            />
                                        </Item>
                                        <Item name="discount"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the discount!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Discount"
                                            />
                                        </Item>

                                        <Item name="id"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the id!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Id"
                                            />
                                        </Item>
                                        <Item name="startDate"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the start datte!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Start Date"
                                            />
                                        </Item>
                                        <Item name="endDate"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the end date!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="End Date"
                                            />
                                        </Item>
                                        <Item name="individualId"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the individual id!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Individual ID"
                                            />
                                        </Item>
                                        <Item name="status"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the status!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Status"
                                            />
                                        </Item>
                                        <Item>
                                            <Button style={{width: '100%', marginBottom: 20}}
                                                type="primary" htmlType="submit" >
                                                Add Coupon
                                             </Button>
                                        </Item>
                                    </Form>
                                    </TabPane>
                                    <TabPane tab="Manage Pick-up" key="3" style={{width: 750}}>
                                    <Form
                                        style={{marginTop: 15}}
                                        name="normal_login"
                                        className="login-form"
                                        size="large"
                                        initialValues={{ remember: true, }}
                                        onFinish={onPickupFinish}
                                    >
                                        <Item name="id"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the order id!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Order ID"
                                            />
                                        </Item>
                                        <Item name="startOdometer"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the start odometer!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Start Odometer"
                                            />
                                        </Item>
                                        <Item>
                                            <Button style={{width: '100%', marginBottom: 20}}
                                                type="primary" htmlType="submit" className="login-form-button">
                                                Submit
                                             </Button>
                                        </Item>
                                    </Form>
                                    </TabPane>
                                    <TabPane tab="Manage Drop-off" key="4" style={{width: 750}}>
                                    <Form
                                        style={{marginTop: 15}}
                                        name="normal_login"
                                        className="login-form"
                                        size="large"
                                        initialValues={{ remember: true, }}
                                        onFinish={onDropoffFinish}
                                    >
                                        <Item name="id"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the order id!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="Order ID"
                                            />
                                        </Item>
                                        <Item name="endOdometer"
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter the end odometer!',
                                                    }, 
                                                ]}>
                                            <Input
                                                placeholder="End Odometer"
                                            />
                                        </Item>
                                        <Item>
                                            <Button style={{width: '100%', marginBottom: 20}}
                                                type="primary" htmlType="submit" className="login-form-button">
                                                Submit
                                             </Button>
                                        </Item>
                                    </Form>
                                    </TabPane>
                                </Tabs>
                        </Row>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
            </React.Fragment>
        );
      }

}
export default withRouter(Admin);