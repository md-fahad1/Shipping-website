import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

class FooterLinks extends Component {
  state = {
    socials: [
      { icon: FaFacebook, link: "https://www.facebook.com/shobartist" },
      { icon: FaYoutube, link: "https://www.youtube.com/channel/UCvAmb-98CKbYUEKgWWNFH9Q" },
      { icon: FaTiktok, link: "https://www.tiktok.com/@shob_artist" },
      { icon: FaInstagram, link: "https://www.instagram.com/shob_artist/" },
      { icon: RiMessage2Fill, link: "https://www.threads.net/@shob_artist" },
    ],
  };
  render() {
    return (
      <React.Fragment>
        <div className="footer-alt">
          <Container>
            <Row>
              <Col lg="12">
                <div className="float-sm-start pull-none">
                  <p className="copy-rights  mb-3 mb-sm-0">
                    2024 © Shob Artist 
                  </p>
                </div>
                <div className="float-sm-end pull-none copyright ">
                  <ul className="list-inline d-flex flex-wrap social m-0">
                    {this.state.socials.map((social, key) => (
                      <li className="list-inline-item" key={key}>
                        <a href={social.link} target="_blank" rel="noopener noreferrer" className="social-icon justify-center">
                          <social.icon className="mt-2 ml-2 hover:text-green-600"/>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div className="clearfix"></div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default FooterLinks;
