const Admin = require("../models/adminModel");
const HttpError = require("../models/http-error");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      email,
      password: hashedPassword,
    });
    const newAdmin = await admin.save();
    res
      .status(201)
      .json({ message: "Admin Created Successfully", admin: newAdmin });
  } catch (err) {
    const error = new HttpError("Failed To Signup!", 400);
    return next(error);
  }
};

module.exports = {
  signup,
};
