import React, { useState, useEffect } from "react";
import "./css/ProductList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../otherComponents/Loader/Loader";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getApiData = async () => {
    const url = "https://pickandstitches-deployment-server.onrender.com/api/products/getProducts";

    try {
      const response = await axios.get(url);
      const result = response.data.Product;
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

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
    const userConfirmed = window.confirm(
      "Are You Sure You Want To Delete This Product?"
    );

    if (userConfirmed) {
      try {
        setLoading(true);

        await axios.delete(
          `https://pickandstitches-deployment-server.onrender.com/api/products/removeProduct/${id}`
        );

        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Error Deleting Products", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelected = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete selected Product?"
    );

    if (userConfirmed) {
      try {
        setLoading(true);
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://pickandstitches-deployment-server.onrender.com/api/products/removeProduct/${id}`
            );
          })
        );

        setData((prevData) =>
          prevData.filter((item) => !selectedItems.includes(item._id))
        );

        setSelectedItems([]);
        setSelectAll(false);
      } catch (error) {
        console.error("Error Deleting Selected Products:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section id="ProductList">
      <div className="container">
        <div className="headingContainer mt-5">
          <button
            type="button"
            className="btn btn-danger"
            style={{ paddingTop: 5, margin: 10 }}
            onClick={handleDeleteSelected}
            disabled={selectedItems.length === 0}
          >
            <i className="fa fa-trash-o"></i> Delete Selected
          </button>

          <div className="table-responsive-md">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>

                  <th>Product</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading ? (
                <Loader />
              ) : (
                <tbody>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            style={{ marginTop: 40 }}
                            checked={
                              selectAll || selectedItems.includes(item._id)
                            }
                            onChange={() => handleIndividualCheckbox(item._id)}
                          />
                        </td>
                        <td>
                          <img src={item.image} alt="Image" className="m-2" />
                        </td>
                        <td className="py-5">{item.title}</td>
                        <td className="py-5">{item.category}</td>
                        <td className="py-5">Rs{item.price}</td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleIndividualDelete(item._id)}
                            style={{ marginTop: 30, marginRight: 2 }}
                          >
                            <i className="text-white fa fa-trash-o"></i>
                          </button>
                          <Link
                            to={`/admin/product-info-update/${item._id}`}
                            state={{ selectedProduct: item }}
                            className="btn btn-info"
                            style={{ marginTop: 30, marginLeft: 2 }}
                          >
                            <i className="text-white fa fa-pencil"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No Products Yet!</td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
