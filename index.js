import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Mano a Mano app listening on port ${port}`);
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

// Las siguientes líneas no son necesarias porque las rutas ya están definidas en DonantesRouter
// app.get("./Donantes", updateDonante)
// app.get("./Donantes", createDonante)
// app.get("./Donantes", idDonantes)
// app.get("./Donantes", deleteDonante)
// app.get("./Donantes", donantesByUser)
// app.get("./Donantes", alldonantes)

// Configurar ERR 404
app.use((req, res, next) => {
    res.status(404).send('Lo siento, no se ha encontrado la página solicitada. ERROR 404');
});

// Correr servidor local en puerto definido (se utilizó la variable 'port' en lugar de 'PORT')
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
