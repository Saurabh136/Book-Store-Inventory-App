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
      required: [true, "Please add a genre"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    series: {
      type: String,
      required: [true, "Please add Series name"],
      trim: true,
    },
    serialnumber: {
      type: Number,
      required: [true, "Please add Series Serial number"],
      trim: true,
    },
    primaryauthor: {
      type: String,
      required: [true, "Please add Primary Author"],
      trim: true,
    },
    secondaryauthor: {
      type: String,
      required: [true, "Please add a Secondary Author"],
      trim: true,
    },
    editor: {
      type: String,
      required: [true, "Please add a Editor"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Please add a Publisher"],
      trim: true,
    },
    edition: {
      type: String,
      required: [true, "Please add a Edition"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    condition: {
      type: String,
      required: [true, "Please add book condition"],
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
