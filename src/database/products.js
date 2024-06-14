const { readProducts } = require("../controller/product.controller.js");

let products = readProducts();

module.exports = { products };
