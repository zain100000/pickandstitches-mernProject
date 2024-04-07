import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import ReactDOM from "react-dom";
import Loader from "../../otherComponents/Loader/Loader";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CustomAlert = ({ message, onClose }) => {
    const handleClick = () => {
      onClose();
    };

    return (
      <div className="custom-alert-container">
        <div className="alert-content">
          <p>{message}</p>
          <button onClick={handleClick} className="alertBtn">
            OK
          </button>
        </div>
      </div>
    );
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resetPasswordData = {
        email,
        password: newPassword,
      };

      const ResetPasswordApiUrl =
        "https://pickandstitches-deployment-server.onrender.com/api/admin/reset-password";
      const response = await axios.patch(
        ResetPasswordApiUrl,
        resetPasswordData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Password Successfully Reset!");
        setShowAlert(true);
        window.location.href = "/admin/login";
      } else {
        setAlertMessage("Error Resetting Password!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("An Error Occurred During Resetting Password!");
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
            <h1>Admin Reset Password</h1>
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
                      <label className="form-label">Enter New Password</label>
                      <input
                        type="password"
                        className="form-control form-control-md"
                        placeholder="Password Length Must Be 6!"
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete={false}
                      />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        onClick={handleResetPassword}
                        type="button"
                        className="loginBtn"
                        style={{ paddingLeft: 20, paddingRight: 20 }}
                      >
                        Reset Password
                      </button>{" "}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
          {showAlert &&
            ReactDOM.createPortal(
              <CustomAlert message={alertMessage} onClose={handleAlertClose} />,
              document.body
            )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
