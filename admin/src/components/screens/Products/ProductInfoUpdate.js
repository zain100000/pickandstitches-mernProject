import React, { useState } from "react";
import "../css/Products/ProductInfoUpdate.css";
import { useLocation } from "react-router-dom";
import Loader from "../../otherComponents/Loader/Loader";
import axios from "axios";

const ProductInfoUpdate = () => {
  const location = useLocation();
  const { item } = location.state;
  const [selectedImage, setSelectedImage] = useState("");
  const [productData, setProductData] = useState({
    title: item.title,
    price: item.price,
    category: item.category,
  });
  const [loading, setLoading] = useState(false);

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedImage);
    setLoading(true);

    try {
      const updatedProduct = {
        title: productData.title,
        price: productData.price,
        category: productData.category,
      };

      await axios.patch(
        `https://pickandstitches-deployment-server.onrender.com/api/products/updateProduct/${item._id}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Product updated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
    }
  };

  return (
    <section id="ProductInfoUpdate">
      <div className="container">
        <div className="row p-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h4 className="text-center">Update Product</h4>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="title-container">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-signature"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={productData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="price-container">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-tag"></i>
                  </span>
                  <input
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="category-container">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user-friends"></i>
                  </span>
                  <select
                    className="form-select"
                    style={{ border: "2px solid #000", cursor: "pointer" }}
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select category</option>
                    <option value="Gents">Gents</option>
                    <option value="Ladies">Ladies</option>
                  </select>
                </div>
              </div>

              <div className="image-upload-container">
                <div className="input-group">
                  <span className="input-group-text">
                    <i
                      className="fas fa-upload"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="image-preview-container">
                {selectedImage ? (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedImage)} // Display selected image
                      alt="Selected"
                      style={{
                        aspectRatio: "3/2",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                ) : item.image ? (
                  <div>
                    <img
                      src={item.image}
                      alt="Previous"
                      style={{
                        aspectRatio: "3/2",
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "40vh",
                    }}
                  >
                    <h6>Upload Picture</h6>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              {loading ? (
                <Loader />
              ) : (
                <button className="add-products-btn">Update Product</button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductInfoUpdate;
