// Admin.js
import React from "react";
import Sidebar from "./Sidebar";
import './css/Admin.css'
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <section id="Admin">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
