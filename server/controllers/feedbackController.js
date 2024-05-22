const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const FeedBack = require("../models/feedbackModel");

const createFeedBack = async (req, res, next) => {
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
  } catch (err) {
    console.error("Error creating feedback:", err);
    const error = new HttpError("Failed To Create Feedback!", 500);
    return next(error);
  }
};

const getFeedBack = async (req, res, next) => {
  try {
    const feedback = await FeedBack.find();

    if (!feedback) {
      return res.status(404).json({ message: "No FeedBack Yet!" });
    }

    res.status(200).json({ feedback });
  } catch (err) {
    console.error("Error fetching feedback:", err);
    const error = new HttpError("Failed To Get Feedback!", 500);
    return next(error);
  }
};

const getFeedBackById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await FeedBack.findById(id);

    if (!feedback) {
      return res
        .status(404)
        .json({ message: "FeedBack not found for Provided Id" });
    }

    res.status(200).json({ feedback });
  } catch (err) {
    console.error("Error fetching feedback by ID:", err);
    const error = new HttpError("FeedBack Not Found By Provided Id!", 500);
    return next(error);
  }
};

const deleteFeedBack = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid FeedBack ID" });
  }

  let feedback;
  try {
    feedback = await FeedBack.findById(id);
  } catch (err) {
    console.error("Error finding feedback for deletion:", err);
    const error = new HttpError("Failed To Delete FeedBack!", 500);
    return next(error);
  }

  if (!feedback) {
    return res.status(404).json({ message: "FeedBack not found." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await FeedBack.deleteOne({ _id: id }, { session });

    await session.commitTransaction();
    res.status(200).json({ message: "FeedBack Deleted Successfully." });
  } catch (err) {
    await session.abortTransaction();
    console.error("Error deleting feedback:", err);
    const error = new HttpError("Failed To Delete FeedBack!", 500);
    return next(error);
  } finally {
    session.endSession();
  }
};

module.exports = {
  createFeedBack,
  getFeedBack,
  getFeedBackById,
  deleteFeedBack,
};
