const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { productRoutes } = require("./routes/realtime.router.js");
const { writeProducts } = require("./controller/product.controller.js");

let { products } = require("./database/products.js");

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/realtimeproducts", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/products", productRoutes(io,products));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("initialData", products);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
