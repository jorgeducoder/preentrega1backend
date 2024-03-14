import { Router } from "express";
import { CartManager } from "../manager/CartManager.js";
import { ProductManager } from "../manager/ProductManager.js";

const CM = new CartManager("./src/cartsaborescaseros.json");
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


router.post("/", async (req, res) => {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;
    if (!cid || !pid || !cantidad )
    
        // No permite crear un carrito sin al menos un producto
        return res.status(400).send({error: "Faltan datos para crear/agregar al carrito"});
    
    const product = await PM.getProductbyId(pid)
    if (!product)
    return res.status(404).send({error: "Producto no existe"});

      
     await CM.addCart(cid, pid, cantidad);

    res.status(201).send({message: "Producto creado correctamente!"});
});



export default router;