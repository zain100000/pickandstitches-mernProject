// const mongoose = require("mongoose");
// const fs = require("fs").promises;
// const path = require("path");
// const { validationResult } = require("express-validator");
// const HttpError = require("../models/http-error");
// const LadiesOrder = require("../models/ladiesOrderModel");

// exports.createLadiesOrder = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }
//   try {
//     const {
//       image,
//       product,
//       name,
//       mobile,
//       address,
//       comment,
//       type,
//       price,
//       piko,
//       dupatta,
//       top,
//       embroidery,
//       deliverycharges,
//       total,
//       availTime,
//       date,
//       time,
//     } = req.body;

//     const ladiesOrder = new LadiesOrder({
//       image,
//       product,
//       name,
//       mobile,
//       address,
//       comment,
//       type,
//       price,
//       piko,
//       dupatta,
//       top,
//       embroidery,
//       deliverycharges,
//       total,
//       availTime,
//       samples: req.file ? req.file.path.replace(/\\/g, "/") : "",
//       date,
//       time,
//     });

//     await ladiesOrder.save();
//     res.status(201).json({ message: "Ladies Order created successfully" });
//   } catch (err) {
//     const error = new HttpError("Failed To Create Ladies Order!", 500);
//     return next(error);
//   }
// };

// exports.getLadiesOrder = async (req, res, next) => {
//   try {
//     const ladiesOrder = await LadiesOrder.find();

//     if (!ladiesOrder) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No Ladies Orders Yet!" });
//     }

//     res.status(200).json({ LadiesOrder: ladiesOrder });
//   } catch (err) {
//     const error = new HttpError("Failed To Get Ladies Order!", 500);
//     return next(error);
//   }
// };

// exports.getLadiesOrderById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const ladiesOrder = await LadiesOrder.findById(id);

//     if (!ladiesOrder) {
//       return res
//         .status(404)
//         .json({ message: "Ladies Order not found for Provided Id" });
//     }

//     res.status(200).json({ LadiesOrder: ladiesOrder });
//   } catch (err) {
//     const error = new HttpError("Ladies Order Not Found By Provided Id!", 500);
//     return next(error);
//   }
// };

// exports.getLadiesOrderSample = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const ladiesOrder = await LadiesOrder.findById(id);

//     if (!ladiesOrder || !ladiesOrder.samples) {
//       return res.status(404).json({ message: "Samples not found." });
//     }

//     // Set the correct Content-Type header
//     res.set("Content-Type", "image/jpeg"); // Adjust based on the actual image type

//     // Use path.join to create an absolute path
//     const absolutePath = path.join(__dirname, "..", ladiesOrder.samples);

//     // Send the samples file as an image
//     res.sendFile(absolutePath);
//   } catch (error) {
//     console.error("Error fetching LadiesOrder samples:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.updateLadiesOrder = async (req, res, next) => {
//   const { product_pic, product, price } = req.body;
//   const Id = req.params.id;

//   let ladies;
//   try {
//     ladies = await LadiesOrder.findById(Id);
//   } catch (err) {
//     return next(err);
//   }

//   ladies.product_pic = product_pic;
//   ladies.product = product;
//   ladies.price = price;

//   try {
//     await ladies.save();
//   } catch (err) {
//     return next(err);
//   }

//   res.status(200).json({ ladies: ladies.toObject({ getters: true }) });
// };

// exports.deleteLadiesOrder = async (req, res, next) => {
//   const Id = req.params.id;

//   // Check if the id is undefined or falsy
//   if (!Id) {
//     return res.status(400).json({ message: "Invalid Ladies Order ID" });
//   }

//   let ladies;
//   try {
//     ladies = await LadiesOrder.findById(Id).populate("samples");
//   } catch (err) {
//     const error = new HttpError("Failed To Delete Ladies Order!.", 500);
//     return next(error);
//   }

