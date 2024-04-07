const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  adminController.signup
);
router.post("/login", adminController.login);

router.get("/", adminController.getAdmin);

router.patch("/reset-password", adminController.resetPassword);

router.post("/logout", adminController.logout);

module.exports = router;
