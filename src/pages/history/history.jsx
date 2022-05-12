import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import Header from '../../components/header/header';
import { Row, Col, Spin, Modal, Form, InputNumber} from 'antd';
import { Tabs } from 'antd';
import { reqReservedOrders, reqDroppedoffOrders, reqPickedupOrders, reqPaidOrders, reqProcessPayment } from '../../api';
import HistoryContentEntry from '../../components/history/history-content-entry';
const { TabPane } = Tabs;

class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            reservedOrders:[],
            pickedupOrders:[],
            paidOrders:[],
            droppedoffOrders:[],
            isLoading: false,
            paymentData: null,
            isPaymentWindowOpen: false,
            cardNumber: -1,
        }
    }
    handlePaymentSubmit = async() =>{
        await reqProcessPayment({
            customerVehicleId: this.state.paymentData.id,
            payments: [
                {
                    amount: this.state.paymentData.invoice.amount,
                    cardNumber: this.state.cardNumber,
                    method: "C",
                    paymentDate: new Date().toISOString().split('T')[0] + " 00:00:00",
                    invoiceId: this.state.paymentData.invoice.id,
                }
            ]
        })
            .then((response) => {
                console.log(response);
            })
            .finally(() => {
                this.setState({
                    isPaymentWindowOpen: false,
                });
                window.location.reload();
            })
        ;
    }
    handlePaymentDataChange=(input) => {
        this.setState({
            paymentData: input,
        });
    }

    handlePaymentWindow=(isOpen) => {
        this.setState({
            isPaymentWindowOpen: isOpen,
        });
    }

    getOrderEntries=(entriesData, isPaymentPending) => {
        let children = [];
        entriesData.forEach((entry) => {
            children.push(
            <HistoryContentEntry 
                handlePaymentWindow={this.handlePaymentWindow} 
                handlePaymentDataChange={this.handlePaymentDataChange} 
                isPaymentPending={isPaymentPending} 
                entriesData={entry}
            />)
        });
        return children;
    }

    onHandleChangeNumeric = (e) => {
        let valu = e.target.value;
       
        if (!Number(valu)) {
        return;
        }
       
        this.setState({ cardNumber: valu });
       };
    componentDidMount = async() => {
        this.setState({isLoading: true});
        await reqReservedOrders()
            .then((reserved) => {
                this.setState({reservedOrders: reserved.data});
                reqDroppedoffOrders()
                    .then((droppedOff)=>{
                        this.setState({droppedoffOrders: droppedOff.data});
                        reqPickedupOrders()
                            .then((pickedUp)=>{
                                this.setState({pickedupOrders: pickedUp.data});
                                reqPaidOrders()
                                    .then((paid)=>{
                                        this.setState({paidOrders: paid.data});
                                    })
                            })
                            .finally(()=>{
                                this.setState({isLoading: false});
                            })
                    })
            })
    }
    render() {
        const user = storageUtils.getUser();
        if (!user || !user.username) {
            return <Redirect to='/login' />;
        }
        console.log(this.state.paymentData);
        const Item = Form.Item;
        return (
            <React.Fragment>
                <Header hidden={false} history={this.props.history}/>
                <Row span={24}>
                    <Col span={6}>
                    </Col>
                    <Col span={12}>
                        <Row style={{marginTop: 16}}>
                            <h1 style={{fontSize: 64}}>
                                Orders
                            </h1>                            
                        </Row>
                        <Spin spinning={this.state.isLoading}>
                            <Row>
                                <Tabs defaultActiveKey="1" onChange={()=>{}} size="large">
                                    <TabPane tab="Reserved" key="1">
                                        {this.getOrderEntries(this.state.reservedOrders, false)}
                                    </TabPane>
                                    <TabPane tab="Ongoing Orders" key="2">
                                        {this.getOrderEntries(this.state.pickedupOrders, false)}
                                    </TabPane>
                                    <TabPane tab="Dropped-off Orders" key="3">
                                        {this.getOrderEntries(this.state.droppedoffOrders, true)}
                                    </TabPane>
                                    <TabPane tab="Completed Orders" key="4">
                                        {this.getOrderEntries(this.state.paidOrders, false)}
                                    </TabPane>
                                </Tabs>
                            </Row>
                        </Spin>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
                <Modal
                        title="Make a payment"
                        visible={this.state.isPaymentWindowOpen}
                        onOk={()=>{this.handlePaymentSubmit();}}
                        onCancel={()=>{this.handlePaymentWindow(false)}}
                    >
                        <Row>
                            <p >
                                {"Confirm the following information regarding this payment:"}
                            </p>
                        </Row>
                        <Row>
                            {this.state.paymentData != null && (<p style={{fontWeight: 700, fontSize: 14}}>
                                {"Trip: "}
                            </p>)}
                        </Row>
                        <Row>
                            {this.state.paymentData != null && (<p>{this.state.paymentData.pickUpLocation.street + ', ' + this.state.paymentData.pickUpLocation.city + ' -> ' + this.state.paymentData.dropOffLocation.street + ', ' + this.state.paymentData.dropOffLocation.city}</p>)}
                        </Row>
                        <Row>
                            <p style={{fontWeight: 700, fontSize: 14}}>
                                Amount due: 
                            </p>
                        </Row>
                        <Row>
                            {this.state.paymentData != null && (<p>{'$' + this.state.paymentData.invoice.amount}</p>)}
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <p>Enter your card number:</p>
                        </Row>
                        <Row>
                            <InputNumber style={{width: '100%'}}controls={false} onChange={(value)=>{this.setState({cardNumber: value})}}/>
                        </Row>


                    </Modal>
            </React.Fragment>

        );
    }
}

export default withRouter(History);