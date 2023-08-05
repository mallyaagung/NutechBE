const productsModel = require("../models/productsModel");
const { v4: uuidv4 } = require("uuid");
const uploadGoogleDrive = require("../utils/uploadGoogleDrive");

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const { search } = req.query;
      const searchQuery = search || "";

      const result = await productsModel.getAllProducts(searchQuery);
      if (!result.rows?.length) {
        return res.status(400).json({ message: "Product Not Found" });
      }

      res.send(result.rows);
    } catch (err) {
      console.log(err.message);
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await productsModel.getProduct(id);

      res.send(result.rows);
    } catch (err) {
      console.log(err.message);
    }
  },
  createProduct: async (req, res) => {
    try {
      const checkNames = await productsModel.checkNameDuplicate(req.body.name);

      if (checkNames.rowCount) {
        return res.status(409).json({ message: `Product name already exist.` });
      }
      const id = uuidv4();
      const file = req.file;
      let pic = await uploadGoogleDrive(file);
      const data = {
        id,
        name: req.body.name,
        buyPrice: Number(req.body.buyPrice),
        sellPrice: Number(req.body.sellPrice),
        stock: Number(req.body.stock),
        pic: `https://drive.google.com/uc?export=view&id=${pic}`,
      };

      const result = await productsModel.createProduct(data);

      return res.status(200).json({ message: `Create Product Success` });
    } catch (err) {
      console.log(err.message);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const file = req.file;
      let pic = await uploadGoogleDrive(file);
      const id = req.params.id;
      const data = {
        id,
        name: req.body.name,
        buyPrice: Number(req.body.buyPrice),
        sellPrice: Number(req.body.sellPrice),
        stock: Number(req.body.stock),
        pic: `https://drive.google.com/uc?export=view&id=${pic}`,
      };

      const result = await productsModel.updateProduct(data);

      res.status(200).json({ message: `Update Product Success` });
    } catch (err) {
      console.log(err.message);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productsModel.deleteProduct(id);
      if (result) {
        return res.status(200).json({ message: "Product Deleted" });
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = productsController;
