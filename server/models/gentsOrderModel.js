const mongoose = require("mongoose");

const gentsOrderSchema = new mongoose.Schema({
  image: { type: String },
  product: { type: String },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  neck: { type: String },
  pocket: { type: String },
  daman: { type: String },
  wrist: { type: String },
  comment: { type: String },
  type: { type: String },
  price: { type: String },
  legOpening: { type: String },
  topStitch: { type: String },
  embroidery: { type: String },
  deliverycharges: { type: String },
  total: { type: String },
  availTime: { type: String },
  samples: { type: String },
  date: { type: String },
  time: { type: String },
});

const GentsOrder = mongoose.model("GentsOrder", gentsOrderSchema);

module.exports = GentsOrder;
