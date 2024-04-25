const express = require("express");
const { check } = require("express-validator");
const adminController = require("../controllers/adminController");
const checkAuth = require("../middleware/auth");
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
router.post("/login", adminController.login);

// Protected routes
router.get("/getAdmin", checkAuth, adminController.getAdmin);
router.patch("/reset-password", checkAuth, adminController.resetPassword);
router.post("/logout", checkAuth, adminController.logout);

// Unauthorized Access
router.use((req, res) => {
  res.status(401).json({ message: "Unauthorized Access. Please log in." });
});

module.exports = router;
