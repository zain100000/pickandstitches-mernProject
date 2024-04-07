import React from "react";
import AdminSideBar from "../../../navigation/adminNavigation/AdminSideBar";
import { Routes, Route } from "react-router-dom";
import "./css/Admin.css";
import DashBoard from "./DashBoard";
import GentsOrders from "./GentsOrders";
import LadiesOrders from "./LadiesOrders";
import GentsOrderInfo from "./GentsOrderInfo/GentsOrderInfo";
import LadiesOrderInfo from "./LadiesOrderInfo/LadiesOrderInfo";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import ProductInfoUpdate from "./UpdateProductInfo";
import FeedBacks from "./FeedBacks";

const Admin = () => {
  return (
    <section id="Admin">
      <AdminSideBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashBoard />
            </>
          }
        />

        <Route
          path="/admin/gents-orders"
          element={
            <>
              <GentsOrders />
            </>
          }
        />

        <Route
          path="/admin/gents-order-info/:id"
          element={
            <>
              <GentsOrderInfo />
            </>
          }
        />

        <Route
          path="/admin/ladies-orders"
          element={
            <>
              <LadiesOrders />
            </>
          }
        />

        <Route
          path="/admin/ladies-order-info/:id"
          element={
            <>
              <LadiesOrderInfo />
            </>
          }
        />

        <Route
          path="/admin/add-products"
          element={
            <>
              <AddProduct />
            </>
          }
        />

        <Route
          path="/admin/product-list"
          element={
            <>
              <ProductList />
            </>
          }
        />

        <Route
          path="/admin/product-info-update/:id"
          element={
            <>
              <ProductInfoUpdate />
            </>
          }
        />

        <Route
          path="/admin/feedbacks"
          element={
            <>
              <FeedBacks />
            </>
          }
        />
      </Routes>
    </section>
  );
};

export default Admin;
