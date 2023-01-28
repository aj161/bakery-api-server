'use strict';

const express = require("express");
const cors = require ("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const errorHandler = require("./handlers/500");
const notFoundHandler = require("./handlers/404");
const productRoutes = require("./routes/routes");

// Middlewares
app.use(cors());
app.use(express.json());

app.use(productRoutes);
app.use(errorHandler);
app.use('*', notFoundHandler);

console.log(process.env.REACT_APP_DATABASE_URL);
// Collection : Schema and model
// Schema: determine the shape of our data || Blueprint or template for our collection


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});