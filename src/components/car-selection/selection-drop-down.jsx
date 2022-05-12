import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, DatePicker } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import { formatCountdown } from 'antd/lib/statistic/utils';
const { RangePicker } = DatePicker;

const Option = Select.Option;
class SelectionDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            
        }
    }
    render() {
        const onFinish = ((fieldValue) => {
            console.log('Received values of form: ', fieldValue);
        })
        const getLocationOptions = (() => {
            const options = [];
            this.props.locations.forEach((location) => {
                options.push(
                    <Option key={location.id} value={location.id}>
                        {location.city}
                    </Option>
                );
            });
            return options;
        });
        return (
            <React.Fragment>
                <Form
                    name="normal_login"
                    className="login-form"
                    size="large"
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                >
                    <Row 
                        gutter={24} 
                        style={{
                            marginBottom: 2.5,
                        }}>
                        <Col span={6} style={{fontWeight: 700}}>
                            Pick-up Locaion
                        </Col>
                        <Col span={6} style={{fontWeight: 700}}>
                            Drop-off Locaion
                        </Col>
                        <Col span={5} style={{fontWeight: 700}}>
                            Pick-up Time
                        </Col>
                        <Col span={5} style={{fontWeight: 700}}>
                           Drop-off time
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item 
                                rules={[
                                    {
                                        required: true,
                                        messsage: 'Input something!',
                                    }
                                ]}
                            >
                                <Select onChange={
                                        (value, e) => {
                                            let formData = this.props.formData;
                                            formData.selectedLocationId = value;
                                            this.props.handleFormDataChange(formData);
                                        }
                                    }>
                                    {getLocationOptions()}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item 
                                rules={[
                                    {
                                        required: true,
                                        messsage: 'Input something!',
                                    }
                                ]}
                            >
                                <Select onChange={
                                        (value, e) => {
                                            let formData = this.props.formData;
                                            formData.selectedDropoffLocationId = value;
                                            this.props.handleFormDataChange(formData);
                                        }
                                    }>
                                    {getLocationOptions()}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                    name="date-picker"
                                >
                                    <DatePicker 
                                        showTime 
                                        format="YYYY-MM-DD HH:mm:ss" 
                                        onChange={(value, e) => {
                                            let formData = this.props.formData;
                                            formData.selectedPickupDate = value.format("YYYY-MM-DD HH:mm:ss");
                                            this.props.handleFormDataChange(formData);
                                            
                                    }}/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="date-picker-2"
                            >
                                <DatePicker 
                                    showTime 
                                    format="YYYY-MM-DD HH:mm:ss" 
                                    onChange={(value, e) => {
                                        let formData = this.props.formData;
                                        formData.selectedDropoffDate = value.format("YYYY-MM-DD HH:mm:ss");
                                        this.props.handleFormDataChange(formData);
                                }}/>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <SearchOutlined 
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '10px'
                                }}
                                onClick={
                                    () => {
                                        this.props.handleFormSubmit();
                                    }
                                }
                            />
                        </Col>
                    </Row>
                </Form>

            </React.Fragment>

        );
    }
}

export default SelectionDropDown;