"use strict";

const axios = require("axios");
const productModel = require("../models/product");
const basketModel = require("../models/basket");


function getProductsHandler(req, res) {
    productModel.find({}, function (err, productsData) {
    if (err) {
      console.log("Did not work");
    } else {
      console.log(productsData);
      res.send(productsData);
    }
  });
}

function getBasketHandler(req, res) {
  let username = req.query.username;
  basketModel.find({username:username}, function (err, productsData) {
    if (err) {
      console.log("Did not work");
    } else {
      console.log(productsData);
      res.send(productsData);
    }
  });
}


async function getProductsByTypeHandler(req,res) {
  const type = req.query.type;

productModel.find({ type }, function(err,selectedProducts) {
  if(err) {
    response.send(`Error in getting product info >> ${err}`)
  } else {
    res.send(selectedProducts)
  }
})
}

async function getProductsByCodeHandler(req,res) {
  const code = req.query.code;

productModel.find({ code }, function(err,selectedProducts) {
  if(err) {
    response.send(`Error in getting product info >> ${err}`)
  } else {
    res.send(selectedProducts)
  }
})
}

// ALTERNATIVELY: SEARCH FUNCTION BASED ON USERNAME
//   let username = req.query.username;
//   productModel.find({username:username}, function (err, productsData) {
//     if (err) {
//       console.log("Did not work");
//     } else {
//       console.log(productsData);
//       res.send(productsData);
//     }
//   });


// localhost:3001/products/6398d7d651967507b9fbecea
async function getProductByIdHandler(req, res) {
const specificProduct = await productModel.findById(req.params.id);
res.send(specificProduct);
}

async function addProductHandler(req,res) {
console.log(req.body);
console.log(req.body.name);
const username =  req.body.username;
const name = req.body.name;
const price = req.body.price;
const imageUrl = req.body.imageUrl;
const type = req.body.type;
const quantity = req.body.quantity;
  
let newProduct = await productModel.create({name, price, imageUrl, type, username, quantity});

productModel.find({}, function(err,allProducts) {
  if(err) {
    response.send(`Error in getting products info >> ${err}`)
  } else {
    res.send(allProducts)
  }
})
}

async function addToBasketHandler(req,res) {
console.log(req.body);
console.log(req.body.name);
const username =  req.body.username;
const name = req.body.name;
const code = req.body.code;
const price = req.body.price;
const imageUrl = req.body.imageUrl;
const quantity = req.body.quantity;

let productExists = await basketModel.find({code:code, username:username}); 

if (productExists==0){
    let newBasketItem = await basketModel.create({username, name, code, price, imageUrl, quantity});
    basketModel.find({username:username}, function(err,allProductsInBasket) {
      if(err) {
        response.send(`error in getting products info >> ${err}`)
      } else {
        res.send(allProductsInBasket)
      }
    })
  } else{
    res.send("Product already in the basket!")
  }
}


// localhost:3001/product/6398da68cfbeecf6b97c2848 >> DELETE - using params
async function deleteProductHandler(req,res){
let id = req.params.id;
const username =  req.query.username;

productModel.findByIdAndDelete(id, async function(error, deletedProduct){
  if(error){
    console.log(error);
    res.send(`Error was encountered ${error}`);
  } else {
    console.log(deletedProduct);
    let productsData = await productModel.find({username:username});
    res.send(productsData);
  }
})
};

async function deleteFromBasketHandler(req,res){
let id = req.params.id;
let username = req.query.username;
basketModel.findByIdAndDelete(id, async function(error, deletedProduct){
  if(error){
    console.log(error);
    res.send(`Error was encountered ${error}`);
  } else {
    console.log(deletedProduct);
    let productsData = await basketModel.find({username:username});
    res.send(productsData);
  }
})
};

// localhost:3001/product/6398d7d651967507b9fbecea >> UPDATE (put)
async function updateProductHandler(req,res){
console.log(req.params);
console.log(req.body);
const { name, price, imageUrl, type } = req.body;
const id = req.params.id;
// or const {id} = req.params;
const updatedProduct = await productModel.findByIdAndUpdate(id, { name, price, imageUrl, type, quantity });
console.log(updatedProduct);
let productsData = await productModel.find();
res.send(productsData);
}

async function updateBasketHandler(req,res){
console.log(req.params);
console.log(req.body);
const { quantity } = req.body;
const username = req.body.username;
const id = req.params.id;
// or const {id} = req.params;
const updatedProduct = await basketModel.findByIdAndUpdate(id, { quantity });
console.log(updatedProduct);
let productsData = await basketModel.find({username:username});
res.send(productsData);
}

module.exports = {
  getProductsHandler,
  getBasketHandler,
  getProductsByTypeHandler,
  getProductsByCodeHandler,
  getProductByIdHandler,
  addProductHandler,
  addToBasketHandler,
  deleteProductHandler,
  deleteFromBasketHandler,
  updateProductHandler,
  updateBasketHandler,
};