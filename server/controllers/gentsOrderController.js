const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const GentsOrder = require("../models/gentsOrderModel");
const fileUpload = require("../middleware/file-upload");
const { v2: cloudinary } = require("cloudinary");

const createGentsOrder = async (req, res, next) => {
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
      neck,
      pocket,
      daman,
      wrist,
      comment,
      type,
      price,
      legOpening,
      topStitch,
      embroidery,
      deliverycharges,
      total,
      availTime,
      date,
      time,
    } = req.body;

    let sampleUrl;
    if (req.file) {
      sampleUrl = await fileUpload.cloudinaryGentsUpload(req.file);
    }

    const gentsOrder = new GentsOrder({
      image,
      product,
      name,
      mobile,
      address,
      neck,
      pocket,
      daman,
      wrist,
      comment,
      type,
      price,
      legOpening,
      topStitch,
      embroidery,
      deliverycharges,
      total,
      availTime,
      date,
      time,
      samples: sampleUrl,
    });

    await gentsOrder.save();

    const orderId = gentsOrder._id; // Assuming the _id field is used for order identification
    const samplesUrl = `/api/gents/${orderId}/samples`;

    res
      .status(201)
      .json({ message: "Gents Order created successfully!", samplesUrl });
  } catch (error) {
    console.error("Error creating Gents Order:", error);
    const err = new HttpError("Failed To Create Gents Order!", 500);
    return next(err);
  }
};

const getGentsOrder = async (req, res, next) => {
  try {
    const gentsOrder = await GentsOrder.find();

    if (!gentsOrder || gentsOrder.length === 0) {
      return res.status(404).json({ message: "No Gents Orders Yet!" });
    }

    const gentsOrderWithSamplesURL = gentsOrder.map((order) => ({
      ...order.toObject(),
      samples: order.samples ? `/api/gents/${order._id}/samples` : null,
    }));

    res.status(200).json({ GentsOrders: gentsOrderWithSamplesURL });
  } catch (error) {
    console.error("Error fetching Gents Orders:", error);
    const err = new HttpError("Failed To Get Gents Orders!", 500);
    return next(err);
  }
};

const getGentsOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const gentsOrder = await GentsOrder.findById(orderId);

    if (!gentsOrder) {
      return res
        .status(404)
        .json({ message: "Order not found for Provided Id" });
    }

    const gentsOrderWithSamplesURL = {
      ...gentsOrder.toObject(),
      samples: gentsOrder.samples ? `/api/gents/${orderId}/samples` : null,
    };

    res.status(200).json({ GentsOrders: gentsOrderWithSamplesURL });
  } catch (error) {
    console.error("Error fetching Gents Order by ID:", error);
    const err = new HttpError("Order Not Found By Provided Id!", 500);
    return next(err);
  }
};

const getGentsOrderSample = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const gentsOrder = await GentsOrder.findById(orderId);

    if (!gentsOrder || !gentsOrder.samples) {
      return res.status(404).json({ message: "Samples not found." });
    }

    // Redirect to the Cloudinary URL for the sample image
    const sampleUrl = gentsOrder.samples;
    res.redirect(sampleUrl);
  } catch (error) {
    console.error("Error fetching Gents Order samples:", error);
    const err = new HttpError("Internal Server Error", 500);
    return next(err);
  }
};

const deleteGentsOrder = async (req, res, next) => {
  const orderId = req.params.id;

  if (!orderId) {
    return res.status(400).json({ message: "Invalid Gents Order ID" });
  }

  try {
    const gentsOrder = await GentsOrder.findById(orderId);

    if (!gentsOrder) {
      return res.status(404).json({ message: "Gents Order not found." });
    }

    if (gentsOrder.samples) {
      try {
        const publicId = gentsOrder.samples
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

    await GentsOrder.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Gents Order Deleted Successfully." });
  } catch (error) {
    console.error("Error deleting Gents Order:", error);
    const err = new HttpError("Failed To Delete Gents Order!", 500);
    return next(err);
  }
};

module.exports = {
  createGentsOrder,
  getGentsOrder,
  getGentsOrderById,
  getGentsOrderSample,
  deleteGentsOrder,
};
