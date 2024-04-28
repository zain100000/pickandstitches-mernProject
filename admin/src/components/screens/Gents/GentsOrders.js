import React, { useEffect, useState } from "react";
import axios from "axios";

const GentsOrders = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    const url =
      "https://pickandstitches-deployment-server.onrender.com/api/gents?";

    try {
      const response = await axios.get(url);
      const result = response.data.GentsOrders;
      setData(result);
      setIsLoading(false);
      setSelectAll(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const filterData = () => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.mobile.includes(searchText)
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        "https://pickandstitches-deployment-server.onrender.com/api/gents"
      );
      const result = response.data.GentsOrders;
      setData(result);
    } catch (error) {
      console.error("Error fetching new data:", error);
    }

    setRefreshing(false);
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

  return (
    <div className="flex-1 bg-white">
      <div className="flex-row justify-between items-center">
        <button
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
          className="left-4"
        >
          Delete Selected
        </button>

        <input
          type="text"
          placeholder="Search by name or cell number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-2 border-gray-400 w-80 border-l-2 border-r-0 border-t-0 p-2 text-primary"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        />
      </div>

      <div className="flex-row justify-around items-center p-5 border-b-2 border-b-gray-400">
        <button onClick={handleSelectAll}>
          {selectAll ? "Unselect All" : "Select All"}
        </button>
        <span className="text-dark" style={{ fontFamily: "Montserrat-Medium" }}>
          Name
        </span>
        <span className="text-dark" style={{ fontFamily: "Montserrat-Medium" }}>
          Cell
        </span>
        <span className="text-dark" style={{ fontFamily: "Montserrat-Medium" }}>
          Address
        </span>
        <span className="text-dark" style={{ fontFamily: "Montserrat-Medium" }}>
          Date
        </span>
        <span className="text-dark" style={{ fontFamily: "Montserrat-Medium" }}>
          Actions
        </span>
      </div>

      <div className="flex-1">
        <ul>
          {filterData().map((item) => (
            <li key={item._id}>
              <div className="flex-row justify-around items-center p-5 border-b-2 border-b-gray-400 ">
                <div className="w-14 px-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleIndividualCheckbox(item._id)}
                  />
                </div>
                <div className="flex-1 flex-row justify-around items-center">
                  <span
                    className="flex-1"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="flex-1 pr-5"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {item.mobile}
                  </span>
                  <span
                    className="flex-1"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {item.address}
                  </span>
                  <div style={{ flex: 1, alignItems: "center" }}>
                    <span>{formatDate(item.date)}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className="w-16 flex-row item-center justify-between flex-wrap left-4">
                  <button onClick={() => handleViewOrderDetails(item)}>
                    View
                  </button>
                  <button onClick={() => handleIndividualDelete(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {!data.length && !isLoading && (
        <span className="flex-1 text-center text-xl text-gray-600">
          No Gents Orders Yet
        </span>
      )}
    </div>
  );
};

export default GentsOrders;
