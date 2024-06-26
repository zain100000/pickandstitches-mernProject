import React, { useState } from "react";
import "../css/Products/AddProducts.css";
import Loader from "../../otherComponents/Loader/Loader";
import axios from "axios";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      const addProductResponse = await axios.post(
        "https://pickandstitches-deployment-server.onrender.com/api/products/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addProductResponse.data.success) {
        alert("Product Added!");
      } else {
        alert("Error Occurred During Product Addition");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="AddProducts">
      <div className="container">
        <div className="row p-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h4 className="text-center">Add Products</h4>
          </div>
        </div>
        <form>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                {image ? (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      style={{
                        aspectRatio: "3/2",
                        width: "80%",
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
                <button className="add-products-btn" onClick={handleAddProduct}>
                  Add Product
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProducts;
