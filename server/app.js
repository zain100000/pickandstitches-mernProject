const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const gentsOrderRoutes = require("./routes/gentsOrderRoute");
const ladiesOrderRoutes = require("./routes/ladiesOrderRoute");
const adminRoute = require("./routes/adminRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const productRoutes = require("./routes/productRoute");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/gents", gentsOrderRoutes);
app.use("/api/ladies", ladiesOrderRoutes);

app.use("/api/admin", adminRoute);
app.use("/api/feedback", feedbackRoute);

app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
