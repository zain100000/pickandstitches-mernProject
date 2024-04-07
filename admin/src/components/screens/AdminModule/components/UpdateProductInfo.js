import React, { useState } from "react";
import "./css/UpdateProductInfo.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "../../../otherComponents/Loader/Loader";

const ProductInfoUpdate = () => {
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(selectedProduct);

  const closeModal = () => {
    setShowModal(false);
  };

  const imageHandler = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const productData = {
        ...updatedProduct,
      };

      const updateProductResponse = await axios.patch(
        `https://pickandstitches-deployment-server.onrender.com/api/products/updateProduct/${selectedProduct._id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (updateProductResponse.data.success) {
        setSuccessMessage("Product Updated!");
        setErrorMessage("");
        setShowModal(true);
      } else {
        setErrorMessage("Error Occurred During Product Updation");
        setSuccessMessage("");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response) {
        console.error("Server error response:", error.response);
      }
      setErrorMessage("Error updating product: " + error.message);
      setSuccessMessage("");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ProductInfoUpdate">
      {successMessage && showModal && (
        <center>
          <div
            className="alert alert-success w-50 d-flex justify-content-center align-items-center p-4 mt-5"
            role="alert"
          >
            <span style={{ fontSize: 20, paddingRight: 20 }}>
              {successMessage}
            </span>
            <br />
            <button onClick={closeModal} className="btn w-25">
              OK
            </button>
          </div>
        </center>
      )}
      {errorMessage && showModal && (
        <center>
          <div
            className="alert alert-danger w-50 d-flex justify-content-center align-items-center p-4 mt-5"
            role="alert"
          >
            <span style={{ fontSize: 20, paddingRight: 20 }}>
              {errorMessage}
            </span>
            <br />
            <button onClick={closeModal} className="btn w-25">
              OK
            </button>
          </div>
        </center>
      )}

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 p-5">
            <form encType="multipart/form-data">
              <input
                type="text"
                placeholder="Title"
                className="inputField"
                name="title"
                value={updatedProduct.title}
                onChange={handleChange}
              />

              <input
                type="number"
                placeholder="Price"
                className="inputField"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />

              <select
                className="inputField w-50"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
              >
                <option value="">Category</option>
                <option value="Gents">Gents</option>
                <option value="Ladies">Ladies</option>
              </select>

              <div className="uploadField mt-2">
                <label htmlFor="file-input" className="uploadBtn">
                  <i class="fas fa-upload"></i>
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={imageHandler}
                  id="file-input"
                  hidden
                />
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Image"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "2px solid black",
                        boxShadow: "0px 0px 2px 2px #000 ",
                        maxWidth: "50%",
                        maxHeight: "20vh",
                        aspectRatio: 3 / 2,
                        objectFit: "contain",
                        marginLeft: 20,
                        marginBottom: 5,
                      }}
                    />
                  )}
                  {!image && updatedProduct.image && (
                    <img
                      src={updatedProduct.image}
                      alt="Image"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        border: "2px solid black",
                        boxShadow: "0px 0px 2px 2px #000 ",
                        maxWidth: "50%",
                        maxHeight: "20vh",
                        aspectRatio: 3 / 2,
                        objectFit: "contain",
                        marginLeft: 20,
                        marginBottom: 5,
                      }}
                    />
                  )}
                </div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <button className="btn" type="submit" onClick={updateProduct}>
                  Update Product
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfoUpdate;
