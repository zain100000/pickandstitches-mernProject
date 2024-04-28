import React, { useState } from "react";
import "./css/Sidebar.css";
import { NavLink } from "react-router-dom";
import Dashboard from "../../assets/pngimages/dashboard.png";
import Gent from "../../assets/pngimages/gent.png";
import Lady from "../../assets/pngimages/lady.png";
import Cart from "../../assets/pngimages/cart.png";
import Product from "../../assets/pngimages/product.png";
import Feedback from "../../assets/pngimages/feedback.png";

const Sidebar = () => {
  const [activeRoute, setActiveRoute] = useState("/admin/dashboard");

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  return (
    <section id="Sidebar">
      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/dashboard" ? "active" : ""
        }`}
        to="/admin/dashboard"
        onClick={() => handleSetActiveRoute("/admin/dashboard")}
      >
        <div className="sidebar-item">
          <img src={Dashboard} alt="home" className="icon" />
          <p>DashBoard</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/gents-orders" ? "active" : ""
        }`}
        to="/admin/gents-orders"
        onClick={() => handleSetActiveRoute("/admin/gents-orders")}
      >
        <div className="sidebar-item">
          <img src={Gent} alt="gent" className="icon" />
          <p>Gents Orders</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/ladies-orders" ? "active" : ""
        }`}
        to="/admin/ladies-orders"
        onClick={() => handleSetActiveRoute("/admin/ladies-orders")}
      >
        <div className="sidebar-item">
          <img src={Lady} alt="lady" className="icon" />
          <p>Ladies Orders</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/add-products" ? "active" : ""
        }`}
        to="/admin/add-products"
        onClick={() => handleSetActiveRoute("/admin/add-products")}
      >
        <div className="sidebar-item">
          <img src={Cart} alt="cart" className="icon" />
          <p>Add Products</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/products-list" ? "active" : ""
        }`}
        to="/admin/products-list"
        onClick={() => handleSetActiveRoute("/admin/products-list")}
      >
        <div className="sidebar-item">
          <img src={Product} alt="product" className="icon" />
          <p>Product List</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/feedbacks" ? "active" : ""
        }`}
        to="/admin/feedbacks"
        onClick={() => handleSetActiveRoute("/admin/feedbacks")}
      >
        <div className="sidebar-item">
        <img src={Feedback} alt="feedback" className="icon" />
          <p>FeedBacks</p>
        </div>
      </NavLink>
    </section>
  );
};

export default Sidebar;
