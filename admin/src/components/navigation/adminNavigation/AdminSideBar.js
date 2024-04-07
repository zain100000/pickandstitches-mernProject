import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/SideBar.css";

const AdminSideBar = () => {
  const [activeRoute, setActiveRoute] = useState("/");

  const handleSetActiveRoute = (route) => {
    setActiveRoute(route);
  };

  return (
    <section id="Sidebar">
      <NavLink
        className={`nav-link ${activeRoute === "/" ? "active" : ""}`}
        to="/"
        onClick={() => handleSetActiveRoute("/")}
      >
        <div className="sidebar-item">
          <i className="fas fa-home fa-lg"></i>
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
          <i className="fas fa-male fa-lg"></i>
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
          <i className="fas fa-female fa-lg"></i>
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
          <i className="fas fa-cart-plus fa-lg"></i>
          <p>Add Products</p>
        </div>
      </NavLink>

      <NavLink
        className={`nav-link ${
          activeRoute === "/admin/product-list" ? "active" : ""
        }`}
        to="/admin/product-list"
        onClick={() => handleSetActiveRoute("/admin/product-list")}
      >
        <div className="sidebar-item">
          <i className="fas fa-list fa-lg"></i>
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
          <i className="fas fa-comments fa-lg"></i>
          <p>FeedBacks</p>
        </div>
      </NavLink>
    </section>
  );
};

export default AdminSideBar;
