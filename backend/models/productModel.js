const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      default: "N/A",
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    genre: {
      type: String,
      default: "N/A",
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      default: 0,
      trim: true,
      validate: {
        validator: (value) => value >= -999 && value <= 999, // Custom validation for quantity range
        message: "Quantity must be between -999 and 999",
      },
    },
    price: {
      type: Number,
      default: 0,
      trim: true,
    },
    series: {
      type: String,
      default: "N/A",
      trim: true,
    },
    serialnumber: {
      type: Number,
      default: 0,
      trim: true,
    },
    primaryauthor: {
      type: String,
      default: "N/A",
      trim: true,
    },
    secondaryauthor: {
      type: String,
      default: "N/A",
      trim: true,
    },
    editor: {
      type: String,
      default: "N/A",
      trim: true,
    },
    publisher: {
      type: String,
      default: "N/A",
      trim: true,
    },
    edition: {
      type: String,
      default: "N/A",
      trim: true,
    },
    description: {
      type: String,
      default: "N/A",
      trim: true,
    },
    condition: {
      type: String,
      default: "N/A",
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;