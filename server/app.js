const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const gentsOrderRoutes = require("./routes/gentsOrderRoute");
const ladiesOrderRoutes = require("./routes/ladiesOrderRoute");
const feedbackRoutes = require("./routes/feedbackRoute");
const adminRoutes = require("./routes/adminRoute");
const productRoutes = require("./routes/productRoute");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/admin", adminRoutes);
app.use("/api/gents", gentsOrderRoutes);
app.use("/api/ladies", ladiesOrderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
