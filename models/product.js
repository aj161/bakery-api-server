"use strict";

const mongoose = require("./index");

const productSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  imageUrl: String,
  type:String,
  quantity:Number,
});

// Model: creation phase
const productModel = mongoose.model('bakeryProducts', productSchema); //collection called bakeryProducts

// Seed (or populate) our database
function seedProductRange() {
  const baguette = new productModel({
    name: "White baguette",
    code: "w_bag",
    price: "2.9",
    imageUrl: "https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type:"bread",
    quantity:"1",
  })

    const croissant = new productModel({
      name: "French croissant",
      code: "f_cro",
      price: "1.6",
      imageUrl: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type:"pastry",
      quantity:"1",
  })

  const baklava = new productModel({
    name: "Baklava selection",
    code: "b_sel",
    price: "4.9",
    imageUrl: "https://images.pexels.com/photos/7317605/pexels-photo-7317605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: "baklava",
    quantity:"1",
  })

  const brownie = new productModel({
    name: "Triple choocolate brownie",
    code: "t_bro",
    price: "2.5",
    imageUrl: "https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type:"cake",
    quantity:"1",
  });

  baguette.save();
  croissant.save();
  baklava.save();
  brownie.save();
}

//seedProductRange();

module.exports = productModel;
