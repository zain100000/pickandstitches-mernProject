const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

adminSchema.methods.generateAuthToken = function (expiresIn = null) {
  let tokenExpiresIn = { expiresIn: "1h" }; // Default expiration: 1 hour

  // If expiresIn is provided, update tokenExpiresIn
  if (expiresIn) {
    tokenExpiresIn = { expiresIn };
  }

  const token = jwt.sign(
    { email: this.email, adminId: this._id },
    process.env.JWT_SECRET,
    tokenExpiresIn // Token expires based on parameter or default 1 hour
  );
  return token;
};

module.exports = mongoose.model("Admin", adminSchema);
