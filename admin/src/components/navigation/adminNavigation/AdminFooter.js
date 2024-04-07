import React from "react";
import "./css/Footer.css";

const AdminFooter = () => {
  return (
    <section id="AdminFooter">
      <div
        className="small text-center text-black p-3 mt-5"
        style={{ backgroundColor: "#00bcd4", fontWeight: "bold" }}
      >
        &copy;Copyright @ 2022 By{" "}
        <span style={{ color: "var(--dark)", fontWeight: "bold" }}>
          PickandStitches
        </span>{" "}
        | All Rights Reserved
      </div>
    </section>
  );
};

export default AdminFooter;
