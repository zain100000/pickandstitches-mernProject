const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const FeedBack = require("../models/feedbackModel");

exports.createFeedBack = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  try {
    const { name, email, mobile, subject, message } = req.body;

    const feedback = new FeedBack({
      name,
      email,
      mobile,
      subject,
      message,
    });

    await feedback.save();
    res.status(201).json({ message: "FeedBack Submitted Successfully!" });
  } catch {
    const error = new HttpError("Failed To Create FeeBack!", 500);
    return next(error);
  }
};

exports.getFeedBackById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await FeedBack.findById(id);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: "FeedBack not found for Provided Id" });
    }

    res.status(200).json({ FeedBack: feedback });
  } catch {
    const error = new HttpError("FeedBack Not Found By Provided Id!.", 500);
    return next(error);
  }
};

exports.getFeedBack = async (req, res) => {
  try {
    const feedback = await FeedBack.find();

    if (!feedback) {
      return res.status(404).json({ message: "No FeedBack Yet!" });
    }

    res.status(200).json({ FeedBack: feedback });
  } catch {
    const error = new HttpError("Failed To Gets FeedBack!");
  }
};

exports.deleteFeedBack = async (req, res, next) => {
  const Id = req.params.id;

  // Check if the id is undefined or falsy
  if (!Id) {
    return res.status(400).json({ message: "Invalid FeedBack ID" });
  }

  let feedback;
  try {
    feedback = await FeedBack.findById(Id).populate("name");
  } catch (err) {
    const error = new HttpError("Failed To Delete FeedBack!.", 500);
    return next(error);
  }

  if (!feedback) {
    // Send a response indicating that the FeedBack was not found
    return res.status(404).json({ message: "FeedBack not found." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Use deleteOne to remove the FeedBack
    await FeedBack.deleteOne({ _id: Id }, { session });

    // Commit the transaction
    await session.commitTransaction();

    // Send a success response after the transaction is completed
    res.status(200).json({ message: "FeedBack Deleted Successfully." });
  } catch (err) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();

    // Log the error
    console.error("Error deleting FeedBack:", err);

    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // End the session
    session.endSession();
  }
};
