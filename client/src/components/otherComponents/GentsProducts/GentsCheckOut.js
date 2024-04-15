import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import './css/GentsCheckOut.css'

const GentsCheckOut = () => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    image,
    product,
    name,
    mobile,
    address,
    neck,
    pocket,
    daman,
    wrist,
    comment,
    price,
    legOpening,
    topStitch,
    embroidery,
    availTime,
    samples,
  } = location.state || 0;

  const basePrice = price;
  const singleKanta = 100;
  const doubleKanta = 200;
  const top_double_stitch = 300;
  const embroideryFull = 500;
  const embroideryNormal = 300;
  const deliverycharges = 300;

  const calculateTotalPrice = () => {
    let totalPrice = parseFloat(basePrice) || 0;

    if (legOpening === "Single Kanta") {
      totalPrice += parseFloat(singleKanta) || 0;
    } else if (legOpening === "Double Kanta") {
      totalPrice += parseFloat(doubleKanta) || 0;
    }

    if (topStitch === "Top Double Stitch") {
      totalPrice += parseFloat(top_double_stitch) || 0;
    }

    if (embroidery === "Embroidery Full") {
      totalPrice += parseFloat(embroideryFull) || 0;
    } else if (embroidery === "Embroidery Normal") {
      totalPrice += parseFloat(embroideryNormal) || 0;
    }

    if (deliverycharges !== undefined) {
      totalPrice += parseFloat(deliverycharges) || 0;
    }

    return totalPrice;
  };

  const total = calculateTotalPrice();

  const CustomAlert = ({ message, onClose }) => {
    const navigate = useNavigate();

    const handleOkClick = () => {
      onClose();
      navigate("/");
    };

    return (
      <div className="alert-container container-fluid d-flex justify-content-center">
        <div className="alert-content row">
          <div className="col-sm-12 col-md-12 col-lg-12 ms-auto">
            <p>{message}</p>
            <button onClick={handleOkClick} className="alertBtn">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleCheckOut = async (e) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString();

    e.preventDefault();

    try {
      setLoading(true);
      const orderData = new FormData();

      orderData.append("image", image);
      orderData.append("product", product);
      orderData.append("name", name);
      orderData.append("mobile", mobile);
      orderData.append("address", address);
      orderData.append("neck", neck);
      orderData.append("pocket", pocket);
      orderData.append("daman", daman);
      orderData.append("wrist", wrist);
      orderData.append("comment", comment);
      orderData.append("type", "male");
      orderData.append("price", price);
      orderData.append(
        "legOpening",
        legOpening
          ? `${legOpening} (Rs.${
              legOpening === "Single Kanta"
                ? 100
                : legOpening === "Double Kanta"
                ? 200
                : 0
            })`
          : ""
      );
      orderData.append(
        "topStitch",
        topStitch ? "Top Double Stitch(Rs.300)" : ""
      );
      orderData.append(
        "embroidery",
        embroidery
          ? `${embroidery} (Rs.${
              embroidery === "Embroidery Full"
                ? 500
                : embroidery === "Embroidery Normal"
                ? 300
                : 0
            })`
          : ""
      );
      orderData.append("deliverycharges", deliverycharges);
      orderData.append("total", total);
      orderData.append("availTime", availTime);
      orderData.append("samples", samples);
      orderData.append("date", currentDate);
      orderData.append("time", currentTime);

      const orderApiUrl =
        "https://pickandstitches-deployment-server.onrender.com/api/gents";
      const response = await axios.post(orderApiUrl, orderData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Thank You! Your Order Has Been Placed Successfully!");
        setShowAlert(true);
        console.log(orderData);
      } else {
        setAlertMessage("Error saving data. Please try again later.");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setAlertMessage("An error occurred during checkout. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="GentsCheckOut">
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>Order Details</h2>
          </div>
        </div>

        <hr className="seperator" />

        <div className="row pt-5">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <center>
              <img src={image} alt="Product Image" style={{ width: 200 }} />
              <h6 className="mt-2">{product}</h6>
            </center>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-8">
            <center>
              <div className="table-responsive-md">
                <table className="table">
                  <tbody>
                    <tr className="table-success">
                      <td>Name:</td>
                      <td className="col-sm-12">{name}</td>
                      <td>Mobile:</td>
                      <td>{mobile}</td>
                    </tr>
                    <tr className="table-danger">
                      <td>Adress:</td>
                      <td colSpan="3">{address}</td>
                    </tr>
                    <tr className="table-info">
                      <td>Neck Type:</td>
                      <td>{neck}</td>
                      <td>Pocket Type:</td>
                      <td>{pocket}</td>
                    </tr>
                    <tr className="table-warning">
                      <td>Daman Type:</td>
                      <td>{daman}</td>
                      <td>Wrist Type:</td>
                      <td>{wrist}</td>
                    </tr>
                    <tr className="table-active">
                      <td>Comment:</td>
                      <td colSpan="3">{comment}</td>
                    </tr>
                    <tr className="table-danger">
                      <td className="pt-5">Order Items</td>
                      <td colSpan="5" style={{ textAlign: "right" }}>
                        <table>
                          <tr>
                            <td>Product Base Price:</td>
                            <td className="px-5">Rs.{price}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Leg Opening:</td>
                            <td className="px-5">
                              {legOpening || "Not selected"} (Rs.
                              {legOpening === "Single Kanta"
                                ? singleKanta
                                : legOpening === "Double Kanta"
                                ? doubleKanta
                                : 0}
                              )
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Top Stitch:</td>
                            <td className="px-5">
                              {topStitch || "Not selected"} (Rs.
                              {topStitch === "Top Double Stitch" ? 300 : 0})
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Embroidery:</td>
                            <td className="px-5">
                              {embroidery || "Not selected"} (Rs.
                              {embroidery === "Embroidery Full"
                                ? 500
                                : embroidery === "Embroidery Normal"
                                ? 300
                                : 0}
                              )
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Delivery Charges:</td>
                            <td className="px-5">(Rs.{deliverycharges})</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Total Bill:</td>
                            <td className="px-5">(Rs.{total})</td>
                            <br />
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </center>

            <center>
              <div className="row p-2 mt-5">
                <div className="col-lg-12">
                  <form encType="multipart/form-data">
                    {loading ? (
                      <Loader />
                    ) : (
                      <button
                        type="submit"
                        className="gentsOrderBtn"
                        onClick={handleCheckOut}
                      >
                        Submit Order
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>

      {showAlert &&
        ReactDOM.createPortal(
          <CustomAlert message={alertMessage} onClose={handleAlertClose} />,
          document.body
        )}
    </section>
  );
};

export default GentsCheckOut;
