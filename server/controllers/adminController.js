const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");

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
    console.log(errors.array()); // Log validation errors
    return next(new HttpError("Enter Invalid Inputs!", 422));
  }

  const { email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Failed To Signed Up!.", 500);
    return next(error);
  }

  if (existingAdmin) {
    const error = new HttpError(
      "Admin Already Exists, Please Login Instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could Not Create Admin!", 500);
    return next(error);
  }

  const createdAdmin = new Admin({
    email,
    password: hashedPassword,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError("Failed To Sign Up!", 500);
    return next(error);
  }

  res.status(201).json({
    adminId: createdAdmin.id,
    email: createdAdmin.email,
  });
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
    const error = new HttpError("Could Not Logged In!", 500);
    return next(error);
  }

  res.json({
    adminId: existingAdmin.id,
    email: existingAdmin.email,
  });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    // Check if admin exists
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

    // Update admin's password
    admin.password = hashedPassword;
    await admin.save();

    // Return success message
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to logout" });
    } else {
      res.status(200).json({ message: "Logged out successfully" });
    }
  });
};

exports.getAdmin = getAdmin;
exports.signup = signup;
exports.login = login;
exports.resetPassword = resetPassword;
exports.logout = logout;
