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
      default: "N/A" ,
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
      default: "N/A" ,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      default: 0, 
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
      trim: true,
    },
    series: {
      type: String,
      required: [true, "Please add Series name"],
      default: "N/A" ,
      trim: true,      
    },
    serialnumber: {
      type: Number,
      required: [true, "Please add Series Serial number"],
      default: 0,
      trim: true,
    },
    primaryauthor: {
      type: String,
      required: [true, "Please add Primary Author"],
      default: "N/A",
      trim: true, 
    },
    secondaryauthor: {
      type: String,
      required: [true, "Please add a Secondary Author"],
      default: "N/A" ,
      trim: true,
    },
    editor: {
      type: String,
      required: [true, "Please add a Editor"],
      default: "N/A",
      trim: true,
       
    },
    publisher: {
      type: String,
      required: [true, "Please add a Publisher"],
      default: "N/A",
      trim: true,
      
    },
    edition: {
      type: String,
      required: [true, "Please add a Edition"],
      default: "N/A",
      trim: true,
       
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      default: "N/A",
      trim: true,
       
    },
    condition: {
      type: String,
      required: [true, "Please add book condition"],
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
