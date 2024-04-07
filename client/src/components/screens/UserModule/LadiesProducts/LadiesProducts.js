import React, { useState, useEffect } from "react";
import LadiesItemsContainer from "../../../otherComponents/LadiesProducts/LadiesItemContainer";
import Loader from "../../../otherComponents/Loader/Loader";
import axios from "axios";

const LadiesProducts = () => {
  const [ladiesProducts, setLadiesProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    // Fetch ladies products from your backend API
    axios
      .get(
        "https://pickandstitches-deployment-server.onrender.com/api/products/getProducts"
      )
      .then((response) => {
        // Filter products to get only ladies products
        const ladiesProducts = response.data.Product.filter(
          (product) => product.category === "Ladies"
        );
        setLadiesProducts(ladiesProducts);
        setLoading(false); // Set loading to false when products are fetched
      })
      .catch((error) => {
        console.error("Error fetching ladies products:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <section id="LadiesProduct">
      <div className="container">
        <div className="row">
          {/* Conditional rendering based on loading state */}
          {loading ? (
            <Loader />
          ) : ladiesProducts.length > 0 ? (
            ladiesProducts.map((product) => (
              <div key={product._id} className="col-sm-12 col-md-6 col-lg-3">
                <LadiesItemsContainer
                  product={product.title}
                  image={`${product.image}`}
                  price={product.price.toString()}
                  onwards={"Onwards"}
                />
              </div>
            ))
          ) : (
            <h6
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 150,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              No Ladies Products!
            </h6>
          )}
        </div>
      </div>
      <hr
        className="seperator"
        style={{ color: "green", fontWeight: "bold" }}
      />
    </section>
  );
};

export default LadiesProducts;
