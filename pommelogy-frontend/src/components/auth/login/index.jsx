import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import "./Login.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/home");
      } catch (error) {
        if (error.message === "Email not verified") {
          setErrorMessage("Please verify your email before logging in.");
        } else {
          setErrorMessage("Invalid email or password");
        }
        setIsSigningIn(false);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    } else {
      setPasswordError("Password is required");
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-wrapper" title="Enter a valid email address">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {emailError}
              </div>
            )}
          </div>
          <div
            className="input-wrapper"
            title="Password must be at least 8 characters long, must include characters, numbers and symbols"
          >
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
            )}
            {passwordError && (
              <div className="error-message">
                <FaExclamationCircle className="error-icon" />
                {passwordError}
              </div>
            )}
          </div>
          {errorMessage && (
            <div className="form-error-message">
              <FaExclamationCircle className="error-icon" />
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={isSigningIn}
            className={isSigningIn ? "disabled-button" : ""}
          >
            {isSigningIn ? "Logging in..." : "Login"}
          </button>
          <br />
          <h6>
            Don't have an account?&nbsp;
            <Link to="/register">Signup</Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Login;
