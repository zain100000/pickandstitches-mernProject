import React from "react";
import "./css/Header.css";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  return (
    <section id="Header">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <button className="btn" onClick={logout}>
              <i className="fas fa-sign-out-alt fa-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
