import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "reactstrap";
import AccountHomeButton from "./account-home-button";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "fahad",
    password: "1111",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newFormErrors = { username: "", password: "" };

    if (formData.username.trim() === "") {
      newFormErrors.username = "Username is required";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newFormErrors.password = "Password is required";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }

    // ✅ Go directly to dashboard — no backend involved
    navigate("/Dashboard");
  };

  return (
    <React.Fragment>
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
                        <p className="text-muted">
                          Sign in to continue to Shob Artist.
                        </p>
                      </div>
                      <div className="p-4">
                        <Form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Enter username"
                              value={formData.username}
                              onChange={handleChange}
                              className={`form-control ${
                                formErrors.username
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.username && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.username}
                              </p>
                            )}
                          </div>

                          <div className="form-group mt-3">
                            <Label for="userpassword">Password</Label>
                            <Input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleChange}
                              className={`form-control ${
                                formErrors.password
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {formErrors.password && (
                              <p className="text-red-500 text-sm mt-1">
                                {formErrors.password}
                              </p>
                            )}
                          </div>

                          <div className="d-grid mt-3">
                            <Button type="submit" className="btn btn-primary">
                              Log In
                            </Button>
                          </div>

                          <div className="mt-4 mb-0 text-center">
                            <Link to="/password_forget" className="text-dark">
                              <i className="mdi mdi-lock"></i> Forgot your
                              password?
                            </Link>
                          </div>
                          <div className="mt-4 mb-0 text-center">
                            <p className="mb-0">
                              Don't have an account?{" "}
                              <Link to="/signup" className="text-danger">
                                Sign up
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

export default Login;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   Label,
//   Input,
//   Form,
//   FormFeedback,
// } from "reactstrap";
// import AccountHomeButton from "./account-home-button";

// const Login = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();

//   const { login } = auth || {};
//   const [usernameError, setusernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [generalError, setGeneralError] = useState("");

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setFormErrors({
//       ...formErrors,
//       [e.target.name]: "", // Clear any previous errors when the user starts typing
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform form validation
//     let isValid = true;
//     const newFormErrors = { ...formErrors };

//     if (formData.username.trim() === "") {
//       newFormErrors.username = "Username is required";
//       isValid = false;
//     }

//     if (formData.password.trim() === "") {
//       newFormErrors.password = "Password is required";
//       isValid = false;
//     }

//     if (!isValid) {
//       setFormErrors(newFormErrors);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         process.env.REACT_APP_BASE_URL + "/api/token",
//         {
//           username: formData.username,
//           password: formData.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data.error === "PasswordMismatchError") {
//         setPasswordError("Incorrect password. Please try again.");
//         setusernameError("");
//       } else if (response.data.error === "UsernameMismatchError") {
//         setusernameError(
//           "Username and password do not match. Please try again."
//         );
//         setPasswordError("");
//       } else {
//         auth.login(
//           response.data.access,
//           response.data.refresh,
//           formData.username
//         );
//         Cookies.set("username", formData.username, {
//           expires: 1 / 24,
//         });

//         Cookies.set("accessToken", response.data.access, {
//           expires: 1 / (24 * 60),
//         });

//         Cookies.set("refreshToken", response.data.refresh, {
//           expires: 1 / 24,
//         });

//         let accessToken = response.data.access;

//         const logActivity = async () => {
//           await axios.post(
//             process.env.REACT_APP_BASE_URL + "/api/activity_log",
//             {
//               message: "Login Activity",
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//         };

//         const isAdmin = async () => {
//           const adminResponse = await axios.get(
//             process.env.REACT_APP_BASE_URL + "/api/is_staff",
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//           return adminResponse.data.status === true;
//         };

//         if (await isAdmin()) {
//           await logActivity();
//           navigate("/admin/allOrder");
//         } else {
//           await logActivity();
//           navigate("/Dashboard");
//         }
//       }
//     } catch (error) {
//       setGeneralError("Username and password do not match. Please try again.");
//     }
//   };

//   return (
//     <React.Fragment>
//       {/* render home button */}
//       <AccountHomeButton />

//       <section className="vh-100">
//         <div className="display-table">
//           <div className="display-table-cell">
//             <Container>
//               <Row className="justify-content-center">
//                 <Col lg="5">
//                   <Card className="account-card">
//                     <CardBody>
//                       <div className="text-center mt-3">
//                         <h3 className="font-weight-bold">
//                           <Link
//                             to="/"
//                             className="text-dark text-uppercase account-pages-logo"
//                           >
//                             Shob Artist
//                           </Link>
//                         </h3>
//                         <p className="text-muted">
//                           Sign in to continue to Shob Artist.
//                         </p>
//                       </div>
//                       <div className="p-4">
//                         <Form onSubmit={handleSubmit}>
//                           <div className="form-group">
//                             <Label for="username">Username</Label>
//                             <Input
//                               type="text"
//                               id="username"
//                               name="username"
//                               placeholder="Enter username"
//                               value={formData.username}
//                               onChange={handleChange}
//                               className={`form-control ${
//                                 formErrors.username
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               }`}
//                             />
//                             {formErrors.username && (
//                               <p className="text-red-500 text-sm mt-1">
//                                 {formErrors.username}
//                               </p>
//                             )}
//                           </div>

//                           <div className="form-group mt-3">
//                             <Label for="userpassword">Password</Label>
//                             <Input
//                               type="password"
//                               id="password"
//                               name="password"
//                               placeholder="Password"
//                               value={formData.password}
//                               onChange={handleChange}
//                               className={`form-control ${
//                                 formErrors.password
//                                   ? "border-red-500"
//                                   : "border-gray-300"
//                               }`}
//                             />

//                             {formErrors.password && (
//                               <p className="text-red-500 text-sm mt-1">
//                                 {formErrors.password}
//                               </p>
//                             )}
//                             {usernameError && (
//                               <p className="text-red-500 text-sm mt-1">
//                                 {usernameError}
//                               </p>
//                             )}
//                             {passwordError && (
//                               <p className="text-red-500 text-sm mt-1">
//                                 {passwordError}
//                               </p>
//                             )}
//                             {generalError && (
//                               <p className="text-red-500 text-sm mt-1">
//                                 {generalError}
//                               </p>
//                             )}
//                           </div>

//                           <div className="d-grid mt-3">
//                             <Button type="submit" className="btn btn-primary">
//                               Log In
//                             </Button>
//                           </div>

//                           <div className="mt-4 mb-0 text-center">
//                             <Link to="/password_forget" className="text-dark">
//                               <i className="mdi mdi-lock"></i> Forgot your
//                               password?
//                             </Link>
//                           </div>
//                           <div className="mt-4 mb-0 text-center">
//                             <p className="mb-0">
//                               Don't have an account?{" "}
//                               <Link to="/signup" className="text-danger">
//                                 Sign up
//                               </Link>
//                             </p>
//                           </div>
//                         </Form>
//                       </div>
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             </Container>
//           </div>
//         </div>
//       </section>
//     </React.Fragment>
//   );
// };
// export default Login;
