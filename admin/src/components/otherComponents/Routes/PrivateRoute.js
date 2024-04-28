import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Header from "../../navigation/Header";
import Admin from "../../navigation/Admin"; // Import the Admin component

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token if necessary (not implemented here)
      setLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (loggedIn) {
    return (
      <>
        <Header />
        <Outlet />
        {/* Render Admin component if logged in */}
      </>
    );
  } else {
    // If not logged in, navigate to the login page
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
