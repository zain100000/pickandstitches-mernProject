import React, { useState } from "react";
import "./css/AddProduct.css";
import axios from "axios";
import Loader from "../../../otherComponents/Loader/Loader";

const AddProduct = () => {
  const [image, setImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const closeModal = () => {
    setShowModal(false);
    // Clear form fields
    setProductDetails({
      title: "",
      price: "",
      category: "",
      image: "",
    });
    setImage(""); // Clear image
  };

  const imageHandler = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setProductDetails({ ...productDetails, image: selectedFile });
  };

  const productHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const productData = { ...productDetails };

      const addProductResponse = await axios.post(
        "https://pickandstitches-deployment-server.onrender.com/api/products/addProduct",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addProductResponse.data.success) {
        setSuccessMessage("Product Added!");
        setErrorMessage("");
        setShowModal(true);
      } else {
        setErrorMessage("Error Occurred During Product Addition");
        setSuccessMessage("");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Error!", error);
      setSuccessMessage("");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="AddProducts">
      {successMessage && showModal && (
        <center>
          <div
            className="alert alert-success w-50 d-flex justify-content-center align-items-center p-2 mt-5"
            role="alert"
          >
            <span style={{ fontSize: 15, paddingRight: 20, marginTop: 8 }}>
              {successMessage}
            </span>
            <br />
            <button onClick={closeModal} className="successBtn w-25">
              OK
            </button>
          </div>
        </center>
      )}
      {errorMessage && showModal && (
        <center>
          <div
            className="alert alert-danger w-50 d-flex justify-content-center align-items-center p-2 mt-5"
            role="alert"
          >
            <span style={{ fontSize: 15, paddingRight: 20, marginTop: 8 }}>
              {errorMessage}
            </span>
            <br />
            <button onClick={closeModal} className="errorBtn w-25">
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
                value={productDetails.title}
                onChange={productHandler}
              />

              <input
                type="number"
                placeholder="Price"
                className="inputField"
                name="price"
                value={productDetails.price}
                onChange={productHandler}
              />

              <select
                className="inputField w-50"
                name="category"
                value={productDetails.category}
                onChange={productHandler}
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
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Image"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "50%",
                        maxHeight: "20vh",
                        aspectRatio: 3 / 2,
                        objectFit: "contain",
                        marginLeft: 20,
                        marginBottom: 5,
                      }}
                    />
                  ) : (
                    <h6 className="px-4">Select Image</h6>
                  )}
                </div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <button className="btn" type="submit" onClick={addProduct}>
                  Add Product
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
