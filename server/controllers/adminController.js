const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const HttpError = require("../models/http-error");

// Signup
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("Signup request received:", email);

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      const error = new HttpError("Admin Already Exists!");
      return next(error);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    admin = new Admin({
      email,
      password: hashedPassword,
    });

    await admin.save();

    const error = new HttpError("Admin Created Successfully!");
    return next(error);
  } catch (err) {
    const error = new HttpError("Error Creating Signup!");
    return next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received:", email);

    // Check if admin exists
    let admin = await Admin.findOne({ email });
    if (!admin) {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new HttpError("Invalid Credentials!");
      return next(error);
    }

    // Create and send JWT
    const payload = {
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) {
          console.error("Error in JWT sign:", err.message);
          throw err;
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

// Get admin profile
const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    const error = new HttpError("Admin Retrieve Successfully!");
    return next(error);
    res.json(admin);
  } catch (err) {
    const error = new HttpError("Error Getting Admin!");
    return next(error);
  }
};

// Get admin by ID
const getAdminById = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }
    console.log("Admin by ID retrieved successfully:", req.params.id);
    res.json(admin);
  } catch (err) {
    console.error("Error in getAdminById:", err.message);
    if (err.kind === "ObjectId") {
      const error = new HttpError("Admin Not Found!");
      return next(error);
    }
    res.status(500).send("Server Error");
  }
};

module.exports = {
  signup,
  login,
  getAdmin,
  getAdminById,
};
