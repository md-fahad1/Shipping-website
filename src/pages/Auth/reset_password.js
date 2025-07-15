import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Label, Input } from "reactstrap";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [formData, setFormData] = useState({
    new_password: "",
  });
  const [formErrors, setFormErrors] = useState({
    new_password: "",
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
    if (formData.new_password.trim() === "") {
      newFormErrors.new_password = "Password is required";
      isValid = false;
    } else if (formData.new_password.length < 6) {
      newFormErrors.new_password = "Password must be at least 6 characters long";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.new_password)) {
      newFormErrors.new_password =
        "Password must contain at least one uppercase letter";
      isValid = false;
    }
    if (!isValid) {
      setFormErrors(newFormErrors);
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/reset_password",
        {
          token: token,
          password: formData.new_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormSubmitted(true);
      setFormData({ new_password: "" }); // Clear the input field
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
                <p className="text-muted">New Password</p>
              </div>
              <div className="p-4">
                <div className="alert alert-warning text-center" role="alert">
                  
                  <br />
                  Enter your strong new password.
                </div>
                {formSubmitted ? (
                  <div className="alert alert-success text-center" role="alert">
                    Password updated successfully.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <Label for="new_password">New Password</Label>
                      <Input
                        type="password"
                        id="new_password"
                        name="new_password"
                        placeholder="Enter new password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className={`form-control ${
                          formErrors.new_password ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {formErrors.new_password && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.new_password}
                        </p>
                      )}
                    </div>
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
