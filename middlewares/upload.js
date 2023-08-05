const multer = require("multer");
const path = require("path");

const multerUpload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".png" || ext === ".PNG" || ext === ".JPG") {
      cb(null, true);
    } else {
      const error = {
        message: "File must be jpg or png",
      };
      cb(error, false);
    }
  },
  limits: {
    files: 1,
    fileSize: 100000,
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("pic");
  multerSingle(req, res, (err) => {
    if (err) {
      let errorMessage = err.message;
      if (err.code === "LIMIT_FILE_SIZE") {
        errorMessage = `File ${err.field} too large, max 100kb`;
      }

      return errorMessage;
    } else {
      next();
    }
  });
};

module.exports = upload;
