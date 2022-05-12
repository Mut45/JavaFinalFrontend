import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ResultCard from './result-card/result-card';
class SearchResult extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const results = this.props.availableVehicles;
        const getColContent = (row) => {
            const children = [];
            const index = row * 3; 
            const endIndex = index + 3 < results.length ? index + 3 : results.length;
            for (let i = index; i < endIndex; i++) {
                const carInfo = {
                    id: results[i].id,
                    make: results[i].make,
                    model: results[i].model,
                    year: new Date(results[i].year).getFullYear(),
                    dailyRate: results[i].vehicleCategory.dailyRate,
                    location: results[i].location.street + ', ' + results[i].location.city
                };
                if (i % 3 == 0) {
                    children.push(
                        <React.Fragment>
                            <Col span={3}></Col>
                            <Col span={6}>
                                <ResultCard 
                                    carInfo={carInfo} 
                                    handleConfirmationPopup={this.props.handleConfirmationPopup}
                                    handleSelectedCarInfoChange={this.props.handleSelectedCarInfoChange}
                                />
                            </Col>
                        </React.Fragment>
                    )
                } else if (i % 3 == 2) {
                    children.push(
                    <React.Fragment>
                        <Col span={6}>
                            <ResultCard 
                                    carInfo={carInfo} 
                                    handleConfirmationPopup={this.props.handleConfirmationPopup}
                                    handleSelectedCarInfoChange={this.props.handleSelectedCarInfoChange}
                            />
                        </Col>
                        <Col span={3}></Col>
                    </React.Fragment>
                    )
                } else {
                    children.push(
                        <Col span={6}>
                            <ResultCard 
                                carInfo={carInfo} 
                                handleConfirmationPopup={this.props.handleConfirmationPopup}
                                handleSelectedCarInfoChange={this.props.handleSelectedCarInfoChange}
                            />
                        </Col>
                    )

                }
            }
            return children;
        }
        const getResultCards = () => {
            const count = results.length;
            const children = [];
            for (let i = 0; i < count / 3; i++) {
                children.push(
                    <Row style={{ marginBottom: 30}} span={24}>
                        {getColContent(i)}
                    </Row>
                )
            }
            return children;
        }

        return (
            <React.Fragment>
                {getResultCards()}
            </React.Fragment>

        );
    }
    


} export default SearchResult;