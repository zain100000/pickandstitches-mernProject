const HttpError = require("../models/http-error");
const Product = require("../models/productModel");
const productfileUpload = require("../middleware/product-file-upload");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");

const addProduct = async (req, res, next) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const { title, price, category } = req.body;

    // Check if req.file exists before passing it to the cloudinaryProductImageUpload function
    if (!req.file) {
      throw new HttpError("No image file provided!", 400);
    }

    // Upload product image to Cloudinary
    const productImgUrl = await productfileUpload.cloudinaryProductImageUpload(
      req.file
    );

    const product = new Product({
      id,
      title,
      price,
      category,
      image: productImgUrl,
    });

    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product Added successfully!" });
  } catch (error) {
    console.error("Error Adding Product:", error);
    const err = new HttpError("Failed To Add Product!", 500);
    return next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).json({ message: "No Products!" });
    }

    res.status(200).json({ Product: product });
  } catch {
    const error = new HttpError("Failed To Get Product!", 500);
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found for Provided Id" });
    }

    res.status(200).json({ Product: product });
  } catch {
    const error = new HttpError("Product Not Found By Provided Id!.", 500);
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  console.log("Received Product ID:", productId); // Log received product ID

  const { title, price, category } = req.body;
  console.log("Received Request Body:", req.body); // Log received request body

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Update product fields
    product.title = title;
    product.price = price;
    product.category = category;

    // Check if a new image is provided
    if (req.file) {
      console.log("Received File:", req.file); // Log received file
      try {
        // Upload new product image to Cloudinary
        const productImgUrl =
          await productfileUpload.cloudinaryProductImageUpload(req.file);

        // Update the product image URL
        product.image = productImgUrl;
      } catch (error) {
        console.error("Error updating product image:", error);
        const err = new HttpError("Failed to update product image", 500);
        return next(err);
      }
    }

    // Save the updated product
    try {
      await product.save();
      console.log(product); // Log product after update
      res
        .status(200)
        .json({ success: true, message: "Product Updated Successfully." });
    } catch (err) {
      console.error("Error Updating Product:", err);
      const error = new HttpError("Failed To Update Product!", 500);
      return next(error);
    }
  } catch (err) {
    console.error("Error finding product:", err);
    const error = new HttpError("Failed To Find Product!", 500);
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  // Check if the id is undefined or falsy
  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  try {
    const product = await Product.findById(productId);

    if (!productId) {
      // Send a response indicating that the Product was not found
      return res.status(404).json({ message: "Product not found." });
    }

    // Check if Product Image is defined
    if (product.image) {
      try {
        // Extract the public ID from the Cloudinary URL
        const publicId = product.image
          .split("/")
          .slice(-3)
          .join("/")
          .split(".")[0];

        // Delete the product image file from Cloudinary
        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
          console.log(`Product Image deleted from Cloudinary: ${publicId}`);
        } else {
          console.error(
            `Failed to delete Product Image from Cloudinary: ${publicId}`
          );
        }
      } catch (err) {
        console.error("Error deleting product image from Cloudinary:", err);
      }
    }

    // Delete the Product from MongoDB
    await Product.deleteOne({ _id: productId });

    res.status(200).json({ message: "Product Deleted Successfully." });
  } catch (error) {
    console.error("Error deleting Product:", error);
    const err = new HttpError("Failed To Delete Product!", 500);
    return next(err);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
