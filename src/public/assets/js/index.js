import { renderProducts } from "./utils.js";
import { socket } from "./socket.js";
import {createPost} from "./utils.js"


const productList = document.getElementById("productList");
const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productValueInput = document.getElementById("productValue");
const productStockInput = document.getElementById("productStock");

socket.on("initialData", (products) => {
  console.log(products)
  renderProducts(products);
});

socket.on("updateProducts", (products) => {
  renderProducts(products);
});

socket.on("addProduct", (products) => {
  renderProducts(products);
});





productForm.onsubmit = (e) => {
  e.preventDefault();

  const urlPost = "http://localhost:3000/api/products/addproduct"

  let productName = productNameInput.value;
  let productValue = productValueInput.value;
  let productStock = productStockInput.value;

  if (productName) {
    const product = {
      id: Date.now().toString(),
      name: productName,
      value: productValue,
      stock: productStock,
    };
    
    createPost(urlPost,product)

    productName = "";
    productValue = "";
    productStock = "";
  }
};
