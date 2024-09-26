import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

// Rutas de prueba
app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

// Importación de rutas
import DonantesRouter from './Routes/DonantesRouter.js';
import CategoriaRouter from './Routes/CategoriaRouter.js';
import OngoscRouter from './Routes/OngoscRouter.js'; 
import LikeRouter from './Routes/LikeRouter.js'; 
import OpcionesRouter from './Routes/OpcionesRouter.js';

// Usar las rutas importadas
app.use("/donantes", DonantesRouter);
app.use("/categoria", CategoriaRouter); 
app.use("/ongosc", OngoscRouter); 
app.use("/Like", LikeRouter); 
app.use("/opciones", OpcionesRouter); 

// Manejo de error 404
app.use((req, res) => {
    res.status(404).send('Lo siento, no se ha encontrado la página solicitada. ERROR 404');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
