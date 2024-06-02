const mongoose = require("mongoose");

const salesSchema = mongoose.Schema(
  {
    totalSales: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
