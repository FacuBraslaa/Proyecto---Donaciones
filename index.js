import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});


// Importación de rutas
import DonantesRouter from './Routes/DonantesRouter.js';
// import ongoscRouter from "./Controllers/ongosc"
// import LikeRouter from "./Controllers/Like"
// import OpcionesRouter from "./Controllers/Opciones"

app.use("/Donantes", DonantesRouter);
// app.use("/ongosc", ongoscRouter);
// app.use("/Like", LikeRouter);
// app.use("/Opciones", OpcionesRouter);

// Configurar ERR 404
app.use((req, res, next) => {
    res.status(404).send('Lo siento, no se ha encontrado la página solicitada. ERROR 404');
}); 

// Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
