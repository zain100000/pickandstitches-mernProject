import React, { useState, useEffect } from "react";
import GentsItemsContainer from "../../../otherComponents/GentsProducts/GentsItemContainer";
import Loader from "../../../otherComponents/Loader/Loader";
import axios from "axios";

const GentsProducts = () => {
  const [gentsProducts, setGentsProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    // Fetch gents products from your backend API
    axios
      .get(
        "https://pickandstitches-deployment-server.onrender.com/api/products/getProducts"
      )
      .then((response) => {
        // Filter products to get only gents products
        const gentsProducts = response.data.Product.filter(
          (product) => product.category === "Gents"
        );
        setGentsProducts(gentsProducts);
        setLoading(false); // Set loading to false when products are fetched
      })
      .catch((error) => {
        console.error("Error fetching gents products:", error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <section id="GentsProduct">
      <div className="container">
        <div className="row">
          {/* Conditional rendering based on loading state */}
          {loading ? (
            <Loader />
          ) : gentsProducts.length > 0 ? (
            gentsProducts.map((product) => (
              <div key={product._id} className="col-sm-12 col-md-6 col-lg-3">
                <GentsItemsContainer
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
              No Gents Products!
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

export default GentsProducts;
