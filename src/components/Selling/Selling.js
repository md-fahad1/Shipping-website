import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

import HomeUrl from "../../assets/images/home-border.png";
import Feature from "../../assets/images/features/img-3.png";
import hero from "../../assets/images/selling.svg";

export default class Selling extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="section" id="contact">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="title-box text-center">
                                    <h3 className="title-heading mt-4">Let's talk about everything!</h3>
                                    
                                    {/* <img src={HomeUrl} height="15" className="mt-3" alt="" /> */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-5 mx-4 selling-section rounded-4 align-items-end">
                            <Col lg={6} className="pe-0 ps-0 selling-img">
                                <div className="home-img text-center bg-light rounded-4 box-shadow">
                                    <div className="animation-2"></div>
                                    <div className="animation-3"></div>
                                    {/* <img src={Feature} className="img-fluid" alt="" /> */}
                                    <img src={hero} alt="" className="img-fluid d-block mx-auto" />
                                </div>
                            </Col>
                            <Col lg={6} className="p-md-5 p-3">
                                <div className="p-md-4 p-2">
                                    <div className="text-white mb-4">
                                        <h2>Make Money, Risk-Free</h2>
                                        
                                    </div>
                                    <div className="text-white sell-data p-5 rounded-4">
                                        <Row className="fw-bold mb-3">
                                            <Col sm={8} className="pe-md-2 pe-1">
                                                You sell a t-shirt
                                            </Col>
                                            <Col sm={4} className="ps-md-2 ps-1 text-end">
                                                 580 Tk
                                            </Col>
                                        </Row>
                                        <Row className="fw-bold mb-3">
                                            <Col sm={8} className="pe-md-2 pe-1">
                                                You pay for its production
                                            </Col>
                                            <Col sm={4} className="ps-md-2 ps-1 text-end">
                                                 380 Tk
                                            </Col>
                                        </Row>
                                        <div className="selling-border mt-3"></div>
                                        <Row className="fw-bold mt-3 text-primary" style={{ fontSize: "22px", fontWeight: "bold!important" }}>
                                            <Col sm={8} className="pe-2">
                                                Your profit
                                            </Col>
                                            <Col sm={4} className="ps-2 text-end">
                                                 200 Tk
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="text=white">
                                        <div className="mt-md-5 mt-3">
                                            <Link to="/login" className="btn btn-primary">
                                                Explore More
                                            </Link>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
