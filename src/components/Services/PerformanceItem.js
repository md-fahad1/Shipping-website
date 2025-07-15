import React, { Component } from "react";
import { Col } from "reactstrap";

class PerformanceItem extends Component {
    render() {
        return (
            <React.Fragment>
                <Col lg="4">
                    <div className="testimonial-box mt-4">
                        <div className="performance-decs p-4">
                            <img src={this.props.item.image} alt="" className="img-fluid mx-auto d-block mb-4" />
                            <div className="p-1">
                                <h5 className="text-center text-uppercase font-weight-bold mb-1 text-primary">{this.props.item.cmpName}</h5>
                                <h5 className="text-center font-weight-bold mb-3">{this.props.item.name}</h5>
                                <p className="text-center mb-0">{this.props.item.message}</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </React.Fragment>
        );
    }
}

export default PerformanceItem;
