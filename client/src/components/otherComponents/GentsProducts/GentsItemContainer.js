// GentsItemsContainer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/GentsItemContainer.css";

const GentsItemsContainer = ({ image, product, price, onwards }) => {
  const navigate = useNavigate();

  const navigateToOrderDetails = () => {
    navigate("/gents-order-details", {
      state: { image, product, price },
    });
  };

  return (
    <div onClick={navigateToOrderDetails} style={{ cursor: "pointer" }}>
      <section id="GentsItemContainer">
        <div className="gentsContainer">
          <center>
            {image && <img src={image} alt={product} className="pImg" />}
          </center>

          {product ? (
            <div className="productDetailsContainer text-center mt-2">
              <p className="pName">{product}</p>
              <p className="pPrice">Rs.{price}</p>
              <p className="pOnwards">{onwards}</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default GentsItemsContainer;
