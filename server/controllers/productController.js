const HttpError = require("../models/http-error");
const Product = require("../models/productModel");
const productfileUpload = require("../middleware/product-file-upload");
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
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product ID" });
  }

  console.log("Received Product ID:", productId);
  console.log("Received Request Body:", req.body);

  try {
    let product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    if (
      req.headers["content-type"] &&
      req.headers["content-type"].includes("application/json")
    ) {
      if (req.body.title) product.title = req.body.title;
      if (req.body.price) product.price = req.body.price;
      if (req.body.category) product.category = req.body.category;

      if (req.file) {
        if (product.image) {
          const publicId = product.image
            .split("/")
            .slice(-4)
            .join("/")
            .split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        const folderPath = "pickandstitches/uploads/images";

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: folderPath,
          unique_filename: false,
        });

        product.image = result.secure_url;
      }
    } else {
      product = { ...product, ...req.body };
    }

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product Updated Successfully." });
    console.log(product);
  } catch (err) {
    console.error("Error updating Product:", err);
    const error = new HttpError("Failed To Update Product!", 500);
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  try {
    const product = await Product.findById(productId);

    if (!productId) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.image) {
      try {
        const publicId = product.image
          .split("/")
          .slice(-4)
          .join("/")
          .split(".")[0];

        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
          console.log(`Product Image deleted from Cloudinary: ${publicId}`);
        } else {
          console.error(
            `Failed to delete Product Image from Cloudinary: ${publicId}`
          );
        }
      } catch (err) {
        console.error("Error deleting Product image from Cloudinary:", err);
      }
    }

    await Product.deleteOne({ _id: productId });

    res.status(200).json({ message: "Product Deleted Successfully." });
  } catch (error) {
    console.log("Error deleting Product:", error);
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
