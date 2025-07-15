import React, { Component } from "react";
import { Col } from "reactstrap";

class PerformanceItem extends Component {
    render() {
        const imgStyle = {
            border: "none" // Add inline style to remove border
        };

        return (
            <React.Fragment>
                <Col lg="4">
                    <div className="testimonial-box mt-4">
                        <div className="performance-decs p-4">
                            <img src={this.props.item.image} alt="" className="img-fluid mx-auto d-block img-thumbnail rounded-md mb-4" style={imgStyle} />
                            <div className="p-1">
                                <h5 className="text-center text-uppercase mb-3 font-weight-bold">{this.props.item.name}</h5>
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
