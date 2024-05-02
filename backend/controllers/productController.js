const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Sell Book
const sellBook = asyncHandler(async (req, res) => {
  const { title, quantitySold, price } = req.body;

  // Validate request data
  if (!title || !quantitySold || !price) {
    res.status(400).json({ error: "Title, quantity sold, and price are required." });
    return;
  }

  try {
    // Check if the book exists
    let book = await Product.findOne({ title });

    if (!book) {
      // If the book doesn't exist, add a new entry with negative quantity for sale
      book = await Product.create({
        user: req.user.id,
        title,
        quantity: -quantitySold, // Negative quantity for sale
        price,
      });
    } else {
      // If the book exists, update its quantity and price
      book.quantity -= quantitySold; // Reduce quantity for sale
      book.price = price; // Update price
      await book.save();
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
  const { title, sku, genre, quantity, price,series,serialnumber,primaryauthor,secondaryauthor,editor,publisher,edition, description,condition } = req.body;

  //   Validation
  if (!title || !genre || !quantity || !price ) {
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
  // if product doesnt exist
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
  // if product doesnt exist
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
  //const { title, genre, quantity, price,series,serialnumber,primaryauthor,secondaryauthor,editor,publisher,edition, description,condition } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedFields = {};
  if (req.body.title !== undefined) updatedFields.title = req.body.title;
  if (req.body.sku !== undefined) updatedFields.sku = req.body.sku;
  if (req.body.genre !== undefined) updatedFields.genre = req.body.genre;
  if (req.body.quantity !== undefined) updatedFields.quantity = req.body.quantity;
  if (req.body.price !== undefined) updatedFields.price = req.body.price;
  if (req.body.series !== undefined) updatedFields.series = req.body.series;
  if (req.body.serialnumber !== undefined) updatedFields.serialnumber = req.body.serialnumber;
  if (req.body.primaryauthor !== undefined) updatedFields.primaryauthor = req.body.primaryauthor;
  if (req.body.secondaryauthor !== undefined) updatedFields.secondaryauthor = req.body.secondaryauthor;
  if (req.body.editor !== undefined) updatedFields.editor = req.body.editor;
  if (req.body.publisher !== undefined) updatedFields.publisher = req.body.publisher;
  if (req.body.edition !== undefined) updatedFields.edition = req.body.edition;
  if (req.body.description !== undefined) updatedFields.description = req.body.description;
  if (req.body.condition !== undefined) updatedFields.condition = req.body.condition;


  // Handle Image upload
  //let fileData = {};
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

    /*fileData*/updatedFields.image = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    //{ _id: id },
    id,
    { $set: updatedFields },
    // {
    //   title,
    //   genre,
    //   quantity,
    //   price,
    //   series,
    //   serialnumber,
    //   primaryauthor,
    //   secondaryauthor,
    //   editor,
    //   publisher,
    //   edition,
    //   description,
    //   condition,
    //   image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    // },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});





module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  sellBook,
};