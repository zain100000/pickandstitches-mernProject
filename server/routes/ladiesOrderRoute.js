const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const ladiesOrderController = require("../controllers/ladiesOrderController");
const cloudinaryUpload = require("../middleware/file-upload");

// Route to create a new Ladies Order
router.post(
  "/",
  cloudinaryUpload.upload,
  [
    check("name").not().isEmpty(),
    check("mobile").isLength({ min: 11 }),
    check("address").not().isEmpty(),
  ],
  ladiesOrderController.createLadiesOrder
);

// Route to get a specific Ladies Order by ID
router.get("/:id", ladiesOrderController.getLadiesOrderById);

// Route to get Ladies Orders
router.get("/", ladiesOrderController.getLadiesOrder);

// Route to get Ladies Order samples
router.get("/:id/samples", ladiesOrderController.getLadiesOrderSample);

// Route to delete Ladies Orders
router.delete("/:id", ladiesOrderController.deleteLadiesOrder);

module.exports = router;
