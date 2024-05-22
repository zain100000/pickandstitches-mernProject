const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const ladiesOrderController = require("../controllers/ladiesOrderController");
const cloudinaryUpload = require("../middleware/file-upload");

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

router.get("/:id", ladiesOrderController.getLadiesOrderById);

router.get("/", ladiesOrderController.getLadiesOrder);

router.get("/:id/samples", ladiesOrderController.getLadiesOrderSample);

router.delete("/:id", ladiesOrderController.deleteLadiesOrder);

module.exports = router;
