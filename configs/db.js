const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

module.exports = db;
