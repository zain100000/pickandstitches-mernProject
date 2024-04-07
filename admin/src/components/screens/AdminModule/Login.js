import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import "../AdminModule/components/css/Login.css";
import axios from "axios";
import ReactDOM from "react-dom";
import Loader from "../../otherComponents/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CustomLoginAlert = ({ message, onClose }) => {
    const handleLoginClick = () => {
      onClose();
    };

    return (
      <div className="custom-alert-container">
        <div className="alert-content">
          <p>{message}</p>
          <button onClick={handleLoginClick} className="alertBtn">
            OK
          </button>
        </div>
      </div>
    );
  };

  const handleLoginAlertClose = () => {
    setShowAlert(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const loginData = {
        email,
        password,
      };

      const LoginApiUrl = "https://pickandstitches-deployment-server.onrender.com/api/admin/login";
      const response = await axios.post(LoginApiUrl, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Login Successful!");
        setShowAlert(true);
        window.location.href = "/admin/dashboard";
      } else {
        setAlertMessage("Error Logging Up!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Invalid Login Credentials!");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Admin">
      <div className="container mt-5 m-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>Admin Signin</h1>
          </div>
        </div>
        <div className="tab-content">
          {loading ? (
            <Loader />
          ) : (
            <section style={{ marginTop: 30, padding: 30 }}>
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src={Logo} className="img-fluid" alt="Logo" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-md"
                        placeholder="Enter Valid Email!"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete={false}
                      />
                    </div>
                    <div className="form-outline mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-md"
                        placeholder="Password Length Must Be 6!"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete={false}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to="/admin/reset-password"
                        className="text-body text-decoration-none"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="button"
                        className="loginBtn"
                        style={{ paddingLeft: 20, paddingRight: 20 }}
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
        </div>
        {showAlert &&
          ReactDOM.createPortal(
            <CustomLoginAlert
              message={alertMessage}
              onClose={handleLoginAlertClose}
            />,
            document.body
          )}
      </div>
    </section>
  );
};

export default Login;
