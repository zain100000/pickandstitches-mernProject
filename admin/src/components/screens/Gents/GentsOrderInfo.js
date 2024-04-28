import React from "react";
import "../css/Gents/GentsOrderInfo.css";
import { useLocation } from "react-router-dom";

const GentsOrderInfo = () => {
  const location = useLocation();
  const { item } = location.state;

  return (
    <section id="GentsOrderInfo">
      <div className="container">
        <div className="row pt-2">
          <div className="col-sm-12 col-md-12 col-lg-3">
            <center>
              <img
                src={item.image}
                alt="Product Image"
                style={{ width: 150 }}
              />
              <h6 className="mt-2">{item.product}</h6>

              {item.samples ? (
                <img
                  src={`https://pickandstitches-deployment-server.onrender.com/api/gents/${item._id}/samples`}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <p>No Samples Attached!</p>
              )}
            </center>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-9">
            <center>
              <div className="table-responsive-md">
                <table className="table">
                  <tbody>
                    <tr className="table-success">
                      <td>Name:</td>
                      <td className="col-sm-12">{item.name}</td>
                      <td>Mobile:</td>
                      <td>{item.mobile}</td>
                    </tr>
                    <tr className="table-danger">
                      <td>Adress:</td>
                      <td colSpan="3">{item.address}</td>
                    </tr>
                    <tr className="table-info">
                      <td>Neck Type:</td>
                      <td>{item.neck || "Not Selected"}</td>
                      <td>Pocket Type:</td>
                      <td>{item.pocket || "Not Selected"}</td>
                    </tr>
                    <tr className="table-warning">
                      <td>Daman Type:</td>
                      <td>{item.daman || "Not Selected"}</td>
                      <td>Wrist Type:</td>
                      <td>{item.wrist || "Not Selected"}</td>
                    </tr>
                    <tr className="table-active">
                      <td>Comment:</td>
                      <td colSpan="3">{item.comment || "No Comments"}</td>
                    </tr>
                    <tr className="table-danger">
                      <td className="pt-5">Order Items</td>
                      <td colSpan="5" style={{ textAlign: "right" }}>
                        <table>
                          <tr>
                            <td>Product Base Price:</td>
                            <td className="px-5">Rs.{item.price}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Leg Opening:</td>
                            <td className="px-5">
                              Rs.{item.legOpening || "Not Selected"}
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Top Stitch:</td>
                            <td className="px-5">
                              Rs.{item.topStitch || "Not Selected"}
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Embroidery:</td>
                            <td className="px-5">
                              Rs.{item.embroidery || "Not Selected"}
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Delivery Charges:</td>
                            <td className="px-5">
                              (Rs.{item.deliverycharges})
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Total Bill:</td>
                            <td className="px-5">(Rs.{item.total})</td>
                            <br />
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </center>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GentsOrderInfo;
