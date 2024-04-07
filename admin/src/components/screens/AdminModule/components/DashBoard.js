import React from "react";

const DashBoard = () => {
  return (
    <section
      id="DashBoard"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2 style={{ textAlign: "center" }}>Welcome Back Admin</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
