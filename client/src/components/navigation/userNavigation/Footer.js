import React from "react";
import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  return (
    <section id="Footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <h6 className="footerHeading">About Us</h6>
            <p className="footerDescription">
              We offers the modern day woman and man an unparalleled
              made-to-measure online tailoring service. It is an unique
              experience that lets you express your personal sense of style
              without having to worry about design, fit, quality and delivery
              commitment. Offering free pick-up and delivery service in
              Rawalpindi, Islamabad the service provides customizable designs in
              blouses, kurtas, suits and bottoms according to the client's
              individual measurement.
            </p>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 mx-auto">
            <h6 className="footerHeading px-4">UseFul Links</h6>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ladiesProducts">Ladies Products</Link>
              </li>
              <li>
                <Link to="/gentsProducts">Gents Products</Link>
              </li>
              <li>
                <Link to="/working">How we Works</Link>
              </li>
            </ul>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-4">
            <h6 className="footerHeading">Our Contact</h6>
            <div className="mainContainer p-2">
              <i className="fas fa-phone-alt icon"></i>
              <span className="text-black px-3">
                0333-1447770 <br />
                <span className="px-5">0345-8629967</span>
              </span>
            </div>
            <div className="mainContainer p-2">
              <i className="fas fa-heartbeat icon"></i>
              <Link className="text-decoration-none">
                <span className="text-black px-3">support@pickandstitches</span>
              </Link>
            </div>
            <div className="mainContainer p-2">
              <i className="fas fa-map-marker-alt icon"></i>
              <span className="text-black px-3">Peshawar Road Rawalpindi</span>
            </div>
          </div>
        </div>
      </div>
      <div className="small text-center text-white bg-dark p-3 mt-5">
        &copy;Copyright @ 2022 By{" "}
        <span style={{ color: "var(--primary)" }}>PickandStitches</span> | All
        Rights Reserved
      </div>
    </section>
  );
};

export default Footer;
