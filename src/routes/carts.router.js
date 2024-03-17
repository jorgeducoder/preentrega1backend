import { Router } from "express";
import { CartManager } from "../manager/CartManager.js";
import { ProductManager } from "../manager/productManager.js";

// Define los nuevos objetos CM y PM con los metodosy datos del json
const CM = new CartManager("./src/cartsaborescaseros.json");

// La nueva clase PM en principio la necesito para ver si el producto que se ingresa para incorporar la carrito esta en la clase productos
const PM = new ProductManager("./src/saborescaseros.json");

// Define los metodos para el router de usuarios
const router = Router();

router.post("/", async (req, res) => {
    try {

        const response = await CM.addCart();
        res.json(response);
    } catch (error) {
        res.send("Error al crear carrito")
    }
})




router.get("/", async (req, res) => {
    const { limit } = req.query;

    let carts = await CM.getCarts();
    if (limit) {
        carts = carts.slice(0, limit);
    }

    res.send(carts);
});

router.get('/:cid', async (req, res) => {

    let cartId = req.params.cid;
    const cart = await CM.getcartProducts(cartId);
    res.send({ cart });
});



router.post("/:cid/productos/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    //const { cid } = req.params;
    const { quantity } = req.body;
    console.log(cid, pid);
    if (!cid || !pid || !quantity) 

        // Permite crear un carrito con la cantidad en el body
        return res.status(400).send({ error: "Faltan datos para crear o agregar al carrito" });

    const product = await PM.getProductbyId(pid)
    if (!product)
        return res.status(404).send({ error: "Producto no existe" });

    await CM.addproductCart(cid, pid, quantity);

    res.status(201).send({ message: "Producto creado correctamente!" });
});


export default router;