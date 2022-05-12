import React, { Component } from 'react';
import { Row, Col, Card, AutoComplete} from 'antd';

class ResultCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {carInfo} = this.props;
        let image;
        try { 
            image = require('../../../assets/thumbnails/' + this.props.carInfo.model + '.jpg');

        } catch(ex) {
            image = require('../../../assets/thumbnails/placeholder.jpg');
        }
        return (
            <React.Fragment>
                <div
                    style={{
                        width: 400,
                        zIndex: 1,
                        boxShadow: '0 2px 9px -3px rgb(0 0 0 / 12%)',
                    }}
                    onClick={() => {
                        this.props.handleSelectedCarInfoChange(carInfo);
                        this.props.handleConfirmationPopup(true);
                    }}
                >  
                    <Row span={24}>
                        <Col 
                            style={{
                                zIndex: 1,
                                boxShadow: '0 2px 9px -3px rgb(0 0 0 / 12%)',
                            }}
                            span={24}>
                            <img 
                                src={image} 
                                style={{width: 400, height: 225}}></img>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={24} 
                            style={{
                                borderBottom: '0.5px solid',
                                borderImage: "linear-gradient(to right,white, black, white) 4",
                                paddingBottom: 15
                            }}
                        >
                            <Row>
                                <p style={{
                                    fontFamily: 'sans-serif',
                                    fontWeight: 700,
                                    fontSize: 21,
                                    marginLeft: 15,
                                    marginTop: 15,
                                    marginBottom: 15,
                                }}>
                                    {carInfo.make + " " + carInfo.model + " " + carInfo.year}
                                </p>
                            </Row>
                            <Row 
                                style={{
                                    marginTop: -15,
                                    marginLeft: 15,
                                    
                                }}>
                                {carInfo.location}
                            </Row>
                        </Col>
                    </Row>
                    <Row 
                        style={{
                            marginTop: 15
                        }}
                    >
                        <p style={{
                            fontWeight: 700,
                            marginLeft: 'auto',
                            marginRight: '10px',
                            marginBottom: '30px'
                        }}>
                            {'$' + carInfo.dailyRate + '/day'}
                        </p>
                        
                    </Row>
                    <Row>

                    </Row>


                </div>

                        
            </React.Fragment>

        );
    }
    


} export default ResultCard;