const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const HttpError = require("../models/http-error");
require("dotenv").config();

// Multer configuration for file upload
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new HttpError("Only images are allowed", 422), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("samples"); // Using the same field name for both gents and ladies

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryGentsUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `pickandstitches/samples/gents`, // Folder name on Cloudinary based on gents/ladies
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new HttpError("Error uploading image to Cloudinary", 500);
  }
};

const cloudinaryLadiesUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `pickandstitches/samples/ladies`, // Folder name on Cloudinary based on gents/ladies
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new HttpError("Error uploading image to Cloudinary", 500);
  }
};

module.exports = {
  upload,
  cloudinaryGentsUpload,
  cloudinaryLadiesUpload,
};
