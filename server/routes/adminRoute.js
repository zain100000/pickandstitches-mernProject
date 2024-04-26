const express = require("express");
const { check } = require("express-validator");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Public routes
router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  adminController.signup
);

module.exports = router;
