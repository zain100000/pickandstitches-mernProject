import React from "react";
import AdminHeader from "./components/navigation/adminNavigation/AdminHeader";
import AdminFooter from "./components/navigation/adminNavigation/AdminFooter";
import Admin from "./components/screens/AdminModule/components/Admin";

const App = () => {
  return (
    <>
      <AdminHeader />
      <AdminFooter />
      <Admin />
    </>
  );
};

export default App;
