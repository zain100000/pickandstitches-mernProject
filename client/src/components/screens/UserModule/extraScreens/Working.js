import React, {useEffect} from "react";
import Work1 from "../../../../assets/howitwork/01.png";
import Work2 from "../../../../assets/howitwork/02.png";
import Work3 from "../../../../assets/howitwork/03.png";
import Work4 from "../../../../assets/howitwork/04.png";

const Working = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    // Optionally, you can add a cleanup function to scroll to the top when the component is unmounted
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <section id="Working">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2 className="text-center workingHeading">
              How Pick & Stitches Works
            </h2>
            <p className="text-center workingDescription">
              We offer quality & convenient factory finished sewing services for
              man & women. Kurtas, Shalwar Suits & Trousers stitched to
              perfection as per your measurements. We collect your fabric, sew,
              finish & deliver within Islamabad & Rawalpindi.
            </p>
          </div>
        </div>

        <div className="row mt-5 text-center flex-sm-row-reverse ">
          <div className="order-md-1 col-lg-6 order-lg-2">
            <img
              src={Work1}
              className="work1"
              alt="Working Image"             
            />
          </div>
          <div
            className="order-md-2 col-lg-6 order-lg-1"
            style={{ paddingTop: 120 }}
          >
            <div className="row">
              <div className="col-lg-12">
                <h2>01. Place Your Order Online</h2>
              </div>
              <div className="col-lg-12">
                <p style={{ textAlign: "justify" }}>
                  Place your order online or give us a call to schedule a free
                  pickup. We are always ready to serve you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 text-center flex-sm-row-reverse ">
          <div className="order-md-1 col-lg-6 order-lg-1">
            <img
              src={Work2}
              className="work2"
              alt="Working Image"             
            />
          </div>
          <div
            className="order-md-2 col-lg-6 order-lg-2"
            style={{ paddingTop: 120 }}
          >
            <div className="row">
              <div className="col-lg-12">
                <h2>02. Pick Stuff From Your Door Step</h2>
              </div>
              <div className="col-lg-12">
                <p style={{ textAlign: "justify" }}>
                  Your dress material and the sample garment that fits you
                  perfectly will be picked up by our representative as soon as
                  you place an order. Your custom tailored outfit and the sample
                  garment will be properly packaged and securely delivered at
                  your doorstep within 3 to 5 working days. You will avail both
                  pickup and delivery services for free.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 text-center flex-sm-row-reverse ">
          <div className="col-lg-6 order-lg-2">
            <img
              src={Work3}
              className="work3"
              alt="Working Image"             
            />
          </div>
          <div className="col-lg-6 order-lg-1" style={{ paddingTop: 120 }}>
            <div className="row">
              <div className="col-lg-12">
                <h2>03. Stitch Your Stuff</h2>
              </div>
              <div className="col-lg-12">
                <p style={{ textAlign: "justify" }}>
                  Place your order online or give us a call to schedule a free
                  pickup. We are always ready to serve you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 text-center flex-sm-row-reverse ">
          <div className="col-lg-6">
            <img
              src={Work4}
              className="work4"
              alt="Working Image"             
            />
          </div>
          <div className="col-lg-6" style={{ paddingTop: 120 }}>
            <div className="row">
              <div className="col-lg-12">
                <h2>04. Deliver Your Order At Your Door Step</h2>
              </div>
              <div className="col-lg-12">
                <p style={{ textAlign: "justify" }}>
                  Enjoy a hassle-free experience of getting your desired outfit
                  stitched and delivered at your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="seperator w-100" />
    </section>
  );
};

export default Working;
