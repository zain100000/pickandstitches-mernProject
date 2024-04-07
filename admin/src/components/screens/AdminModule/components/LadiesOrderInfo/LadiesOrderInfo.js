import React from "react";
import "../css/LadiesOrderInfo.css";
import { useLocation } from "react-router-dom";

const LadiesOrderInfo = () => {
  const location = useLocation();
  const selectedOrder = location.state?.selectedOrder;

  return (
    <section id="LadiesOrdersInfo">
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
              <img
                src={selectedOrder.image}
                alt="Product Image"
                style={{ width: 200, height: 200, objectFit: "contain" }}
              />
              <h6 className="mt-2">{selectedOrder.product}</h6>
              <div className="imgContainer" style={{ marginTop: 100 }}>
                <h5>Attached Samples</h5>
                {selectedOrder.samples ? (
                  <img
                    src={`https://pickandstitches-deployment-server.onrender.com/api/ladies/${selectedOrder._id}/samples`}
                    style={{ width: 200 }}
                    alt="Sample"
                  />
                ) : (
                  "No Samples Attached!"
                )}
              </div>
            </center>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-8">
            <center>
              <div className="table-responsive-md">
                <table className="table">
                  <tbody>
                    <tr className="table-success">
                      <td>Name:</td>
                      <td className="col-sm-12">{selectedOrder.name}</td>
                      <td>Mobile:</td>
                      <td>{selectedOrder.mobile}</td>
                    </tr>
                    <tr className="table-danger">
                      <td>Address:</td>
                      <td colSpan="3">{selectedOrder.address}</td>
                    </tr>
                    <tr className="table-active">
                      <td>Comment:</td>
                      <td colSpan="3">{selectedOrder.comment}</td>
                    </tr>
                    <tr className="table-danger">
                      <td className="pt-5">Order Items</td>
                      <td colSpan="5" style={{ textAlign: "right" }}>
                        <table>
                          <tr>
                            <td>Product Base Price:</td>
                            <td className="px-5">Rs.{selectedOrder.price}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Piko:</td>
                            <td className="px-5">{selectedOrder.piko}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Dupatta:</td>
                            <td className="px-5">{selectedOrder.dupatta}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Top:</td>
                            <td className="px-5">{selectedOrder.top}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Embroidery:</td>
                            <td className="px-5">{selectedOrder.embroidery}</td>
                            <br />
                          </tr>
                          <tr>
                            <td>Delivery Charges:</td>
                            <td className="px-5">
                              (Rs.{selectedOrder.deliverycharges})
                            </td>
                            <br />
                          </tr>
                          <tr>
                            <td>Total Bill:</td>
                            <td className="px-5">(Rs.{selectedOrder.total})</td>
                            <br />
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr className="table-active">
                      <td>Pickup Time:</td>
                      <td colSpan="3">{selectedOrder.availTime}</td>
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

export default LadiesOrderInfo;
