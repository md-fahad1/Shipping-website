import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import OverlayNavbar from '../OverlayNavbar';
import verifyToken from '../verifyToken';
import { useAuth } from '../AuthContext';
import Cookies from "js-cookie";

const ContactUs = () => {
  let username = Cookies.get('username',null)

  const [formData, setFormData] = useState({
    
    name: '',
    email: '',
    phone: '',
    subject: '',
    image:null,
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    email: "",
    password: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [imageFile4, setImageFile4] = useState(null);


  const handleImageChange4 = (e) => {
    const file = e.target.files[0];
    setImageFile4(file);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newFormErrors = { ...formErrors };
    if (formData.name.trim() === "") {
      newFormErrors.name = "Name is required";
      isValid = false;
    } else {
      // Check for minimum/maximum length
      const minFirstNameLength = 3; // Adjust as needed
      const maxFirstNameLength = 50; // Adjust as needed

      if (
        formData.name.trim().length < minFirstNameLength ||
        formData.name.trim().length > maxFirstNameLength
      ) {
        newFormErrors.name = `Name must be between ${minFirstNameLength} and ${maxFirstNameLength} characters`;
        isValid = false;
      }
    }
    if (formData.message.trim() === "") {
      newFormErrors.email = "Message is required";
      isValid = false;
    }
    if (formData.subject.trim() === "") {
      newFormErrors.subject = "Subject is required";
      isValid = false;
    }
    const phoneNumberRegex = /^\d{11}$/;
    const expectedCountryCode = "01";
    const minPhoneNumberLength = 11; // Adjust as needed
    const maxPhoneNumberLength = 15; // Adjust as needed

    if (formData.phone.trim() === "") {
      newFormErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneNumberRegex.test(formData.phone.trim())) {
      newFormErrors.phone = "Invalid phone number format";
      isValid = false;
    } else if (isNaN(formData.phone.trim())) {
      newFormErrors.phone = "Phone number must contain only numbers";
      isValid = false;
    } else if (
      formData.phone.trim().length < minPhoneNumberLength ||
      formData.phone.trim().length > maxPhoneNumberLength
    ) {
      newFormErrors.phone = `Phone number must be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} digits`;
      isValid = false;
    } else if (
      !formData.phone.trim().startsWith(expectedCountryCode)
    ) {
      newFormErrors.phone = `Phone number must start with ${expectedCountryCode}`;
      isValid = false;
    }



    if (formData.email.trim() === "") {
      newFormErrors.email = "Email is required";
      isValid = false;
    } else {
      // Check for a valid email format
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newFormErrors.email = "Invalid email format";
        isValid = false;
      }

      // Check for maximum length
      const maxEmailLength = 25; // Adjust as needed
      if (formData.email.trim().length > maxEmailLength) {
        newFormErrors.email = `Email must be ${maxEmailLength} characters or less`;
        isValid = false;
      }

      // Check for a specific domain
      // const allowedDomain = "gmail.com"; // Adjust as needed
      // if (!formData.email.trim().endsWith(`@${allowedDomain}`)) {
      //   newFormErrors.email = `Email must be from the domain ${allowedDomain}`;
      //   isValid = false;
      // }

      
      // const blacklistedDomains = ["example.net", "example.org"]; // Adjust as needed
      // if (blacklistedDomains.includes(formData.email.trim().split("@")[1])) {
      //   newFormErrors.email = "Email from this domain is not allowed";
      //   isValid = false;
      // }

     
    }
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }
  
    const accessToken = await verifyToken();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("user", username);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("image", imageFile4);
    formDataObj.append("message", formData.message);
  
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/contact_messages",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
   
  
      setShowToast(true);
  
      // Clear form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        image: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  

  return (
    <div>
      <OverlayNavbar />
      <Container className="py-3 bg-[#F9F9F9]">
        <Row className='ml-20'>
          <Col md={4} className="mb-4 ml-12 text-lg">
            <div className="office-address">
              <h2 className="mb-4 text-[#2FB261]">Visit Us</h2>
              <p>House: 1008/3 East Shewrapara,</p>
              <p>Mirpur, 1216</p>
              <p>Dhaka, Bangladesh</p>
            </div>
            <div className="contact-info mt-4">
              <h4 className=' text-[#2FB261] mb-3'>Contact Information</h4>
              <p>Email: shobartist@gmail.com</p>
              <p>Phone: +88 01730271003</p>
            </div>
            <div className="social-icons mt-4">
              <h4>Connect with Us</h4>
              <div className="icon-col flex gap-4 mt-2 text-2xl">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-[#2FB261]"
                >
                  <FaFacebook className="facebook-icon" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-[#2FB261]"
                >
                  <FaTwitter className="twitter-icon" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaLinkedin className="linkedin-icon text-[#2FB261]" />
                </a>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <h2 className="text-center text-xl mb-2 text-[#2FB261]">Share Your Experience</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      
                    />
                     {formErrors.name && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.name}
                              </p>
                            )}
                          
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      
                    />
                    {formErrors.email && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.email}
                              </p>
                            )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.phone}
                              </p>
                            )}
                    
                  </Form.Group>
                </Col>
                <Col lg={6}>
              <Form.Group controlId="formImage">
                <Form.Label>
                  Add Image :{" "}
                 
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange4}
                  className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                />
              </Form.Group>
            </Col>
            
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Enter the subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                     {formErrors.subject && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.subject}
                              </p>
                            )}
                    
                  </Form.Group>
                </Col>
                </Row>
              <Form.Group controlId="formMessage">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleChange}
                  
                />
                {formErrors.message && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.message}
                              </p>
                            )}
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Send Message
              </Button>
            </Form>
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              delay={3000}
              autohide
              className="mt-3"
            >
              <Toast.Header>
                <strong className="mr-auto">Message Sent!</strong>
              </Toast.Header>
              <Toast.Body>Your message has been successfully submitted.</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
