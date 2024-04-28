import React, { useState, useEffect } from "react";
import "../css/Ladies/LadiesOrders.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../otherComponents/Loader/Loader";

const LadiesOrders = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const getApiData = async () => {
    const url =
      "https://pickandstitches-deployment-server.onrender.com/api/ladies?";

    try {
      const response = await axios.get(url);
      const result = response.data.LadiesOrder;
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
    return data && data.length > 0
      ? data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.mobile.includes(searchQuery)
        )
      : [];
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
      "Are you sure you want to delete this order?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before deletion
        await axios.delete(
          `https://pickandstitches-deployment-server.onrender.com/api/ladies/${id}`
        );
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting Ladies Order:", error);
      } finally {
        setLoading(false); // Set loading to false after deletion
      }
    }
  };

  const handleDeleteSelected = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete selected orders?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before bulk deletion
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://pickandstitches-deployment-server.onrender.com/api/ladies/${id}`
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
        console.error("Error deleting selected Ladies Orders:", error);
      } finally {
        setLoading(false); // Set loading to false after bulk deletion
      }
    }
  };

  return (
    <section id="LadiesOrders">
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
                  placeholder="Search Order By Name or Cell"
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
                  Ladies Orders
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
                      <th>Name:</th>
                      <th>Cell</th>
                      <th>Address</th>
                      <th>Product</th>
                      <th>Date</th>
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
                                checked={selectedItems.includes(item._id)}
                                onChange={() =>
                                  handleIndividualCheckbox(item._id)
                                }
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.mobile}</td>
                            <td>{item.address}</td>
                            <td>{item.product}</td>
                            <td>
                              {item.date}
                              <br />
                              {item.time}
                            </td>
                            <td>
                              <div
                                className="icon-container"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                  marginTop: "15px",
                                }}
                              >
                                <div className="eye-icon">
                                  <Link
                                    to={`/admin/ladies-order-info/${item._id}`}
                                  >
                                    <i className="fas fa-eye"></i>
                                  </Link>
                                </div>
                                <div className="trash-icon">
                                  <Link
                                    onClick={() =>
                                      handleIndividualDelete(item._id)
                                    }
                                  >
                                    <i className="fas fa-trash text-danger"></i>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filterData().length === 0 && (
                          <tr>
                            <td colSpan="7">No Ladies Orders Yet</td>
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

export default LadiesOrders;
