import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/navigation/userNavigation/Header";
import Home from "./components/screens/UserModule/Home";
import GentsProducts from "./components/screens/UserModule/GentsProducts/GentsProducts";
import LadiesProducts from "./components/screens/UserModule/LadiesProducts/LadiesProducts";
import GentsOrderDetails from "./components/otherComponents/GentsProducts/GentsOrderDetails";
import GentsCheckOut from "./components/otherComponents/GentsProducts/GentsCheckOut";
import LadiesOrderDetails from "./components/otherComponents/LadiesProducts/LadiesOrderDetails";
import LadiesCheckOut from "./components/otherComponents/LadiesProducts/LadiesCheckOut";
import Working from "./components/screens/UserModule/extraScreens/Working";
import FeedBack from "./components/screens/UserModule/extraScreens/FeedBack";
import Footer from "./components/navigation/userNavigation/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/gentsProducts"
          element={
            <>
              <Header />
              <GentsProducts />
              <Footer />
            </>
          }
        />
        <Route
          path="/ladiesProducts"
          element={
            <>
              <Header />
              <LadiesProducts />
              <Footer />
            </>
          }
        />
        <Route
          path="/gents-order-details"
          element={
            <>
              <Header />
              <GentsOrderDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/gents-check-out"
          element={
            <>
              <Header />
              <GentsCheckOut />
              <Footer />
            </>
          }
        />
        <Route
          path="/ladies-order-details"
          element={
            <>
              <Header />
              <LadiesOrderDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/ladies-check-out"
          element={
            <>
              <Header />
              <LadiesCheckOut />
              <Footer />
            </>
          }
        />
        <Route
          path="/working"
          element={
            <>
              <Header />
              <Working />
              <Footer />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <Header />
              <FeedBack />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
