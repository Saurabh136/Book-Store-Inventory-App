const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    sku,
    genre,
    quantity,
    price,
    series,
    serialnumber,
    primaryauthor,
    secondaryauthor,
    editor,
    publisher,
    edition,
    description,
    condition,
  } = req.body;

  // Validation
  if (!title || !quantity) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "KitabKorner App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    title,
    sku,
    genre,
    quantity,
    price,
    series,
    serialnumber,
    primaryauthor,
    secondaryauthor,
    editor,
    publisher,
    edition,
    description,
    condition,
    image: fileData,
  });

  res.status(201).json(product);
});

// Get all Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.remove();
  res.status(200).json({ message: "Product deleted." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedFields = { ...req.body };

  // Handle Image upload
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "KitabKorner App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    updatedFields.image = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// Sell Book
const sellBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.quantity < quantity) {
    res.status(400);
    throw new Error("Not enough stock available");
  }

  product.quantity -= quantity;
  await product.save();

  res.status(200).json({ message: "Book sold successfully", product });
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  sellBook, // Add sellBook to exports
};

