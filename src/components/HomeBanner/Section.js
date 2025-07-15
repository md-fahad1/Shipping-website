import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Modal Video
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

import HomeUrl from "../../assets/images/home-border.png";
// import Img from "../../assets/images/features/img-2.png";
import Img from "../../assets/images/home-img.svg";

class Section extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    render() {
        return (
            <React.Fragment>
                
                <section className="bg-home bg-light" id="home">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <Container>
                                <Row className="align-items-center">
                                    <Col lg={6}>
                                        <div className="features-box home-content">
                                            {/* <p className="mb-0">Digital Marketing</p>
                                            <img src={HomeUrl} height="15" alt="" /> */}
                                            <h1 className="home-title mt-4">
                                            You Create,  <br /> We Deliver
                                            </h1>
                                            <ul className="list-unstyled mt-4 features-item-list">
                                                <li className="">Ensured Quality</li>
                                                <li className="">Upscalable pricing</li>
                                                <li className="">	Individual Delivery</li>
                                            </ul>

                                            <div className="mt-4 pt-2 d-flex">
                                                
                                                <Link to="howItWorks" className="btn btn-outline-secondary waves-effect waves-light video-play-icon d-flex align-items-center py-2" onClick={this.openModal}>
                                                    <i className="mdi mdi-play-circle-outline text-dark me-1" style={{ fontSize: "20px" }}></i>How It Works
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="home-img py-4 py-md-0">
                                            <div className="animation-1"></div>
                                            <div className="animation-2"></div>
                                            <div className="animation-3"></div>
                                            <img src={Img} className="img-fluid" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <ModalVideo channel="vimeo" isOpen={this.state.isOpen} videoId="99025203" onClose={() => this.setState({ isOpen: false })} />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;
