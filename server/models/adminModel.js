const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
