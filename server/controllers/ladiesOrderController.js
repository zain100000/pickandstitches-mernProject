const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const LadiesOrder = require("../models/ladiesOrderModel");
const fileUpload = require("../middleware/file-upload");
const { v2: cloudinary } = require("cloudinary");

const createLadiesOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  try {
    const {
      image,
      product,
      name,
      mobile,
      address,
      comment,
      type,
      price,
      piko,
      dupatta,
      top,
      embroidery,
      deliverycharges,
      total,
      availTime,
      date,
      time,
    } = req.body;

    let sampleUrl;
    if (req.file) {
      sampleUrl = await fileUpload.cloudinaryLadiesUpload(req.file);
    }

    const ladiesOrder = new LadiesOrder({
      image,
      product,
      name,
      mobile,
      address,
      comment,
      type,
      price,
      piko,
      dupatta,
      top,
      embroidery,
      deliverycharges,
      total,
      availTime,
      samples: sampleUrl,
      date,
      time,
    });

    await ladiesOrder.save();
    res.status(201).json({ message: "Ladies Order created successfully!" });
  } catch (error) {
    console.error("Error creating Ladies Order:", error);
    const err = new HttpError("Failed To Create Ladies Order!", 500);
    return next(err);
  }
};

const getLadiesOrder = async (req, res, next) => {
  try {
    const ladiesOrder = await LadiesOrder.find();

    if (!ladiesOrder || ladiesOrder.length === 0) {
      return res.status(404).json({ message: "No Ladies Orders Yet!" });
    }

    const ladiesOrderWithSamplesURL = ladiesOrder.map((order) => ({
      ...order.toObject(),
      samples: order.samples ? `/api/ladies/${order._id}/samples` : null,
    }));

    res.status(200).json({ LadiesOrder: ladiesOrderWithSamplesURL });
  } catch (error) {
    console.error("Error fetching Ladies Orders:", error);
    const err = new HttpError("Failed To Get Ladies Orders!", 500);
    return next(err);
  }
};

const getLadiesOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder) {
      return res
        .status(404)
        .json({ message: "Order not found for Provided Id" });
    }

    const ladiesOrderWithSamplesURL = {
      ...ladiesOrder.toObject(),
      samples: ladiesOrder.samples ? `/api/ladies/${orderId}/samples` : null,
    };

    res.status(200).json({ LadiesOrders: ladiesOrderWithSamplesURL });
  } catch (error) {
    console.error("Error fetching Ladies Order by ID:", error);
    const err = new HttpError("Order Not Found By Provided Id!", 500);
    return next(err);
  }
};

const getLadiesOrderSample = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder || !ladiesOrder.samples) {
      return res.status(404).json({ message: "Samples not found." });
    }

    const sampleUrl = ladiesOrder.samples;
    res.redirect(sampleUrl);
  } catch (error) {
    console.error("Error fetching Ladies Order samples:", error);
    const err = new HttpError("Internal Server Error", 500);
    return next(err);
  }
};

const deleteLadiesOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return res.status(400).json({ message: "Invalid Ladies Order ID" });
  }

  try {
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder) {
      return res.status(404).json({ message: "Ladies Order not found." });
    }

    if (ladiesOrder.samples) {
      try {
        const publicId = ladiesOrder.samples
          .split("/")
          .slice(-4)
          .join("/")
          .split(".")[0];

        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
        } else {
          console.error(`Failed to delete sample from Cloudinary: ${publicId}`);
        }
      } catch (err) {
        console.error("Error deleting sample from Cloudinary:", err);
      }
    }

    await LadiesOrder.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Ladies Order Deleted Successfully." });
  } catch (error) {
    console.error("Error deleting Ladies Order:", error);
    const err = new HttpError("Failed To Delete Ladies Order!", 500);
    return next(err);
  }
};

module.exports = {
  createLadiesOrder,
  getLadiesOrder,
  getLadiesOrderById,
  getLadiesOrderSample,
  deleteLadiesOrder,
};
