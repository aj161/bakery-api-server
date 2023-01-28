"use strict";

const mongoose = require("./index");

const basketSchema = new mongoose.Schema({
  username: String,
  name: String,
  code: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
});

// Model: creation phase
const basketModel = mongoose.model('basket', basketSchema);//collection called basket

module.exports = basketModel;