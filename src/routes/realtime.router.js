const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const { writeProducts } = require("../controller/product.controller.js");

const productRoutes = (io, products) => {
  router.post("/addproduct", (req, res) => {
    let product = req.body;

    if (!product || !product.name) {
      res.status(400).send({ message: "Invalid product data" });
      return;
    }

    product = {
      id: Date.now().toString(),
      ...product,
    };

    products.push(product);
    writeProducts(products);

    io.emit("addProduct", products);
    res.status(201).send({ message: "Product added successfully" });
  });

  router.delete("/deleteproduct/:productId", (req, res) => {
    const { productId } = req.params;

    if (!productId) {
      res.status(404).send({ message: "Not found" });
      return;
    }

    products = products.filter((product) => product.id !== productId);

    writeProducts(products);
    io.emit("updateProducts", products);
    res.status(200).send({ message: "Product deleted successfully" });
  });

  return router;
};

module.exports = { productRoutes };
