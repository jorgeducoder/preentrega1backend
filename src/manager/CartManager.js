import error from "console";
import fs from "fs";


export class CartManager {
    
    constructor(archivo) {
        this.archivo = archivo;
        
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.archivo, "utf-8");
            
            return JSON.parse(carts);
        } catch (error) {
            console.error(error);
            
            return [];
        }
    }


    async getCartbyId(id) {
         
        try{
        // Obtengo todos los carritos
        const carts = await this.getCarts();
        // Busco en los carts el de igual ID con find para que me devuelva el array
       console.log (carts);
       const cart = carts.find((cart) => cart.idcarrito === parseInt(id));
      
        console.log("Estoy con este find: ", cart);

       return cart ?  cart : console.error ("No se encontro el cart con ID: ", id) ;

       } catch (error) {
           console.error ("Error al obtener cart por ID", error);
           
     }}


    async GetId() {
        const carts = await this.getCarts();
        // toma el id del ultimo Cart, por eso el lenght - 1 Los indices comienzan en 0 y el length devuelve la cantidad de elementos
        if(carts.length > 0) {
            return parseInt(carts[carts.length - 1].id + 1);
        }
        // Si no hay ninguno retorna 1 
        return 1;
        }

    async addCart(cid, pid, cantidad) {
        
        const cart = await this.getCartbyId(cid);
        if(!cart){
          this.cart.push(idcarrito);
           try {
                await fs.promises.writeFile(this.archivo, JSON.stringify(cart, null, "\t"));
           
            } catch(e) {
             console.error("Error al agregar el producto\n", e);

            }  
         }else{

            // Busco si el producto esta en el carrito
            const productoencarrito = cart.productos.find((producto) => producto.id = pid);
            
            if (productoencarrito) {
                productoencarrito.quantity += cantidad
            }else{
                cart.productos.push({
                  productos: pid,
                  cantidad, 
                })
            }
         }
        
        }   
        
    }


export default CartManager;