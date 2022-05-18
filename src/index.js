const express = require("express");
const productosRouter = require("./routes/productRoutes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/api/productos", productosRouter);

app.listen(8080, () => {
    console.log("Escuchando en el 8080");
});