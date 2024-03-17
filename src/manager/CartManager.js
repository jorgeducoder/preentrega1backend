//import error from "console";
import fs from "fs";

export class CartManager {

    constructor(archivo) {
        this.archivo = archivo;
       

    }

    async getCarts() {
        // Retorna todos los carritos del objeto
       
        try {
            const carts = await fs.promises.readFile(this.archivo, "utf-8");

            return JSON.parse(carts);
        } catch (error) {
            console.error(error);

            return [];
        }
    }


    async getCartbyId(id) {

        try {
            // Obtengo todos los carritos
            const carts = await this.getCarts();
            // Busco en los carts el de igual ID con find para que me devuelva el array
            console.log(carts);
            //const cart = carts.find((cart) => cart.idcarrito === parseInt(id)); lo cambio porque el id de carrito se cambia como string
            const cart = carts.find((cart) => cart.idcarrito == id);
            console.log("Estoy con este find en getCartbyId: ", cart);

            return cart ? cart : console.error("No se encontro el cart con ID: ", id);

        } catch (error) {
            console.error("Error al obtener cart por ID", error);

        }
    }


    async getcartProducts(id) {

        try {
            // Obtengo  todos los carritos
            const carts = await this.getCarts();

            // Busco los productos del carrito con ese id


            const cartp = carts.find((cartp) => (parseInt(cartp.id) === parseInt(id)));
            console.log("Estoy con este find en getCartProducts: ", cartp);
            if (cartp) {
                return cartp.products
                
            }else{
                console.log("Carrito no encontrado buscando sus productos");
            }

           // return cartp.products ? cartp.products : console.error("No se encontro el cart con ID: ", id);

        } catch (error) {
            console.error("Error al obtener cart por ID", error);

        }
    }

    async addCart() {

        const id = await this.GetId();
        const nuevocarrito = { id, products: [] };
        console.log("Este  es el carrito: ", nuevocarrito)
        this.carts = await this.getCarts();
        this.carts.push(nuevocarrito);

        try {
            // this. archivo hace referencia al json, carts es el objeto a guardar, en este caso el objeto carritos
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.carts, null, "\t"));
            return nuevocarrito;
        } catch (e) {
            console.error("Error al agregar el carrito\n", e);

        }
    }



    async addproductCart(cid, pid, cantidad) {
        //Traigo todos los carritos
        const carts = await this.getCarts()
        // Busco el indice del carrito cid
        const buscoindex = carts.findIndex(cart => cart.id == cid);

        if (buscoindex === -1) {  // Si no encuentro el carrito cid
            console.log("En addproductcart Carrito no encontrado: ", carts);
        } else {  // Si  encuentro el carrito cid

            // traigo los productos del carrito
            const cartProducts = await this.getcartProducts(cid);
            // Busco el indice del producto a agregar actualizar
            
            console.log("Busco el indice de este producto: ", cartProducts);
            const buscoPindex = cartProducts.findIndex(products => parseInt(products.pid) === parseInt(pid));
            console.log("El indice me da: ", buscoPindex);
            if (buscoPindex === -1) { // si no  encuentro el producto pid lo pusheo

                cartProducts.push({ pid, quantity: cantidad })
                
            } else {  // acualizo la cantidad

                cartProducts[buscoPindex].quantity += cantidad;

            }
            //Actualizo los productos en el carrito
            carts[buscoindex].products = cartProducts;
            try {
                // this. archivo hace referencia al json, carts es el objeto a guardar, en este caso el objeto carritos
                await fs.promises.writeFile(this.archivo, JSON.stringify(carts, null, "\t"));
                console.log("Producto agregado/actualizado con exito: ", carts[buscoindex].products);
            } catch (e) {
                console.error("Error al agregar el carrito\n", e);
    
            }


            
        }
    }
    async GetId() {
    
        const carts = await this.getCarts();

        if(carts.length > 0) {
           return parseInt(carts[carts.length - 1].id + 1);
    }
        // Si no hay ninguno retorna 1 
        return 1;
    }


}

    


 