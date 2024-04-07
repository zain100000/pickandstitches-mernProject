import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import ReactDOM from "react-dom";
import "./css/Header.css";
import Loader from "../../otherComponents/Loader/Loader";

const AdminHeader = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CustomAlert = ({ message }) => {
    return (
      <div className="custom-alert-container">
        <div className="alert-content">
          <p>{message}</p>
        </div>
      </div>
    );
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const RegisterApiUrl =
        "https://pickandstitches-deployment-server.onrender.com/api/admin/logout";
      const response = await axios.post(RegisterApiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Logout Successfully!");
        setShowAlert(true);
        window.location.href = "/admin/login";
      } else {
        setAlertMessage("Error Logout!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("An Error Occurred During Logout!");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="AdminHeader">
      <div className="container">
        <nav className="navbar navbar-expand-sm bg-white">
          <div className="container">
            <strong>
              <Link className="navbar-brand">
                <img
                  className="Logo"
                  src={Logo}
                  alt="Logo"
                  style={{ width: 200, margin: 5 }}
                />
              </Link>
            </strong>
          </div>
          <div className="logoutContainer">
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i class="fas fa-user fa-lg text-white"></i>
              </a>
              <ul class="dropdown-menu">
                <li>
                  {loading ? (
                    <Loader />
                  ) : (
                    <Link class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  )}
                </li>
              </ul>
            </li>
          </div>
        </nav>
      </div>
      {showAlert &&
        ReactDOM.createPortal(
          <CustomAlert message={alertMessage} onClose={handleAlertClose} />,
          document.body
        )}
    </section>
  );
};

export default AdminHeader;
