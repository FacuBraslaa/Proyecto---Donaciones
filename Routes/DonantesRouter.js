import express from "express";
const router = express.Router();
const port = 3000;

import Donantes from "../Controllers/Donantes.js";

app.use(express.json());

// Crear donante
router.post("/registerDonante", Donantes.createDonante);

// Devolver donante específico
router.get("/Donante/:id", Donantes.donantesById);

// Editar donante existente
router.put("/updateDonante/:id", Donantes.updateDonante);

// Eliminar donante existente
router.delete("/deleteDonante/:id", Donantes.deleteDonante);

// Obtener todos los donantes (función adicional)
router.get("/getDonantes", Donantes.getDonantes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

export default router;
