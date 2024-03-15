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
              

        if(!carts){
          
          // Si no existe el carrito lo creo con su primer producto
          
          const newcart = {
          idcarrito: cid,
          productos: 
            [{
            id: pid,
            quantity: cantidad
            }]
           
          }
              
          // Guardo el nuevo carrito con su primer poducto.
          carts.push(newcart);
          
           try {
                //await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
           
            } catch(e) {
             console.error("Error al agregar el carrito\n", e);

            }  
         }else{

            // Busco si el producto esta en el carrito
             
                        
             const cart = await this.getCartbyId(cid);
             
             console.log("estoy con este cart para agregar o actualizar producto: ", carts);
            if (!cart) {

                const newcart = {
                    idcarrito: cid,
                    productos: 
                      [{
                      id: pid,
                      quantity: cantidad
                      }]
                     
                    }
                        
                    // Guardo el nuevo carrito con su primer poducto.
                    carts.push(newcart);
                    console.log("... y ahora con estos carts: ", carts);
                    try {
                        await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                        //await fs.promises.writeFile(carts, JSON.stringify(carts, null, "\t"));
                   
                    } catch(e) {
                     console.error("Error al agregar el carrito\n", e);
        
                    }  
            }else{
                const productoexiste = cart.productos.find((productos) => productos.id === pid);
                
                if (!productoexiste){
                    const nuevoproducto = {
                    id: pid, 
                    quantity: cantidad};
                    console.log("... y ahora con este carts para agregar un producto: ", carts);

                    cart.productos.push({ nuevoproducto});

                    try {
                        
                        await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                   
                    } catch(e) {
                    
                        console.error("Error al agregar el carrito\n", e);
        
                    }  


                } else {
                   
                    productos.quantity += cantidad;

                    try {
                        
                        await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                   
                    } catch(e) {
                    
                        console.error("Error al agregar el carrito\n", e);
        
                    }  
                }
              }  
            }
        }   
       
    }


//export default CartManager;