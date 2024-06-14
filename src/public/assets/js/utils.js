import { socket } from "./socket.js";

const deleteProduct = async (id) => {
  const url_delete = `http://localhost:3000/api/products/deleteproduct/${id}`;

  await deletePost(url_delete);
};

export const renderProducts = (products) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div>
            <h2>Nombre producto: ${product.name}</h2>
            <p>Valor del producto: ${product.value}</p>
            <p>Stock: ${product.stock}</p>
        </div>
        `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = product.id;
    deleteButton.onclick = () => deleteProduct(product.id);

    div.appendChild(deleteButton);

    productList.appendChild(div);
  });
};

async function deletePost(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Success: Resource deleted");
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createPost(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
}
