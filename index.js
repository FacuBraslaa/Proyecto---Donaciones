import express from "express"
const app = express();
const port = 3000;


app.use(express.json());

app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

app.listen(3000, ()=>{
    console.log("Mano a Mano app listening in port 3000")
})

//rutas 

import DonantesRouter from './Routes/DonantesRouter.js';
//import ongoscRouter from "./Controllers/ongosc"
//import LikeRouter from "./Controllers/Like"
//import OpcionesRouter from "./Controllers/Opciones"

app.use("/Donantes", DonantesRouter);
// app.use("/ongosc", ongoscRouter);
// app.use("/Like", LikeRouter);
// app.use("/Opciones", OpcionesRouter);

app.get("./Donantes", updateDonante)
app.get("./Donantes", createDonante)
app.get("./Donantes", idDonantes)
app.get("./Donantes", deleteDonante)
app.get("./Donantes", donantesByUser)
app.get("./Donantes", alldonantes)


// Configurar ERR 404
app.use((req, res, next) => {
    res.status(404).send('Lo siento, no se a encontrado la página solicitada. ERROR 404');
});

// Correr servidor local en puerto definido
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});