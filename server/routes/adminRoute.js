const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth/authMiddleware");
const adminController = require("../controllers/adminController");

router.post("/signup", adminController.signup);

router.post("/login", adminController.login);

router.get("/getAdmin", authMiddleware, adminController.getAdmin);

router.get("/getAdmin", authMiddleware, adminController.getAdminById);

module.exports = router;
