const { check } = require("express-validator");

const product = [
  // name
  check("name", "Name required").not().isEmpty(),
  // buyPrice
  check("buyPrice", "Buying Price required").not().isEmpty(),
  check("buyPrice", "Value must be a number").isNumeric(),
  // sellPrice
  check("sellPrice", "Selling Price required").not().isEmpty(),
  check("sellPrice", "Value must be a number").isNumeric(),
  // stock
  check("stock", "Stock required").not().isEmpty(),
  check("stock", "Value must be a number").isNumeric(),

  check("pic", "Image required").not().isEmpty(),
];

module.exports = {
  product,
};
