import React, { useEffect } from "react";
import "./css/Home.css";
import { useNavigate } from "react-router-dom";
import Slider1 from "../../../assets/slider/slider1.jpg";
import Slider2 from "../../../assets/slider/slider2.jpg";
import Slider3 from "../../../assets/slider/slider3.jpg";
import TailorImg from "../../../assets/tailoronline/tailor-online.png";
import GentImg from "../../../assets/men-women-products/men.png";
import LadyImg from "../../../assets/men-women-products/women.png";
import Work1 from "../../../assets/tailorworks/work1.png";
import Work2 from "../../../assets/tailorworks/work2.png";
import Work3 from "../../../assets/tailorworks/work3.png";
import Work4 from "../../../assets/tailorworks/work4.png";
import Carousel from "../../otherComponents/Carousel/Carousel";
import NewsTicker from "../../otherComponents/NewsTicker/NewsTicker";

const Home = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Optionally, you can add a cleanup function to scroll to the top when the component is unmounted
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const navigate = useNavigate();
  const images = [Slider1, Slider2, Slider3];
  const headings = [
    "Design Your Suit Online",
    "Easy Stitching At Your Door Step",
    "Refer Your Friends And Get Reward",
  ];
  const descriptions = [
    "Stitching services at your doorstep - just a click away!",
    "We offer quality & convenient factory finished sewing services for man & women. Kurtas, Shalwar Suits & Trousers stitched to perfection as per your measurements. We collect your fabric, sew, finish & deliver within Islamabad & Rawalpindi.",
    "we offer reward on your refer to your friends and fam",
  ];

  const handleGentsCustomizationNavigation = () => {
    navigate({
      pathname: "/gentsProducts",
    });
  };

  const handleLadiesCustomizationNavigation = () => {
    navigate({
      pathname: "/ladiesProducts",
    });
  };

  const handleWorkingNavigation = () => {
    navigate({
      pathname: "/working",
    });
  };

  return (
    <section id="Home">
      {/* Banner Section */}
      <section id="Banner">
        <Carousel
          images={images}
          headings={headings}
          descriptions={descriptions}
        />
      </section>
      {/* Banner Section */}

      {/* News Ticker Section */}
      <section id="Ticker">
        <NewsTicker />
      </section>
      {/* News Ticker Section */}

      {/* Tailor Online Section */}
      <section id="Tailor">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h2 className="tailorHeading mt-3">Hi! We're Tailor Online</h2>
              <p className="tailorDescription mt-3">
                We offers the modern day woman and man an unparalleled
                made-to-measure online tailoring service. It is an unique
                experience that lets you express your personal sense of style
                without having to worry about design, fit, quality and delivery
                commitment. Offering free pick-up and delivery service in
                Rawalpindi,Islamabad the service provides customizable designs
                in blouses, kurtas, suits and bottoms according to the client's
                individual measurement.
              </p>
              <button
                className="tailorBtn mt-2"
                onClick={handleGentsCustomizationNavigation}
              >
                Start Cutomizing
              </button>
              <button
                className="tailorBtn mt-2"
                onClick={handleWorkingNavigation}
              >
                How We Works!
              </button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 text-center">
              <img src={TailorImg} className="tailorImg" alt="Tailor Image" />
            </div>
          </div>
        </div>
      </section>
      {/* Tailor Online Section */}

      {/* Gents+Ladies Products Section */}
      <section id="GLProducts">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-12 col-md-6 col-lg-6 gentsProductsContainer">
              <img
                src={GentImg}
                className="gentImg"
                alt="Gent Image"
                style={{ width: 350 }}
              />
              <button
                className="glProductsBtn"
                onClick={handleGentsCustomizationNavigation}
              >
                Gents Products
              </button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 ladiesProductsContainer">
              <img
                src={LadyImg}
                className="ladyImg"
                alt="Lady Image"
                style={{ width: 380 }}
              />
              <button
                className="glProductsBtn"
                onClick={handleLadiesCustomizationNavigation}
              >
                Ladies Products
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Gents+Ladies Products Section */}

      {/* TailorWorks Section */}
      <section id="TailorWorking">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-sm-12 col-md-12 col-lg-12 text-center"
              style={{ marginTop: 100 }}
            >
              <h1>How It Works!</h1>
            </div>
          </div>
          <div className="row mt-5 text-center">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <img
                src={Work1}
                className="Work 1"
                alt="Work Image"
                style={{ width: 150 }}
              />
              <h6 className="mt-3 text-center">
                CUSTOMISE & PLACE ORDER ONLINE
              </h6>
              <p className="mt-3">
                Choose your product and personalise it with custom necklines,
                sleeves etc.
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <img
                src={Work2}
                className="Work 2"
                alt="Work Image"
                style={{ width: 150 }}
              />
              <h6 className="mt-3 text-center">
                GIVE US YOUR MEASUREMENT GARMENT
              </h6>
              <p className="mt-3">
                While we pickup your dress material, give us a perfectly fitting
                garment to stitch as per your measurements.
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <img
                src={Work3}
                className="Work 3"
                alt="Work Image"
                style={{ width: 150 }}
              />
              <h6 className="mt-3 text-center">
                3 To 5 DAYS TO STITCH & DELIVER
              </h6>
              <p className="mt-4">
                Each material is individually hand-cut, stitched and finished by
                professional tailors and delivered at your doorstep.
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <img
                src={Work4}
                className="Work 4"
                alt="Work Image"
                style={{ width: 150 }}
              />
              <h6 className="mt-3 text-center">PAY ON DELIVERY</h6>
              <p className="mt-4">
                Pay by cash after you receive your newly stitched outfit along
                with the measurement garment.
              </p>
            </div>
          </div>
        </div>
        {/* TailorWorks Section */}
      </section>
      {/* TailorWorks Section */}

      <hr
        className="seperator"
        style={{ color: "green", fontWeight: "bold" }}
      />
    </section>
  );
};

export default Home;
