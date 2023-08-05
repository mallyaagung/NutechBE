const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const upload = require("../middlewares/upload");
const productValidation = require("../utils/productsValidation");
const runValidation = require("../utils/runValidation");

const router = express.Router();

router
  .get("/product", getAllProducts)
  .get("/product/:id", getProductById)
  .post(
    "/product",
    productValidation.product,
    runValidation,
    upload,
    createProduct
  )
  .put(
    "/product/:id",
    productValidation.product,
    runValidation,
    upload,
    updateProduct
  )
  .delete("/product/:id", deleteProduct);

module.exports = router;
