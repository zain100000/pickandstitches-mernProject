import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

const Carousel = ({ images, headings, descriptions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <section id="Carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={image}
              alt={`slide-${index}`}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h2 className="flip-in-out heading">{headings[index]}</h2>
              <h2 className="flip-in-out description">{descriptions[index]}</h2>
              <div className="btnContainer">
                <Link to="/gentsProducts" className="flip-in-out btn">
                  Customized Now
                </Link>
                <Link to="/feedBack" className="flip-in-out btn">
                  FeedBack
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
