const db = require("../configs/db");

module.exports = {
  getAllProducts: (searchQuery) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM products WHERE LOWER(name) LIKE 
      '%${searchQuery}%'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    }),

  getProduct: (id) =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products where id = '${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    }),

  createProduct: (data) =>
    new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO products (id, name, buyPrice, sellPrice, stock, pic) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.id,
          data.name,
          data.buyPrice,
          data.sellPrice,
          data.stock,
          data.pic,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    }),

  updateProduct: (data) =>
    new Promise((resolve, reject) => {
      db.query(
        `UPDATE products set name=$1, buyPrice=$2, sellPrice=$3, stock=$4, pic=$5 where id=$6`,
        [
          data.name,
          data.buyPrice,
          data.sellPrice,
          data.stock,
          data.pic,
          data.id,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    }),

  deleteProduct: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM products where id = '${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    }),

  checkNameDuplicate: (name) =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM products where name=$1", [name], (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    }),
};
