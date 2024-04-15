import React, { useState, useEffect, useRef } from "react";
import "./css/GentsOrderDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const GentsOrderDetails = () => {
  const location = useLocation();
  const { image, product, price } = location.state;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [neck, setNeck] = useState("");
  const [pocket, setPocket] = useState("");
  const [daman, setDaman] = useState("");
  const [wrist, setWrist] = useState("");
  const [comment, setComment] = useState("");
  const [singleKanta, setSingleKanta] = useState("");
  const [doubleKanta, setDoubleKanta] = useState("");
  const [top_double_stitch, setTopDoubleStitch] = useState("");
  const [embroideryFull, setEmbroideryFull] = useState("");
  const [embroideryNormal, setEmbroideryNormal] = useState("");
  const [availTime, setAvailTime] = useState("");
  const [samples, setSamples] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Optionally, you can add a cleanup function to scroll to the top when the component is unmounted
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  // Declare and initialize refs
  const nameRef = useRef();
  const mobileRef = useRef();
  const addressRef = useRef();

  const ValidInput = () => {
    const namePattern = /^[a-zA-Z\s]*$/;
    const mobilePattern = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    const addressPattern = /^[\w\s,'-]*$/;

    return (
      namePattern.test(name) &&
      mobilePattern.test(mobile) &&
      addressPattern.test(address)
    );
  };

  const validateName = () => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!name.match(regex)) {
      return "Special Characters Not Allowed";
    }
    return "";
  };
  const nameError = validateName();

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const validateMobile = () => {
    if (!mobile) {
      return "";
    }
    const mobileRegex = /^(\+92|92|0)(3\d{2}|\d{2})(\d{7})$/;
    if (!mobileRegex.test(mobile)) {
      return "Invalid Cell Format";
    }
    return "";
  };
  const mobileError = validateMobile();

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const validateAddress = () => {
    if (!address) {
      return "";
    }
    const addressRegex = /^[\w\s,'-]*$/;
    if (!addressRegex.test(address)) {
      return "Invalid Address Format";
    }
    return "";
  };
  const addressError = validateAddress();

  const handleNavigateToCheckOut = (e) => {
    e.preventDefault(e);
    if (!name) {
      alert("Fullname field is empty");
      return;
    }
    if (!mobile) {
      alert("Cell field is empty");
      return;
    }
    if (!address) {
      alert("Address field is empty");
      return;
    }

    if (!ValidInput()) {
      alert("Please fill in the fields correctly");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/gents-check-out", {
        state: {
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
          legOpening: singleKanta
            ? "Single Kanta"
            : doubleKanta
            ? "Double Kanta"
            : "",

          topStitch: top_double_stitch ? "Top Double Stitch" : "",

          embroidery: embroideryFull
            ? "Embroidery Full"
            : embroideryNormal
            ? "Embroidery Normal"
            : "",
          availTime,
          samples,
        },
      });

      setName("");
      setMobile("");
      setAddress("");
      setNeck("");
      setPocket("");
      setDaman("");
      setWrist("");
      setComment("");
      setSingleKanta("");
      setDoubleKanta("");
      setTopDoubleStitch("");
      setEmbroideryFull("");
      setEmbroideryNormal("");
      setAvailTime("");
      setSamples("");
    });
  };

  return (
    <section id="GentsOrderDetails">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 mt-5 text-center">
            <h4>Please Fill Out This Information!</h4>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-3">
            <center>
              <img src={image} alt="Image" style={{ width: 200 }} />
              <h6 className="mt-2">{product}</h6>
            </center>
          </div>
          <div className="col-lg-9">
            <form
              action="/gents-check-out"
              onSubmit={handleNavigateToCheckOut}
              className="p-2 m-2"
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Name:
                  </label>
                  <input
                    className="inputField px-3"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    ref={nameRef}
                  />
                  <span className="text-danger">{nameError}</span>
                </div>
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Mobile:
                  </label>
                  <input
                    className="inputField px-3"
                    placeholder="Mobile#"
                    name="mobile"
                    value={mobile}
                    onChange={handleMobileChange}
                    ref={mobileRef}
                  />
                  <span className="text-danger">{mobileError}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Address:
                  </label>
                  <input
                    className="inputField px-3"
                    placeholder="Complete Address With House No, Street No, City, LandMark(If Possible)!"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                    ref={addressRef}
                  />
                  <span className="text-danger">{addressError}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Select Neck Type:
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      className="form-control px-3"
                      name="neck"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value)}
                    >
                      <option value="">Select Neck Type:</option>
                      <option value="Collar">Collar</option>
                      <option value="Ban">Ban</option>
                      <option value="Ban Round cut">Ban Round cut</option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Select Pocket Type:
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      className="form-control px-3"
                      name="pocket"
                      value={pocket}
                      onChange={(e) => setPocket(e.target.value)}
                    >
                      <option value="">Select Pocket Type:</option>
                      <option value="Front Single">Front Single</option>
                      <option value="Front Double">Front Double</option>
                      <option value="Side Single">Side Single</option>
                      <option value="Side Double">Side Double</option>
                      <option value="Front Single , Side Single">
                        Front Single , Side Single
                      </option>
                      <option value="Front Double , Side Double">
                        Front Double , Side Double
                      </option>
                      <option value="Front Single , Side Double">
                        Front Single , Side Double{" "}
                      </option>
                      <option value="Front Double , Side Single">
                        Front Double , Side Single{" "}
                      </option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Select Daman Type:
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      class="form-control px-3"
                      name="daman"
                      value={daman}
                      onChange={(e) => setDaman(e.target.value)}
                    >
                      <option value="">Select Daman Type:</option>
                      <option value="Round">Round</option>
                      <option value="Straight">Straight</option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Select Wrist Type:
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      class="form-control px-3"
                      name="wrist"
                      value={wrist}
                      onChange={(e) => setWrist(e.target.value)}
                    >
                      <option value="">Select Wrist Type:</option>
                      <option value="Open">Open</option>
                      <option value="Cuff">Cuff</option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Comment:
                  </label>
                  <textarea
                    className="inputField px-3"
                    placeholder="Message"
                    rows={3}
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ fontSize: 16, fontWeight: "500" }}>
                          Leg Opening(Puncha):
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-lg-5 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Single Kanta"
                            checked={singleKanta}
                            onChange={() => {
                              setSingleKanta(!singleKanta);
                              setDoubleKanta(false);
                            }}
                          />
                          <span className="px-2">Single Kanta</span> <br />
                          <span className="px-4">(Rs.100)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-5 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Double Kanta"
                            checked={doubleKanta}
                            onChange={() => {
                              setDoubleKanta(!doubleKanta);
                              setSingleKanta(false);
                            }}
                          />
                          <span className="px-2">Double Kanta</span> <br />
                          <span className="px-4">(Rs.200)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ fontSize: 16, fontWeight: "500" }}>
                          Top Stitch:
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Top Double Stitch"
                            onChange={() =>
                              setTopDoubleStitch(!top_double_stitch)
                            }
                          />
                          <span className="px-2">Top Double Stitch</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ fontSize: 16, fontWeight: "500" }}>
                          Embroidery:
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Full"
                            checked={embroideryFull}
                            onChange={() => {
                              setEmbroideryFull(!embroideryFull);
                              setEmbroideryNormal(false);
                            }}
                          />
                          <span className="px-2">Embroidery Full</span> <br />
                          <span className="px-4">(Rs.500)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Normal"
                            checked={embroideryNormal}
                            onChange={() => {
                              setEmbroideryNormal(!embroideryNormal);
                              setEmbroideryFull(false);
                            }}
                          />
                          <span className="px-2">Embroidery Normal</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Available Time:
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      class="form-control px-2"
                      name="availTime"
                      value={availTime}
                      onChange={(e) => setAvailTime(e.target.value)}
                    >
                      <option value="">
                        Select Available time for picking:
                      </option>
                      <option value="1AM TO 3AM">1AM TO 3AM</option>
                      <option value="3AM TO 5AM">3AM TO 5AM</option>
                      <option value="5AM TO 7AM">5AM TO 7AM</option>
                      <option value="7AM TO 9AM">7AM TO 9AM</option>
                      <option value="9AM TO 12AM">9AM TO 12AM</option>

                      <option value="12AM TO 2PM">12AM TO 2PM</option>
                      <option value="2PM TO 4PM">2PM TO 4PM</option>
                      <option value="4PM TO 6PM">4PM TO 6PM</option>
                      <option value="6PM TO 8PM">6PM TO 8PM</option>
                      <option value="8PM TO 10PM">8PM TO 10PM</option>
                      <option value="10PM TO 12PM">10PM TO 12PM</option>
                    </select>
                    <i
                      className="fas fa-chevron-down"
                      style={{ marginTop: 12, marginLeft: -30 }}
                    ></i>
                  </div>
                </div>

                <div className="col-lg-6 mb-3">
                  <label
                    className="mb-2"
                    style={{ fontSize: 16, fontWeight: "500" }}
                  >
                    Any Sample:
                  </label>
                  <div className="sampleField">
                    <input
                      type="file"
                      name="samples"
                      className="px-2"
                      onChange={(e) => setSamples(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>

              <center>
                <div className="row p-2 mt-5">
                  <div className="col-lg-12">
                    {loading ? (
                      <Loader />
                    ) : (
                      <button
                        type="submit"
                        className="gentsOrderBtn"
                        onClick={handleNavigateToCheckOut}
                      >
                        Proceed To CheckOut
                      </button>
                    )}
                  </div>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GentsOrderDetails;
