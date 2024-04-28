import React, { useState } from "react";
import "../css/Products/ProductInfoUpdate.css";
import { useLocation } from "react-router-dom";
import Loader from "../../otherComponents/Loader/Loader";

const ProductInfoUpdate = () => {
  const location = useLocation();
  const { item } = location.state;
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <section id="ProductInfoUpdate">
      <div className="container">
        <div className="row p-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h4 className="text-center">Update Product</h4>
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
                    value={item.title}
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
                    value={`${item.price}`}
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
                    value={item.category}
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
