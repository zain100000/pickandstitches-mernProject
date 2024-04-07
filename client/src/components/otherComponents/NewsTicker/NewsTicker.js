import React, { useState, useEffect } from "react";
import "./NewsTicker.css";

const NewsTicker = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setScrollPosition((prevPosition) => prevPosition - 1);
    }, 80); // Adjust the interval based on your preference

    return () => clearInterval(tickerInterval);
  }, []);

  return (
    <div className="news-ticker-container">
      <div className="heading-container">
        <div className="latest-news-heading">Latest News</div>
      </div>
      <div className="news-container">
        <div
          className="scrolling-news"
          style={{ transform: `translateX(${scrollPosition}%)` }}
        >
          <p>
            Due To Increasing Rates in Petrol The Delivery Charges Will Be
            Applicable From Now And The Delivery Charges Will Be 300 Rs/- Only!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
