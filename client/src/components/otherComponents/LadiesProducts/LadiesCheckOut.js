import React, { useState } from "react";
import "./css/LadiesCheckOut.css";
import axios from "axios";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const LadiesCheckOut = () => {
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
    comment,
    price,
    piko,
    dupatta,
    top,
    embroidery,
    availTime,
    samples,
  } = location.state;

  // Define pricing variables
  const basePrice = price;
  const pikoFull = 120;
  const pikoHalf = 60;
  const dupattaPiping = 300;
  const dupattaExtension = 300;
  const dupattaFetta = 300;
  const fullTopPiping = 300;
  const fullTopExtension = 300;
  const fullTopFetta = 300;
  const embroideryGalla = 300;
  const embroideryDaman = 300;
  const embroideryBazo = 300;
  const embroideryBottom = 300;
  const deliverycharges = 300;

  const calculateTotalPrice = () => {
    let totalPrice = parseFloat(basePrice) || 0;

    if (piko === "Piko Full") {
      totalPrice += parseFloat(pikoFull) || 0;
    } else if (piko === "Piko Half") {
      totalPrice += parseFloat(pikoHalf) || 0;
    }

    if (dupatta === "Dupatta Piping") {
      totalPrice += parseFloat(dupattaPiping) || 0;
    } else if (dupatta === "Dupatta Extension") {
      totalPrice += parseFloat(dupattaExtension) || 0;
    } else if (dupatta === "Dupatta Fetta") {
      totalPrice += parseFloat(dupattaFetta) || 0;
    }

    if (top === "Full Top Piping") {
      totalPrice += parseFloat(fullTopPiping) || 0;
    } else if (top === "Full Top Extension") {
      totalPrice += parseFloat(fullTopExtension) || 0;
    } else if (top === "Full Top Fetta") {
      totalPrice += parseFloat(fullTopFetta) || 0;
    }

    if (embroidery === "Embroidery Galla") {
      totalPrice += parseFloat(embroideryGalla) || 0;
    } else if (embroidery === "Embroidery Daman") {
      totalPrice += parseFloat(embroideryDaman) || 0;
    } else if (embroidery === "Embroidery Bazo") {
      totalPrice += parseFloat(embroideryBazo) || 0;
    } else if (embroidery === "Embroidery Bottom") {
      totalPrice += parseFloat(embroideryBottom) || 0;
    }

    if (deliverycharges !== undefined) {
      totalPrice += parseFloat(deliverycharges) || 0;
    }

    return totalPrice;
  };

  // Get the dynamically calculated total price
  const total = calculateTotalPrice();

  const CustomAlert = ({ message, onClose }) => {
    const navigate = useNavigate();

    const handleOkClick = () => {
      onClose(); // Close the alert
      navigate("/"); // Navigate back to the home screen
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
      orderData.append("comment", comment);
      orderData.append("type", "female");
      orderData.append("price", basePrice);
      orderData.append(
        "piko",
        piko
          ? `${piko} (Rs.${
              piko === "Piko Full" ? 120 : piko === "Piko Half" ? 60 : 0
            })`
          : ""
      );
      orderData.append(
        "dupatta",
        dupatta
          ? `${dupatta} (Rs.${
              dupatta === "Dupatta Piping"
                ? 300
                : dupatta === "Dupatta Extension"
                ? 300
                : dupatta === "Dupatta Fetta"
                ? 300
                : 0
            })`
          : ""
      );
      orderData.append(
        "top",
        top
          ? `${top} (Rs.${
              top === "Full Top Piping"
                ? 300
                : top === "Full Top Extension"
                ? 300
                : top === "Full Top Fetta"
                ? 300
                : 0
            })`
          : ""
      );
      orderData.append(
        "embroidery",
        embroidery
          ? `${embroidery} (Rs.${
              embroidery === "Embroidery Galla"
                ? 300
                : embroidery === "Embroidery Daman"
                ? 300
                : embroidery === "Embroidery Bazo"
                ? 300
                : embroidery === "Embroidery Bottom"
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
        "https://pickandstitches-deployment-server.onrender.com/api/ladies";
      const response = await axios.post(orderApiUrl, orderData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Thank You! Your Order Has Been Placed Successfully!");
        setShowAlert(true);
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
    <section id="LadiesCheckOut">
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
              <img src={image} alt="Image" style={{ width: 200 }} />
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
                            <td className="px-5">Rs.{basePrice}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Piko:</td>
                            <td className="px-5">
                              {piko || "Not selected"} (Rs.
                              {piko === "Piko Full"
                                ? pikoFull
                                : piko === "Piko Half"
                                ? pikoHalf
                                : 0}
                              )
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Dupatta:</td>
                            <td className="px-5">
                              {dupatta || "Not selected"} (Rs.
                              {dupatta === "Dupatta Piping"
                                ? dupattaPiping
                                : dupatta === "Dupatta Extension"
                                ? dupattaExtension
                                : dupatta === "Dupatta Fetta"
                                ? dupattaFetta
                                : 0}
                              )
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Top:</td>
                            <td className="px-5">
                              {top || "Not selected"} (Rs.
                              {top === "Full Top Piping"
                                ? fullTopPiping
                                : top === "Full Top Extension"
                                ? fullTopExtension
                                : top === "Full Top Fetta"
                                ? fullTopFetta
                                : 0}
                              )
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Embroidery:</td>
                            <td className="px-5">
                              {embroidery || "Not selected"} (Rs.
                              {embroidery === "Embroidery Galla"
                                ? embroideryGalla
                                : embroidery === "Embroidery Daman"
                                ? embroideryDaman
                                : embroidery === "Embroidery Bazo"
                                ? embroideryBazo
                                : embroidery === "Embroidery Bottom"
                                ? embroideryBottom
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
                        className="ladiesOrderBtn"
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

export default LadiesCheckOut;
