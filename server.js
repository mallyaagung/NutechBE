require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const morgan = require("morgan");
const PORT = process.env.PORT || 3500;
const productsRoute = require("./routes/productsRoute");

app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use(productsRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
