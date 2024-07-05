import React, { useState } from "react";
import Axios from "axios";
import Hasher from "../../passwordutils/hasher";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    dob: "",
    mobile: "",
    reEnterPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.reEnterPassword) {
      newErrors.reEnterPassword = "Passwords do not match";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      Hasher(formData.password)
        .then((hashedPassword) => {
          console.log("Hashed Password:", hashedPassword);
          const data = {
            name: formData.username,
            email: formData.email,
            password: hashedPassword,
            mobile: formData.mobile,
            dob: formData.dob,
          };

          Axios.post(
            "https://movie-ticket-booking-pzhg.onrender.com/users/register/",
            data
          )
            .then((res) => {
              if (res.status === 200) {
                alert("Record added successfully");
              } else {
                Promise.reject();
              }
            })
            .catch((err) => alert(err));
          event.target.reset();
        })
        .catch((error) => {
          console.error("Error hashing password:", error);
        });
    } else {
      console.log("Form contains validation errors.");
    }
  };

  return (
    <div className="signup-modal">
      <h2 className="text-center mb-4">Sign Up</h2>
      <center>
        <form onSubmit={handleSignUp}>
          <div className="mb-3 col-8">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3 col-8">
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div>
          <div className="mb-3 col-8">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div className="mb-3 col-8">
            <input
              type="password"
              id="reEnterPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={formData.reEnterPassword}
              onChange={handleInputChange}
            />
            {errors.reEnterPassword && (
              <div className="text-danger">{errors.reEnterPassword}</div>
            )}
          </div>
          <div className="mb-3 col-8">
            <input
              type="date"
              id="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleInputChange}
            />
            {errors.dob && <div className="text-danger">{errors.dob}</div>}
          </div>
          <div className="mb-3 col-8">
            <input
              type="text"
              id="mobile"
              className="form-control"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            {errors.mobile && (
              <div className="text-danger">{errors.mobile}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary d-flex justify-content-center"
            style={{ margin: "0px auto" }}
          >
            Sign Up
          </button>
        </form>
      </center>
    </div>
  );
};

export default SignUp;
