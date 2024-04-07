const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  subject: { type: String },
  message: { type: String },
});

const feedback = mongoose.model("FeedBack", feedbackSchema);

module.exports = feedback;
