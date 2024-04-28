import React, { useState, useEffect } from "react";
import "../css/Products/ProductsList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../otherComponents/Loader/Loader";

const ProductsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const getApiData = async () => {
    const url =
      "https://pickandstitches-deployment-server.onrender.com/api/products/getProducts?";

    try {
      const response = await axios.get(url);
      const result = response.data.Product;
      setData(result);
      setLoading(false);
      setSelectAll(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const filterData = () => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(!selectAll ? data.map((item) => item._id) : []);
  };

  const handleIndividualCheckbox = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleIndividualDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Product?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before deletion
        await axios.delete(
          `https://pickandstitches-deployment-server.onrender.com/api/products/removeProduct/${id}`
        );
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting Product:", error);
      } finally {
        setLoading(false); // Set loading to false after deletion
      }
    }
  };

  const handleDeleteSelected = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete selected Products?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before bulk deletion
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://pickandstitches-deployment-server.onrender.com/api/products/removeProduct/${id}`
            );
          })
        );
        // Remove selected items from data immediately
        setData((prevData) =>
          prevData.filter((item) => !selectedItems.includes(item._id))
        );
        // Clear selected items
        setSelectedItems([]);
      } catch (error) {
        console.error("Error deleting selected Products:", error);
      } finally {
        setLoading(false); // Set loading to false after bulk deletion
      }
    }
  };

  return (
    <section id="ProductsList">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <form role="search">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search Products By Title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="list-container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="title">
                <h5
                  className="text-white mt-2 px-2"
                  style={{ fontSize: "1rem" }}
                >
                  Products List
                </h5>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <button
                className="btn btn-danger"
                onClick={handleDeleteSelected}
                style={{ margin: "5px", borderRadius: "0" }}
              >
                <i className="fa fa-trash-o"></i> Delete Selected
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="table-responsive" style={{ margin: "10px" }}>
                <table className="table" style={{ textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Product:</th>
                      <th>Title:</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {filterData().map((item) => (
                          <tr key={item._id}>
                            <td>
                              <input
                                type="checkbox"
                                className="mt-5"
                                checked={selectedItems.includes(item._id)}
                                onChange={() =>
                                  handleIndividualCheckbox(item._id)
                                }
                              />
                            </td>
                            <img
                              src={item.image}
                              alt="Product Image"
                              style={{
                                aspectRatio: "2/3",
                                width: "80px",
                                objectFit: "contain",
                              }}
                            />
                            <td className="py-5">{item.title}</td>
                            <td className="py-5">{item.price}</td>
                            <td className="py-5">{item.category}</td>
                            <td>
                              <div
                                className="icon-container"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                  marginTop: "35px",
                                }}
                              >
                                <div
                                  className="eye-icon"
                                  style={{
                                    padding: "2px 10px",
                                    borderRadius: "50px",
                                    boxShadow:
                                      "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <div className="eye-icon">
                                    <Link
                                      to={`/admin/product-info-update/${item._id}`}
                                      state={{ item }}
                                    >
                                      <i className="fas fa-pencil-alt pt-2"></i>
                                    </Link>
                                  </div>
                                </div>
                                <div
                                  className="trash-icon"
                                  style={{
                                    padding: "2px 10px",
                                    borderRadius: "50px",
                                    boxShadow:
                                      "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <Link
                                    onClick={() =>
                                      handleIndividualDelete(item._id)
                                    }
                                  >
                                    <i className="fas fa-trash text-danger pt-2"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filterData().length === 0 && (
                          <tr>
                            <td colSpan="7">No Products Yet</td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
