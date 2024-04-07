import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import ReactDOM from "react-dom";
import Loader from "../../otherComponents/Loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CustomRegisterAlert = ({ message, onClose }) => {
    const handleRegisterClick = () => {
      onClose();
    };

    return (
      <div className="custom-alert-container">
        <div className="alert-content">
          <p>{message}</p>
          <button onClick={handleRegisterClick} className="alertBtn">
            OK
          </button>
        </div>
      </div>
    );
  };

  const handleRegisterAlertClose = () => {
    setShowAlert(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const registerData = {
        email,
        password,
      };

      const RegisterApiUrl =
        "https://pickandstitches-deployment-server.onrender.com/api/admin/signup";
      const response = await axios.post(RegisterApiUrl, registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Admin Successfully Registered!");
        setShowAlert(true);
        window.location.href = "/admin/login";
      } else {
        setAlertMessage("Error Signing Up!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Admin Already Exists Please Login!");
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
            <h1>Admin Signup</h1>
          </div>
        </div>
        <div className="tab-content mt-5">
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
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        onClick={handleRegister}
                        type="button"
                        className="loginBtn"
                        style={{ paddingLeft: 20, paddingRight: 20 }}
                      >
                        Register
                      </button>{" "}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
          {showAlert &&
            ReactDOM.createPortal(
              <CustomRegisterAlert
                message={alertMessage}
                onClose={handleRegisterAlertClose}
              />,
              document.body
            )}
        </div>
      </div>
    </section>
  );
};

export default Register;
