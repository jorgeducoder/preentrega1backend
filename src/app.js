import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

// agrego el start en el JSON  para ejecutar el proyecto con npm start
//"start": "nodemon src/app.js"


const app = express();

// Estos son midleware de express 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Este  midleware para trabajar con las imagenes si utilizo multer

app.use(express.static("public"));

//Use routers se declaran los routers

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});