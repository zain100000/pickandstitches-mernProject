const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const BlacklistedToken = require("../models/blacklisted-token-model");

const getAdmin = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Failed To Get Admin!", 500);
    return next(error);
  }
  res.json({ admin: admin.map((admin) => admin.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Enter Valid Email and Password!" });
  }

  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    return res.status(500).json({ message: "Failed To Signed Up!" });
  }

  if (existingAdmin) {
    return res
      .status(422)
      .json({ message: "Admin Already Exists, Please Login Instead." });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({ message: "Failed to hash password." });
  }

  const createdAdmin = new Admin({
    email,
    password: hashedPassword,
  });

  try {
    await createdAdmin.save();

    // Generate token on successful signup
    const token = jwt.sign(
      { email: createdAdmin.email, adminId: createdAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Signup Successfully!",
      token: token, // Include token in response
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed To Sign Up!" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Failed To Login", 500);
    return next(error);
  }

  if (!existingAdmin) {
    const error = new HttpError("Invalid Credentials", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingAdmin.password);
  } catch (err) {
    const error = new HttpError("Could Not Logged In!", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid Credentials", 401);
    return next(error);
  }

  // Generate token without expiration
  const token = existingAdmin.generateAuthToken();

  res.json({
    message: "Login Successfull",
    token: token,
  });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError("Could Not Create Admin!", 500);
      return next(error);
    }
    admin.password = hashedPassword;
    await admin.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const blacklistedToken = new BlacklistedToken({ token });
  try {
    await blacklistedToken.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to logout" });
  }
};

module.exports = {
  getAdmin,
  signup,
  login,
  resetPassword,
  logout,
};
