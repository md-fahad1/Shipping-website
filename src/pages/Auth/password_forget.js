import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Label, Input } from "reactstrap";

const PasswordForget = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newFormErrors = { ...formErrors };
    if (formData.email.trim() === "") {
      newFormErrors.email = "Email is required";
      isValid = false;
    }
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/password_reset_request",
        {
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormSubmitted(true);
      setFormData({ email: "" }); // Clear the input field
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
     
      <section className="vh-100">
        <div className="flex items-center justify-center h-full">
          <div className="max-w-lg w-full">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="text-center mt-3">
                <h3 className="font-bold">
                  <Link to="/" className="text-dark uppercase">
                   Shob Artist
                  </Link>
                </h3>
                <p className="text-muted">Reset Password</p>
              </div>
              <div className="p-4">
                {formSubmitted ? (
                  <div className="alert alert-success text-center" role="alert">
                    Password reset email sent successfully.
                  </div>
                ) : (
                  <div className="alert alert-warning text-center" role="alert">
                    Enter your email address and we'll send you an email with
                    instructions to reset your password.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Reset your Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PasswordForget;
