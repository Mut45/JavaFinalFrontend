import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Header from '../../components/header/header';
import storageUtils from '../../utils/storageUtils';
import { Row, Col, Spin, Modal, Checkbox, Menu, Dropdown, Space, message } from 'antd';
import background from '../../assets/images/selection_background_2.jpg';
import SelectionDropDown from '../../components/car-selection/selection-drop-down';
import SearchResult from '../../components/car-selection/search-result';
import { DownOutlined} from '@ant-design/icons';
import { reqAvailableCoupons, reqAvailableVehicle, reqLocations, reqReserveVehicle } from '../../api';

class CarSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
                locations: [],
                isLoading: true,
                formData: {
                    selectedPickupDate: "",
                    selectedDropoffDate: "",
                    selectedLocationId: 0,
                    selectedDropoffLocationId: 0,
                },
                selectedCarInfo:{},
                ifCouponSelected: false,
                availableVehicles: [],
                availableCoupons: [],
                selectedCouponId: "",
                confirmationIsShown: false,
                ifUsingCoupons: false,
        }
    }
    getCouponMenuOptiions = () => {
        const items = [];
        if (this.state.availableCoupons.length > 0) {
            this.state.availableCoupons.forEach(
                (coupon) => {
                    items.push({
                        label: coupon.description,
                        key: coupon.id,
                    })

            })
        }
        return items;
    }

    handleFormDataChange = (data) => {
        this.setState({
            formData: data,
        })
    }

    handleConfirmationPopup = (isShown) => {
        this.setState({
            confirmationIsShown: isShown,
        })
    }

    handleSelectedCarInfoChange = (input) => {
        this.setState({
            selectedCarInfo: input,
        })
    }

    handleFormSubmit = async() => {
        this.setState({
            isLoading: true,
        });
        await reqAvailableVehicle({
            dropOffDate: this.state.formData.selectedDropoffDate,
            locationId: this.state.formData.selectedLocationId,
            pickUpDate: this.state.formData.selectedPickupDate,
        })
            .then((resolve) => {
                this.setState({
                    availableVehicles: resolve.data,
                })
                reqAvailableCoupons()
                    .then((resolve) => {
                        console.log(resolve);
                        this.setState({
                            availableCoupons: resolve.data,
                        })
                    })
                    .finally(() => {
                        this.setState({
                            isLoading: false,
                        })
                    })
            })
            .finally(() => {
                
            })

    }
    handleReservationSubmit = async () => {
        await reqReserveVehicle({
            couponId: this.state.selectedCouponId,
            dropOffDate: this.state.formData.selectedDropoffDate,
            dropOffLocationId: this.state.formData.selectedDropoffLocationId,
            pickUpDate: this.state.formData.selectedPickupDate,
            pickUpLocationId: this.state.formData.selectedLocationId,
            vehicleId: this.state.selectedCarInfo.id,
        }).then((response)=>{
            console.log(response);
        }).finally(() => {
            this.setState({
                confirmationIsShown: false,
            });
            message.success('Selected vehicle is successfully reserved!');
        })
    }

    componentDidMount = async() => {
        await reqLocations()
            .then((resolve) => {
                this.setState({
                    locations: resolve.data,
                })
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }   
    render() {
        const user = storageUtils.getUser();
        if (!user || !user.username) {
            return <Redirect to='/login' />;
        }
        if (user.role === 'admin') {
            return <Redirect to='/admin' />;
        }
        const menu = (
            <Menu 
                items={this.getCouponMenuOptiions()} 
                onClick={(e)=>{this.setState(
                    {
                        selectedCouponId: e.key,
                        ifCouponSelected: true
                    }
                )}}
                >

            </Menu>
        )
        return (
            <React.Fragment>
                <Header hidden={false} history={this.props.history}/>
                <Spin spinning={this.state.isLoading}>
                    <div style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '550px',
                        boxShadow: '2.5px 2.5px',
                        paddingTop: '30px',
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '70%',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
                            paddingTop: '7.5px',
                            paddingLeft: '40px',
                            paddingRight: '0px',
                            height: '87.5px'
                        }}>
                            <SelectionDropDown 
                                locations={this.state.locations} 
                                isLoadingHandler={this.isLoadingHandler} 
                                formData={this.state.formData}
                                handleFormDataChange={this.handleFormDataChange}
                                handleFormSubmit={this.handleFormSubmit}>  
                            </SelectionDropDown>
                        </div>
                        
                        
                    </div>
                    <Row>
                        <Col style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <p style={{
                            fontSize: 90,
                            fontWeight: 700,
                            fontFamily: 'serif',
                            marginBottom: 0,
                        }}>
                            Find Your Drive
                        </p>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <p style={{
                            fontSize: 30,
                            fontWeight: 700,
                            fontFamily: 'sans-serif',
                        }}>
                            <span style={{
                                background: 'linear-gradient(180deg,rgba(255,255,255,0) 50%, #FFD0AE 50%)'
                            }}>Start Your Journey Today</span>
                        </p>
                        
                        </Col>
                    </Row>
                    
                    <div style={{ marginTop: 15 }}>
                        <SearchResult 
                            isLoading={this.state.isLoading} 
                            availableVehicles={this.state.availableVehicles}
                            availableCoupons={this.state.availableCoupons}
                            handleConfirmationPopup={this.handleConfirmationPopup}
                            handleSelectedCarInfoChange={this.handleSelectedCarInfoChange}
                        ></SearchResult>
                    </div>
                    <Modal 
                        title="Reservation Confirmation"
                        visible={this.state.confirmationIsShown}
                        onOk={()=>{this.handleReservationSubmit()}}
                        onCancel={()=>{this.handleConfirmationPopup(false)}}
                    >
                        <p>
                            {"You are confirming the reservation for the following time slot: "}
                        </p>
                        <p>
                            {this.state.formData.selectedPickupDate + " -> " + this.state.formData.selectedDropoffDate}
                        </p>
                        <Checkbox 
                            onChange={() => {
                                this.setState({
                                    ifUsingCoupons: true,
                                })
                            }}
                        >
                            I wish to use a coupon
                        </Checkbox>
                        {this.state.ifUsingCoupons && (
                            <Row style={{marginTop: 15}}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a onClick={(e) => {e.preventDefault();}}>
                                        <Space>
                                            Select forom your available coupons
                                        <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Row>
                        )}
                        {this.state.ifCouponSelected && (
                            <Row style={{marginTop: 15}}> 
                                <p style={{color: '#90EE90'}}>Coupon successfully applied!</p>
                            </Row>
                        )}

                    </Modal>
                    <div style={{ height: 100}}></div>
                </Spin>
            </React.Fragment>

        );
    }
}

export default withRouter(CarSelection);