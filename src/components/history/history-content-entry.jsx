import React, { Component } from 'react';
import { Row, Col, Button, AutoComplete} from 'antd';

class HistoryContentEntry extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const orderInfos = this.props.entriesData;
        return (
            <React.Fragment>
                <div style={{borderBottom:'0.5px solid black', width: '750px', marginBottom: 16}}>
                <Row span={24}>
                    <Col span={20}>
                        <Row style={{marginBottom: 0, fontSize: 20, fontWeight: 700}}>
                                {orderInfos.vehicle.make + " " + orderInfos.vehicle.model + " " + new Date(orderInfos.vehicle.year).getFullYear()}
                        </Row>
                        <Row>
                            {orderInfos.pickUpLocation.street + ', ' + orderInfos.pickUpLocation.city + ' -> ' + orderInfos.dropOffLocation.street + ', ' + orderInfos.dropOffLocation.city}
                        </Row>
                        <Row style={{marginBottom: 16}}>
                            {orderInfos.pickUpDate}
                        </Row>
                    </Col>
                    <Col span={2}>
                        {this.props.isPaymentPending && (<Row style={{marginTop: 20}}>
                            <Button 
                                onClick={()=>{
                                    this.props.handlePaymentDataChange(orderInfos);
                                    this.props.handlePaymentWindow(true); 
                                }}>
                                Pay Now
                            </Button>
                        </Row>)
                        }
                        
                    </Col>
                </Row>


                </div>
            </React.Fragment>

        );
    }
}

export default HistoryContentEntry;