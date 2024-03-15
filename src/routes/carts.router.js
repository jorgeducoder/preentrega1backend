import { Router } from "express";
import { CartManager } from "../manager/CartManager.js";
import { ProductManager } from "../manager/productManager.js";

// Define los nuevos objetos CM y PM con los metodosy datos del json
const CM = new CartManager("./src/cartsaborescaseros.json");

// La nueva clase PM en principio la necesito para ver si el producto que se ingresa para incorporar la carrito esta en la clase productos
const PM = new ProductManager("./src/saborescaseros.json");

// Define los metodos para el router de usuarios
const router = Router();



router.get("/", async (req, res) => {
    const {limit} = req.query;
    
    let carts = await CM.getCarts();
    if (limit) {
       carts = carts.slice(0, limit);
       }
   
    res.send(carts);
});  

router.get('/:cid', async (req, res) => {
    
    let cartId = req.params.cid;
    // Convierto el tipo para que no haya problemas en CartManager con el ===
    const cart = await CM.getCartbyId(parseInt(cartId));
    res.send({cart});
});


router.post("/:cid/productos", async (req, res) => {
    //const { cid, pid } = req.params;
    const { cid } = req.params;
    const { id, quantity } = req.body;
    console.log (cid, id, quantity);
    if (!cid || !id || !quantity )
        
        // No permite crear un carrito sin al menos un producto
        return res.status(400).send({error: "Faltan datos para crear o agregar al carrito"});
    
    const product = await PM.getProductbyId(id)
    if (!product)
    return res.status(404).send({error: "Producto no existe"});

      
     await CM.addCart(cid, id, quantity);

    res.status(201).send({message: "Producto creado correctamente!"});
});



export default router;