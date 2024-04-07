const mongoose = require("mongoose");

const ladiesOrderSchema = new mongoose.Schema({
  image: { type: String },
  product: { type: String },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  comment: { type: String },
  type: { type: String },
  price: { type: String },
  piko: { type: String },
  dupatta: { type: String },
  top: { type: String },
  embroidery: { type: String },
  deliverycharges: { type: String },
  total: { type: String },
  availTime: { type: String },
  samples: { type: String },
  date: { type: String },
  time: { type: String },
});

const LadiesOrder = mongoose.model("LadiesOrder", ladiesOrderSchema);

module.exports = LadiesOrder;
