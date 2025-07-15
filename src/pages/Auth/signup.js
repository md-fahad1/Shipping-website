import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  FormFeedback,
} from "reactstrap";

// Import Home Button
import AccountHomeButton from "./account-home-button";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    

    let isValid = true;
    const newFormErrors = { ...formErrors };
    if (formData.firstname.trim() === "") {
      newFormErrors.firstname = "Username is required";
      isValid = false;
    } else {
      // Check for minimum/maximum length
      const minFirstNameLength = 4; // Adjust as needed
      const maxFirstNameLength = 50; // Adjust as needed

      if (
        formData.firstname.trim().length < minFirstNameLength ||
        formData.firstname.trim().length > maxFirstNameLength
      ) {
        newFormErrors.firstname = `Username must be between ${minFirstNameLength} and ${maxFirstNameLength} characters`;
        isValid = false;
      }
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
    } else if (!formData.phone.trim().startsWith(expectedCountryCode)) {
      newFormErrors.phone = `Phone number must start with ${expectedCountryCode}`;
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newFormErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newFormErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newFormErrors.password =
        "Password must contain at least one uppercase letter";
      isValid = false;
    }

    if (formData.confirmPassword.trim() === "") {
      newFormErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newFormErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }


    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }

    // if (Object.keys(formErrors).length > 0) {
    //   setErrors(formErrors);
    //   return;
    // }

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/signup",
        {
          username: formData.firstname,
          email: formData.email,
          password: formData.password,
          phone_number: formData.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        navigate("/Login");
      } else {
        setFormData({
          firstname: "",
          email: "",
          phone_number: "",
          password: "",
        });
        navigate("/Login");
      }
    } catch (error) {
      console.error("Failed:", error);

      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      } else if (error.request) {
        console.log("Error Request:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  };

  const toggleTheme = () => {
    if (document.body.getAttribute("data-bs-theme") === "light") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.setAttribute("data-bs-theme", "light");
    }
  };

  useEffect(() => {
    document.body.classList.add("bg-account-pages");
    document.body.classList.add("py-4");
    document.body.classList.add("py-sm-0");
    document
      .getElementById("colorTheme")
      .setAttribute("href", "assets/colors/red.css");

    // Define the cleanup function to remove the added classes
    return () => {
      document.body.classList.remove("bg-account-pages");
      document.body.classList.remove("py-4");
      document.body.classList.remove("py-sm-0");
      document
        .getElementById("colorTheme")
        .setAttribute("href", "assets/colors/cyan.css");
    };
  }, []);

  return (
    <React.Fragment>
      {/* Render home button */}
      <AccountHomeButton />

      

      <section className="vh-100">
        <div className="display-table">
          <div className="display-table-cell">
            <Container>
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="account-card">
                    <CardBody>
                      <div className="text-center mt-3">
                        <h3 className="font-weight-bold">
                          <Link
                            to="/"
                            className="text-dark text-uppercase account-pages-logo"
                          >
                            Shob Artist
                          </Link>
                        </h3>
                        <p className="text-muted">Sign up for a new Account</p>
                      </div>
                      <div className="p-4">
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label for="firstname">Username</Label>
                            <Input
                              name="firstname"
                              className="form-control mb-2"
                              placeholder="Username"
                              type="text"
                              value={formData.firstname}
                              onChange={handleChange}
                              invalid={errors.firstname ? true : false}
                            />
                            {formErrors.firstname && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.firstname}
                              </p>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                              name="email"
                              className="form-control mb-2"
                              placeholder="Enter Email"
                              type="text"
                              value={formData.email}
                              onChange={handleChange}
                              invalid={errors.email ? true : false}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.email}
                              </p>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label for="email">Phone</Label>
                            <Input
                              name="phone"
                              className="form-control mb-2"
                              placeholder="Enter phone number"
                              type="text"
                              value={formData.phone}
                              onChange={handleChange}
                              invalid={errors.phone ? true : false}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.phone}
                              </p>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                              name="password"
                              className="form-control mb-2"
                              placeholder="Enter password"
                              type="password"
                              value={formData.password}
                              onChange={handleChange}
                              invalid={errors.password ? true : false}
                            />
                            {/* <FormFeedback>{errors.password}</FormFeedback> */}
                            {formErrors.password && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.password}
                              </p>
                            )}
                          </FormGroup>
                          <FormGroup>
                            <Label for="password">Confirm Password</Label>
                            <Input
                              name="confirmPassword"
                              className="form-control mb-2"
                              placeholder="Enter password"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              invalid={errors.confirmPassword ? true : false}
                            />
                            {/* <FormFeedback>{errors.password}</FormFeedback> */}
                            {formErrors.confirmPassword && (
                              <p className="text-red-500 text-xs mt-1">
                                {formErrors.confirmPassword}
                              </p>
                            )}
                          </FormGroup>

                          {/* <div className="custom-control custom-checkbox mt-3">
                            <Input
                              type="checkbox"
                              className="custom-control-input"
                              id="customControlInline"
                            />
                            <Label
                              className="custom-control-label"
                              for="customControlInline"
                            >
                              Remember me
                            </Label>
                          </div> */}

                          <div className="d-grid mt-3">
                            <Button type="submit" className="btn btn-primary">
                              Sign up
                            </Button>
                          </div>

                          <div className="mt-4 mb-0 text-center">
                            <p className="mb-0">
                              Already have an account?{" "}
                              <Link to="/login" className="text-danger">
                                Login
                              </Link>
                            </p>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;
