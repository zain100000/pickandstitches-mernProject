const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const GentsOrder = require("../models/gentsOrderModel");
const fileUpload = require("../middleware/file-upload");
const imageUpload = require("../middleware/product-file-upload");
const { v2: cloudinary } = require("cloudinary");

exports.createGentsOrder = async (req, res, next) => {
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

    // Check if req.file exists and upload sample image to Cloudinary if available
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
      samples: sampleUrl, // Store Cloudinary URL if available
      date,
      time,
    });

    await gentsOrder.save();
    res.status(201).json({ message: "Gents Order created successfully!" });
  } catch (error) {
    console.error("Error creating Gents Order:", error);
    const err = new HttpError("Failed To Create Gents Order!", 500);
    return next(err);
  }
};

exports.getGentsOrder = async (req, res, next) => {
  try {
    const gentsOrder = await GentsOrder.find();

    if (!gentsOrder) {
      return res.status(404).json({ message: "No Gents Orders Yet!" });
    }

    // Map each GentsOrder to include the samples URL
    const gentsOrderWithSamplesURL = gentsOrder.map((order) => ({
      ...order.toObject(),
      samples: order.samples ? `/api/gents/${order._id}/samples` : null,
    }));

    res.status(200).json({ GentsOrders: gentsOrderWithSamplesURL });
  } catch {
    const error = new HttpError("Failed To Gets Gents Order!", 500);
    return next(error);
  }
};

exports.getGentsOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const gentsOrder = await GentsOrder.findById(orderId);

    if (!gentsOrder) {
      return res
        .status(404)
        .json({ message: "Order not found for Provided Id" });
    }

    // Include the samples URL in the response
    const gentsOrderWithSamplesURL = {
      ...gentsOrder.toObject(),
      samples: gentsOrder.samples ? `/api/gents/${orderId}/sample` : null,
    };

    res.status(200).json({ GentsOrders: gentsOrderWithSamplesURL });
  } catch {
    const error = new HttpError("Order Not Found By Provided Id!.", 500);
    return next(error);
  }
};

exports.getGentsOrderSample = async (req, res, next) => {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteGentsOrder = async (req, res, next) => {
  const orderId = req.params.id;

  // Check if the id is undefined or falsy
  if (!orderId) {
    return res.status(400).json({ message: "Invalid Gents Order ID" });
  }

  try {
    const gentsOrder = await GentsOrder.findById(orderId);

    if (!gentsOrder) {
      // Send a response indicating that the Gents Order was not found
      return res.status(404).json({ message: "Gents Order not found." });
    }

    // Check if gentsOrder.samples is defined
    if (gentsOrder.samples) {
      try {
        // Extract the public ID from the Cloudinary URL
        const publicId = gentsOrder.samples
          .split("/")
          .slice(-3)
          .join("/")
          .split(".")[0];

        // Delete the sample file from Cloudinary
        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
          console.log(`Sample deleted from Cloudinary: ${publicId}`);
        } else {
          console.error(`Failed to delete sample from Cloudinary: ${publicId}`);
        }
      } catch (err) {
        console.error("Error deleting sample from Cloudinary:", err);
      }
    }

    // Delete the GentsOrder from MongoDB
    await GentsOrder.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Gents Order Deleted Successfully." });
  } catch (error) {
    console.error("Error deleting Gents Order:", error);
    const err = new HttpError("Failed To Delete Gents Order!", 500);
    return next(err);
  }
};
