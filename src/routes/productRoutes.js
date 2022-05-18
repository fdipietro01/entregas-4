const { Router } = require("express");
const productosRouter = Router();
const Contenedor = require("../contenedor/contenedor");

const contenedor = new Contenedor("Mi Contenedor");

productosRouter.get("/", (req, res) => {
    res.send(contenedor.getProducts());
});

productosRouter.get("/:id", (req, res) => {
    const item = contenedor.findProduct(parseInt(req.params.id));
    if (item) res.send({ item });
    else
        res.send({
            error: "Producto no encontrado",
        });
});

productosRouter.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    contenedor.addItem({ title, price, thumbnail });
    res.send(contenedor.productos[contenedor.productos.length - 1]);
});

productosRouter.put("/:id", (req, res) => {
    const update = contenedor.updateProduct(parseInt(req.params.id), req.body);
    update
        ?
        res.send("Producto actualizado") :
        res.send("Identificador no hallado");
});

productosRouter.delete("/:id", (req, res) => {
    const deleted = contenedor.deleteProduct(parseInt(req.params.id));
    deleted
        ?
        res.send("Producto eliminado") :
        res.send("Identificador no hallado");
});

module.exports = productosRouter;