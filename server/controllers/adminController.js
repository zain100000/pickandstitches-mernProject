const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
      const error = new HttpError("Admin Already Exists!");
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({ message: "Admin Created Successfully!" });
  } catch (err) {
    const error = new HttpError("Error Creating Signup!");
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new HttpError("Invalid Credentials!");
      return next(error);
    }

    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          console.error("Error in JWT sign:", err.message);
          const error = new HttpError("Error Generating Token!");
          return next(error);
        }
        console.log("JWT generated successfully");
        res.json({ token });
      }
    );
  } catch (err) {
    const error = new HttpError("Error Logging In!");
    return next(error);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }
    res.json(admin);
  } catch (err) {
    const error = new HttpError("Error Getting Admin!");
    return next(error);
  }
};

const getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }
    res.json(admin);
  } catch (err) {
    console.error("Error in getAdminById:", err.message);
    if (err.kind === "ObjectId") {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }
    const error = new HttpError("Server Error");
    return next(error);
  }
};

module.exports = {
  signup,
  login,
  getAdmin,
  getAdminById,
};
