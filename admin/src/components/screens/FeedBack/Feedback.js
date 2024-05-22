import React, { useState, useEffect } from "react";
import "../css/Feedback/Feedback.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../otherComponents/Loader/Loader";

const Feedback = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const getApiData = async () => {
    const url =
      "https://pickandstitches-deployment-server.onrender.com/api/feedback/getFeedback";

    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(url);
      const result = response.data.FeedBack || []; // Ensure result is an array
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
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.toLowerCase().includes(searchQuery.toLowerCase())
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
      "Are you sure you want to delete this feedback?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before deletion
        await axios.delete(
          `https://pickandstitches-deployment-server.onrender.com/api/feedback/${id}`
        );
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error deleting Feedbacks:", error);
      } finally {
        setLoading(false); // Set loading to false after deletion
      }
    }
  };

  const handleDeleteSelected = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete selected feedbacks?"
    );

    if (confirmed) {
      try {
        setLoading(true); // Set loading to true before bulk deletion
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://pickandstitches-deployment-server.onrender.com/api/feedback/${id}`
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
        console.error("Error deleting selected FeedBacks:", error);
      } finally {
        setLoading(false); // Set loading to false after bulk deletion
      }
    }
  };

  return (
    <section id="FeedBack">
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
                  placeholder="Search Feedback By Name or Cell"
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
                  FeedBacks
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
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {data &&
                          filterData().map((item) => (
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
                              <td className="py-5">{item.name}</td>
                              <td className="py-5">{item.email}</td>
                              <td className="py-5">{item.mobile}</td>
                              <td className="py-5">{item.subject}</td>
                              <td className="py-5">{item.message}</td>
                              <td className="py-4">
                                <div
                                  className="icon-container"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    gap: 20,
                                    alignItems: "center",
                                    marginTop: "18px",
                                  }}
                                >
                                  <div
                                    className="trash-icon"
                                    style={{
                                      padding: "2px 12px",
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
                            <td colSpan="7">No FeedBacks Yet</td>
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

export default Feedback;