//   if (!ladies) {
//     // Send a response indicating that the Ladies Order was not found
//     return res.status(404).json({ message: "Ladies Order not found." });
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Check if ladies.samples is defined
//     if (ladies.samples) {
//       try {
//         // Use fs.unlink to delete the sample file
//         await fs.unlink(ladies.samples);
//       } catch (err) {
//         console.error("Error deleting sample:", err);
//       }
//     }

//     // Use deleteOne to remove the LadiesOrder
//     await LadiesOrder.deleteOne({ _id: Id }, { session });

//     // Commit the transaction
//     await session.commitTransaction();

//     // Send a success response after the transaction is completed
//     res.status(200).json({ message: "Ladies Order Deleted Successfully." });
//   } catch (err) {
//     // If an error occurs, abort the transaction
//     await session.abortTransaction();

//     // Log the error
//     console.error("Error deleting Ladies Order:", err);

//     // Send an error response
//     res.status(500).json({ message: "Internal Server Error" });
//   } finally {
//     // End the session
//     session.endSession();
//   }
// };

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const LadiesOrder = require("../models/ladiesOrderModel");
const fileUpload = require("../middleware/file-upload");
const { v2: cloudinary } = require("cloudinary");

exports.createLadiesOrder = async (req, res, next) => {
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

    // Upload sample image to Cloudinary
    const sampleUrl = await fileUpload.cloudinaryLadiesUpload(req.file);

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
      samples: sampleUrl, // Store Cloudinary URL
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

exports.getLadiesOrder = async (req, res, next) => {
  try {
    const ladiesOrder = await LadiesOrder.find();

    if (!ladiesOrder) {
      return res.status(404).json({ message: "No Ladies Orders Yet!" });
    }

    // Map each Ladies Orders to include the samples URL
    const ladiesOrderWithSamplesURL = ladiesOrder.map((order) => ({
      ...order.toObject(),
      samples: order.samples ? `/api/ladies/${order._id}/samples` : null,
    }));

    res.status(200).json({ LadiesOrder: ladiesOrderWithSamplesURL });
  } catch {
    const error = new HttpError("Failed To Gets Ladies Order!", 500);
    return next(error);
  }
};

exports.getLadiesOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder) {
      return res
        .status(404)
        .json({ message: "Order not found for Provided Id" });
    }

    // Include the samples URL in the response
    const ladiesOrderWithSamplesURL = {
      ...ladiesOrder.toObject(),
      samples: ladiesOrder.samples ? `/api/ladies/${orderId}/sample` : null,
    };

    res.status(200).json({ LadiesOrders: ladiesOrderWithSamplesURL });
  } catch {
    const error = new HttpError("Order Not Found By Provided Id!.", 500);
    return next(error);
  }
};

exports.getLadiesOrderSample = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder || !ladiesOrder.samples) {
      return res.status(404).json({ message: "Samples not found." });
    }

    // Redirect to the Cloudinary URL for the sample image
    const sampleUrl = ladiesOrder.samples;
    res.redirect(sampleUrl);
  } catch (error) {
    console.error("Error fetching Ladies Order samples:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteLadiesOrder = async (req, res, next) => {
  const orderId = req.params.id;

  // Check if the id is undefined or falsy
  if (!orderId) {
    return res.status(400).json({ message: "Invalid Ladies Order ID" });
  }

  try {
    const ladiesOrder = await LadiesOrder.findById(orderId);

    if (!ladiesOrder) {
      // Send a response indicating that the Ladies Order was not found
      return res.status(404).json({ message: "Ladies Order not found." });
    }

    // Check if ladies Order.samples is defined
    if (ladiesOrder.samples) {
      try {
        // Extract the public ID from the Cloudinary URL
        const publicId = ladiesOrder.samples
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

    // Delete the Ladies Order from MongoDB
    await LadiesOrder.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Ladies Order Deleted Successfully." });
  } catch (error) {
    console.error("Error deleting Ladies Order:", error);
    const err = new HttpError("Failed To Delete Ladies Order!", 500);
    return next(err);
  }
};
