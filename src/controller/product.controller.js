const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../database/products.json");

const readProducts = () => {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

const writeProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf8");
};

module.exports = { readProducts, writeProducts };
