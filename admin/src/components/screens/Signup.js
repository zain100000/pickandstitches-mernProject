import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import "./css/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../otherComponents/Loader/Loader";
import SuccessModal from "../otherComponents/modals/SuccessModal";
import ErrorModal from "../otherComponents/modals/ErrorModal";

const Signup = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState("");

  const toggleSuccessModal = () => {
    setIsSuccessModalOpen(!isSuccessModalOpen); // Toggle modal visibility
  };

  const toggleErrorModal = (content = "") => {
    setErrorModalContent(content);
    setIsErrorModalOpen(!isErrorModalOpen);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false); // Close error modal
  };

  const handleSignin = () => {
    navigate("/");
  };

  const handleSuccessNavigate = () => {
    navigate("/");
  };

  const isValidInput = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z]).{6,}$/;

    const isEmailValid = emailPattern.test(email);
    const isPasswordValid = passwordPattern.test(password);

    return isEmailValid && isPasswordValid;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const validateEmail = () => {
    if (!email) {
      return "";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };
  const emailError = validateEmail();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const validatePassword = () => {
    if (!password) {
      return "";
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return "Invalid Password Format";
    }
    return "";
  };
  const passwordError = validatePassword();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) {
      toggleErrorModal("Email Required");
      return "";
    }
    if (!password) {
      toggleErrorModal("Password Required");
      return "";
    }
    setLoading(true);
    try {
      const signupFormData = {
        email,
        password,
      };

      const SignupApiUrl = "http://localhost:5000/api/admin/signup";
      const response = await axios.post(SignupApiUrl, signupFormData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toggleSuccessModal(); // Signup successful
      } else {
        toggleErrorModal("Error Signing Up!");
      }
    } catch (error) {
      // Check if the error response indicates that if Admin Already Exists
      if (error.response && error.response.status === 500) {
        toggleErrorModal("Admin Already Exists");
      } else {
        toggleErrorModal("Error During Signing Up!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Signup">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 py-5">
            <h1 className="text-center">Admin Signup</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={Logo} alt="Company Logo" className="logo" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 py-5">
            <form>
              {/* Input fields */}
              <div className="mb-3">
                {/* Email input */}
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {emailError}
                  </span>
                ) : null}
              </div>
              <div className="mb-3">
                {/* Password input */}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {passwordError}
                  </span>
                ) : null}
              </div>
              {/* Loader and Signup button */}
              <div className="px-2">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    onClick={handleSignup}
                    className="signup-btn"
                    disabled={!isValidInput() || loading}
                  >
                    <span className="text-white text-xl">Signup</span>
                  </button>
                )}
              </div>
              {/* Signin section */}
              <div className="extra px-2 d-flex justify-content-around align-items-center">
                <p className="mt-3">Already have an account</p>
                <button
                  type="button"
                  className="signin-btn"
                  onClick={handleSignin}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Success modal */}
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleSuccessNavigate}
        >
          <h2>Signin Successful</h2>
          <button onClick={handleSuccessNavigate} className="modal-btn">
            OK
          </button>
        </SuccessModal>

        {/* Error modal */}
        <ErrorModal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
          <h2>{errorModalContent}</h2>
          <button onClick={handleCloseErrorModal} className="modal-btn">
            OK
          </button>
        </ErrorModal>
      </div>
    </section>
  );
};

export default Signup;
