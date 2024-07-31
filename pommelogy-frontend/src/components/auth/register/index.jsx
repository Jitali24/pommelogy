import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import "./SignUp.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userLoggedIn } = useAuth();

  const togglePasswordVisibility1 = () => setShowPassword1(!showPassword1);
  const togglePasswordVisibility2 = () => setShowPassword2(!showPassword2);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFieldErrors({ ...fieldErrors, [id]: "" }); // Reset field error on change
    switch (id) {
      case "first-name":
        setFirstName(value);
        break;
      case "last-name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirm-password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "first-name":
        if (!value) error = "First name is required";
        break;
      case "last-name":
        if (!value) error = "Last name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        break;
      case "confirm-password":
        if (value !== password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    setFieldErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  const validateFields = () => {
    const errors = {};
    if (!firstName) errors["first-name"] = "First name is required";
    if (!lastName) errors["last-name"] = "Last name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors["confirm-password"] = "Passwords do not match";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setErrorMessage("Please fix the errors above");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setErrorMessage(
          "A verification email has been sent to your email address. Please verify your email before logging in."
        );
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="signup-container">
        <form className="signup-form" onSubmit={onSubmit}>
          <h5>Create a New Account</h5>
          <br />
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First name"
              value={firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              title="First name is required"
            />
            {fieldErrors["first-name"] && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {fieldErrors["first-name"]}
              </div>
            )}
          </div>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last name"
              value={lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              title="Last name is required"
            />
            {fieldErrors["last-name"] && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {fieldErrors["last-name"]}
              </div>
            )}
          </div>
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="email"
              title="Please enter a valid email address"
            />
            {fieldErrors.email && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {fieldErrors.email}
              </div>
            )}
          </div>
          <div className="form-input">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword1 ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                title="Password must be at least 6 characters long"
              />
              {showPassword1 ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={togglePasswordVisibility1}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={togglePasswordVisibility1}
                />
              )}
              {fieldErrors.password && (
                <div className="error-message">
                  <FaExclamationCircle className="error-icon" />
                  {fieldErrors.password}
                </div>
              )}
            </div>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type={showPassword2 ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoComplete="off"
                title="Must match the password entered above"
              />
              {showPassword2 ? (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={togglePasswordVisibility2}
                />
              ) : (
                <FaEye
                  className="eye-icon"
                  onClick={togglePasswordVisibility2}
                />
              )}
              {fieldErrors["confirm-password"] && (
                <div className="error-message">
                  <FaExclamationCircle className="error-icon" />
                  {fieldErrors["confirm-password"]}
                </div>
              )}
            </div>
          </div>
          {errorMessage && (
            <div className="error-message">
              <FaExclamationCircle className="error-icon" />
              {errorMessage}
            </div>
          )}
          {/* <button
            type="submit"
            disabled={isRegistering}
            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
              isRegistering
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
            }`}
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button> */}
          <button
            type="submit"
            disabled={isRegistering}
            className={isRegistering ? "disabled-button" : ""}
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button>
          <br />
          <h6>
            Already have an Account?&nbsp;
            <Link to="/login">Login</Link>
          </h6>
        </form>
      </div>
    </>
  );
};

export default SignUp;
