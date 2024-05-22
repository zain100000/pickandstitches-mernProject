const express = require("express");
const router = express.Router();
const productfileUpload = require("../middleware/product-file-upload");
const productController = require("../controllers/productController");

router.post(
  "/addProduct",
  productfileUpload.upload,
  productController.addProduct
);

router.patch("/updateProduct/:id", productController.updateProduct);

router.get("/getProducts", productController.getProduct);

router.get("/getProducts/:id", productController.getProductById);

router.delete("/removeProduct/:id", productController.deleteProduct);

module.exports = router;
