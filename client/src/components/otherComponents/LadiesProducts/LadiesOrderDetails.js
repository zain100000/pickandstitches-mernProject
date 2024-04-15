import React, { useState, useEffect, useRef } from "react";
import "./css/LadiesOrderDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const LadiesOrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, product } = location.state;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [pikoFull, setPikoFull] = useState(false);
  const [pikoHalf, setPikoHalf] = useState(false);
  const [dupattaPiping, setDupattaPiping] = useState(false);
  const [dupattaExtension, setDupattaExtension] = useState(false);
  const [dupattaFetta, setDupattaFetta] = useState(false);
  const [fullTopPiping, setFullTopPiping] = useState(false);
  const [fullTopExtension, setFullTopExtension] = useState(false);
  const [fullTopFetta, setFullTopFetta] = useState(false);
  const [embroideryGalla, setEmbroideryGalla] = useState(false);
  const [embroideryDaman, setEmbroideryDaman] = useState(false);
  const [embroideryBazo, setEmbroideryBazo] = useState(false);
  const [embroideryBottom, setEmbroideryBottom] = useState(false);
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
      navigate("/ladies-check-out", {
        state: {
          image: location.state?.image || "",
          product: location.state?.product || "",
          name,
          mobile,
          address,
          comment,
          price: location.state?.price || "",
          piko: pikoFull ? "Piko Full" : pikoHalf ? "Piko Half" : "",

          dupatta: dupattaPiping
            ? "Dupatta Piping"
            : dupattaExtension
            ? "Dupatta Extension"
            : dupattaFetta
            ? "Dupatta Fetta"
            : "",

          top: fullTopPiping
            ? "Full Top Piping"
            : fullTopExtension
            ? "Full Top Extension"
            : fullTopFetta
            ? "Full Top Fetta"
            : "",

          embroidery: embroideryGalla
            ? "Embroidery Galla"
            : embroideryDaman
            ? "Embroidery Daman"
            : embroideryBazo
            ? "Embroidery Bazo"
            : embroideryBottom
            ? "Embroidery Bottom"
            : "",
          availTime,
          samples,
        },
      });

      setName("");
      setMobile("");
      setAddress("");
      setComment("");
      setPikoFull("");
      setPikoHalf("");
      setDupattaPiping(false);
      setDupattaExtension(false);
      setDupattaFetta(false);
      setFullTopPiping(false);
      setFullTopExtension(false);
      setFullTopFetta(false);
      setEmbroideryGalla(false);
      setEmbroideryDaman(false);
      setEmbroideryBazo(false);
      setEmbroideryBottom(false);
      setAvailTime("");
      setSamples("");
    });
  };

  return (
    <section id="LadiesOrderDetails">
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
              action="/ladies-check-out"
              onSubmit={handleNavigateToCheckOut}
              className="p-2 m-2"
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
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ fontSize: 16, fontWeight: "500" }}>
                          Piko:
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-lg-5 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Piko Full"
                            checked={pikoFull}
                            onChange={() => {
                              setPikoFull(!pikoFull);
                              setPikoHalf(false);
                            }}
                          />
                          <span className="px-2">Piko Full</span> <br />
                          <span className="px-4">(Rs.120)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-5 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Piko Half"
                            checked={pikoHalf}
                            onChange={() => {
                              setPikoHalf(!pikoHalf);
                              setPikoFull(false);
                            }}
                          />
                          <span className="px-2">Piko Half</span> <br />
                          <span className="px-4">(Rs.60)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 mb-3">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-12">
                        <label style={{ fontSize: 16, fontWeight: "500" }}>
                          Dupatta:
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Dupatta Piping"
                            checked={dupattaPiping}
                            onChange={() => {
                              setDupattaPiping(!dupattaPiping);
                              setDupattaExtension(false);
                              setDupattaFetta(false);
                            }}
                          />
                          <span className="px-2">Dupatta Piping</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Dupatta Extension"
                            checked={dupattaExtension}
                            onChange={() => {
                              setDupattaExtension(!dupattaExtension);
                              setDupattaPiping(false);
                              setDupattaFetta(false);
                            }}
                          />
                          <span className="px-2">Dupatta Extension</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Dupatta Fetta"
                            checked={dupattaFetta}
                            onChange={() => {
                              setDupattaFetta(!dupattaFetta);
                              setDupattaExtension(false);
                              setDupattaPiping(false);
                            }}
                          />
                          <span className="px-2">Dupatta Fetta</span> <br />
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
                          Top:
                        </label>
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Full Top Piping"
                            checked={fullTopPiping}
                            onChange={() => {
                              setFullTopPiping(!fullTopPiping);
                              setFullTopExtension(false);
                              setFullTopFetta(false);
                            }}
                          />
                          <span className="px-2">Full Top Piping</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Full Top Extension"
                            checked={fullTopExtension}
                            onChange={() => {
                              setFullTopExtension(!fullTopExtension);
                              setFullTopPiping(false);
                              setFullTopFetta(false);
                            }}
                          />
                          <span className="px-2">Full Top Extension</span>{" "}
                          <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Full Top Fetta"
                            checked={fullTopFetta}
                            onChange={() => {
                              setFullTopFetta(!fullTopFetta);
                              setFullTopPiping(false);
                              setFullTopExtension(false);
                            }}
                          />
                          <span className="px-2">Full Top Fetta</span> <br />
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
                      <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Galla"
                            checked={embroideryGalla}
                            onChange={() => {
                              setEmbroideryGalla(!embroideryGalla);
                              setEmbroideryDaman(false);
                              setEmbroideryBazo(false);
                              setEmbroideryBottom(false);
                            }}
                          />
                          <span className="px-2">Galla</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Daman"
                            checked={embroideryDaman}
                            onChange={() => {
                              setEmbroideryDaman(!embroideryDaman);
                              setEmbroideryGalla(false);
                              setEmbroideryBazo(false);
                              setEmbroideryBottom(false);
                            }}
                          />
                          <span className="px-2">Daman</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Bazo"
                            checked={embroideryBazo}
                            onChange={() => {
                              setEmbroideryBazo(!embroideryBazo);
                              setEmbroideryGalla(false);
                              setEmbroideryDaman(false);
                              setEmbroideryBottom(false);
                            }}
                          />
                          <span className="px-2">Bazo</span> <br />
                          <span className="px-4">(Rs.300)</span>
                        </label>
                      </div>
                      <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            name="Embroidery Bottom"
                            checked={embroideryBottom}
                            onChange={() => {
                              setEmbroideryBottom(!embroideryBottom);
                              setEmbroideryGalla(false);
                              setEmbroideryDaman(false);
                              setEmbroideryBazo(false);
                            }}
                          />
                          <span className="px-2">Bottom</span> <br />
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
                      multiple
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
                        className="ladiesOrderBtn"
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

export default LadiesOrderDetails;
