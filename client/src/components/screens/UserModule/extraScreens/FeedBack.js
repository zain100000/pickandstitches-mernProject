import React, { useState, useEffect } from "react";
import "./css/ExtraScreens.css";
import axios from "axios";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import FeedBackImg from "../../../../assets/feedbackImg.png";
import Loader from "../../../otherComponents/Loader/Loader";

const FeedBack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Optionally, you can add a cleanup function to scroll to the top when the component is unmounted
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

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

  const handleFeedBack = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const feedbackData = {
        name,
        email,
        mobile,
        subject,
        message,
      };

      const FeedBackApiUrl =
        "https://pickandstitches-deployment-server.onrender.com/api/feedback/uploadFeedBack";
      const response = await axios.post(FeedBackApiUrl, feedbackData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setAlertMessage("Thank You! Your FeedBack Has Been Submit!");
        setShowAlert(true);
      } else {
        setAlertMessage("Error Submitting FeedBack!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Error During Submitting FeedBack!");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="FeedBack">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2 className="text-center feedbackHeading">
              Please Share Your Feelings With Us!
            </h2>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="row mt-5 text-center flex-sm-row-reverse ">
            <div className="order-md-1 col-lg-6 order-lg-2">
              <img
                src={FeedBackImg}
                className="feedback"
                alt="FeedBack Image"
              />
            </div>
            <div className="order-md-2 col-lg-6 order-lg-1">
              <form>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Phone"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <input
                      className="inputField px-3"
                      placeholder="Subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <textarea
                      className="inputField px-3"
                      placeholder="Message"
                      name="message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-lg-12">
                    <button className="feedbackBtn" onClick={handleFeedBack}>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <hr className="seperator w-100" />

      {showAlert &&
        ReactDOM.createPortal(
          <CustomAlert message={alertMessage} onClose={handleAlertClose} />,
          document.body
        )}
    </section>
  );
};

export default FeedBack;
