const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req).array({ onlyFirstError: true });

    // jika validasi gagal
    if (errors.length) {
      console.log(errors);
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
