const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const gentsOrderController = require("../controllers/gentsOrderController");
const cloudinaryUpload = require("../middleware/file-upload");

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

router.get("/:id", gentsOrderController.getGentsOrderById);

router.get("/", gentsOrderController.getGentsOrder);

router.get("/:id/samples", gentsOrderController.getGentsOrderSample);

router.delete("/:id", gentsOrderController.deleteGentsOrder);

module.exports = router;
