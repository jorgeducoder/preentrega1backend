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
       //const cart = carts.find((cart) => cart.idcarrito === parseInt(id)); lo cambio porque el id de carrito se cambia como string
        const cart = carts.find((cart) => cart.idcarrito == id);
        console.log("Estoy con este find en getCartbyId: ", cart);

       return cart ?  cart : console.error ("No se encontro el cart con ID: ", id) ;

       } catch (error) {
           console.error ("Error al obtener cart por ID", error);
           
     }}

     

     async addCart(cid, pid, cantidad) {
        
       
        //Obtengo todos los carritos para agregarle el nuevo.
        const carts = await this.getCarts();
        // Obtengo el carrito si lo ncuentra
        const cart = await this.getCartbyId(cid);

        if(!cart){
          
          // Si no existe el carrito lo creo con su primer producto
          
          const newcart = {
          idcarrito: cid,
          productos: 
            [{
            id: pid,
            quantity: cantidad
            },]
           
          }
              
          // Guardo el nuevo carrito con su primer poducto.
          carts.push(newcart);
          
           try {
                await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
           
            } catch(e) {
             console.error("Error al agregar el carrito\n", e);

            }  
         }else{

            // Busco si el producto esta en el carrito
             
             //const productosEncarrito = await this.getproductoencarrito(cid)
             //const productoexiste = productosEncarrito.productos.find((p) => p.id === pid);
            
             //const cart = await this.getCartbyId(cid);
             
             console.log("estoy con este cart para agregar o actualizar producto: ", cart);
            
            
             const productoexiste = cart.productos.find((productos) => productos.id === pid);
            
            console.log("Estoy con este producto: ", productoexiste);
            
            if (productoexiste) {
                 
                productoexiste.quantity = productoexiste.quantity + cantidad;
                console.log("Lo actualizo?: ", productoexiste, cantidad);
                // Falta actualiza carts con este producto


            }else{
                
                carts.productos.push({ id:pid, quantty: cantidad});
                 
                              
                try {
                    await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                    console.log("Lo agrego?: ", cart);
               
                } catch(e) {
                 console.error("Error al agregar el en carrito\n", e);
    
                }  
            }
        
        }   
        
    }
}

export default CartManager;