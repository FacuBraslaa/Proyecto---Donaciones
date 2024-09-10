import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

// Rutas de prueba
app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

// Importación de rutas
import DonantesRouter from './Routes/DonantesRouter.js';
// import DonacionesRouter from './Routes/DonacionesRouter.js';
// import OngoscRouter from "./Controllers/Ongosc.js"; // Asegúrate de la ruta correcta
// import LikeRouter from "./Controllers/Like.js"; // Asegúrate de la ruta correcta
import OpcionesRouter from './Routes/OpcionesRouter.js';

app.use("/donantes", DonantesRouter);
// app.use("/donaciones", DonacionesRouter);
// app.use("/ongosc", OngoscRouter);
// app.use("/like", LikeRouter); 
app.use("/opciones", OpcionesRouter); 

// Manejo de error 404
app.use((req, res, next) => {
    res.status(404).send('Lo siento, no se ha encontrado la página solicitada. ERROR 404');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
