import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Input } from "reactstrap";
import axios from "axios"; // Import axios library
import verifyToken from "../../pages/verifyToken";
import Swal from "sweetalert2";
// Import Footer link
import FooterLinks from "./footer-links";
import Dashborad_FAQs from "../Dashborad_FAQs/Dashborad_FAQs";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const verifyAccessToken = async () => {
      const token = await verifyToken();
      setAccessToken(token); // Set accessToken state
    };

    verifyAccessToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Success!",
      text: "Your email has been submitted ",
      icon: "success",
      confirmButtonColor: "#2FB261", // Green color
      timer: 2000, // Display the success message for 2 seconds
    });

    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/landaing_page_contact",
        formDataObj, // Append formDataObj to the request
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Clear form fields after successful submission
      setFormData({
        email: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" className="mt-4">
              <h4>About Us</h4>
              <div className="text-muted mt-4">
                <p className="text-justify">
                  ShobArtist Is the first ever online POD (Print on Demand)
                  service in Bangladesh. We are specialized in serving orders of
                  any amount from Artist and online businessmen directly to the
                  customers. With our service you can start your own Merchandise
                  or apparel store in just 30 minutes!
                </p>
              </div>
            </Col>
            <Col lg="4" className="mt-4">
              <Dashborad_FAQs />
            </Col>
            <Col lg="4" className="mt-4">
              <h4>Contact Us</h4>
              <div className="text-muted mt-4"></div>
              <div className="text-white">Email : shobartist@gmail.com</div>
              <Form className="form subscribe" onSubmit={handleSubmit}>
                <Input
                  placeholder="Enter your email/phone number"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="submit">
                  <i className="pe-7s-paper-plane"></i>
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </footer>
      <FooterLinks />
    </React.Fragment>
  );
};

export default Footer;
