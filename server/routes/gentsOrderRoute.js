const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const gentsOrderController = require("../controllers/gentsOrderController");
const cloudinaryUpload = require("../middleware/file-upload");

// Route to create a new GentsOrder
router.post(
  "/",
  cloudinaryUpload.upload,

  [
    check("name").not().isEmpty(),
    check("mobile").isLength({ min: 11 }),
    check("address").not().isEmpty(),
  ],
  gentsOrderController.createGentsOrder
);

// Route to get a specific GentsOrder by ID
router.get("/:id", gentsOrderController.getGentsOrderById);

// Route to get GentsOrders
router.get("/", gentsOrderController.getGentsOrder);

// Route to get GentsOrder samples
router.get("/:id/samples", gentsOrderController.getGentsOrderSample);

// Route to delete GentsOrders
router.delete("/:id", gentsOrderController.deleteGentsOrder);

module.exports = router;
