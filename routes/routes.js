'use strict';

const express = require('express');
const productRouter = express.Router();
const cors = require ("cors");

const productHandlers = require("../controllers/functions");

productRouter.get('/', (request, response) => response.status(200).send('API server is live'));
productRouter.get("/products", productHandlers.getProductsHandler);
productRouter.get("/basket", productHandlers.getBasketHandler);
productRouter.get("/products/:id", productHandlers.getProductByIdHandler);
productRouter.get("/productbytype", productHandlers.getProductsByTypeHandler);
productRouter.get("/productbycode", productHandlers.getProductsByCodeHandler);
productRouter.post("/product",cors(), productHandlers.addProductHandler);
productRouter.delete('/product/:id', cors(), productHandlers.deleteProductHandler);
productRouter.put('/product/:id', cors(), productHandlers.updateProductHandler);
productRouter.post('/basket', cors(), productHandlers.addToBasketHandler);
productRouter.put('/basket/:id', cors(), productHandlers.updateBasketHandler);
productRouter.delete('/basket/:id', cors(), productHandlers.deleteFromBasketHandler);


module.exports = productRouter;