const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct, sellBook } = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
//router.patch("/:id/sell", sellBook);
router.patch("/:id/sell", (req, res, next) => {
    console.log("PATCH /:id/sell called with id:", req.params.id);
    next();
  }, sellBook);

module.exports = router;
