import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

//import images
import Img1 from "../../assets/images/services/img-1.webp";
import HomeUrl from "../../assets/images/home-border.png";

export default class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <Container>
                        <Row>
                            <div className="testimonial-box mt-4">
                                <div className="performance-decs p-4">
                                    <img src={Img1} alt="" className="img-fluid mx-auto d-block mb-4" />
                                    <div className="p-1">
                                        <h5 className="text-center text-uppercase mb-1 text-primary">CREATE</h5>
                                        <h5 className="text-center mb-3">custom products</h5>
                                        <p className="text-muted text-center mb-0">Easily add your designs to a wide range of products using our free tools</p>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
