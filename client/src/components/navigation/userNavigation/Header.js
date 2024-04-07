import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import "./css/Header.css";

const Header = () => {
  return (
    <section id="Header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-md-3 col-lg-3">
            <div className="mainContainer">
              <i className="fas fa-map-marker-alt icon"></i>
              <span className="spanText">Peshawar Road Rawalpindi</span>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3">
            <div className="mainContainer">
              <i className="fas fa-phone-alt icon"></i>
              <span className="spanText">0333-1447770 , 03458629967</span>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3">
            <div className="mainContainer">
              <i className="fas fa-bullhorn icon"></i>
              <span className="spanText">
                Refer Your Friends and Earn Reward
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <strong>
            <Link className="navbar-brand" to="/">
              <img
                className="Logo"
                src={Logo}
                alt="Logo"
                style={{ width: 200, margin: 5 }}
              />
            </Link>
          </strong>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ladiesProducts">
                  Ladies Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gentsProducts">
                  Gents Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/working">
                  How We Works
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedBack">
                  FeedBack
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
