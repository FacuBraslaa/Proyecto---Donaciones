import express from "express";
const router = express.Router();

import Donantes from "../Controllers/Donantes.js";

// Crear donante
router.post("/registerDonante", Donantes.createDonante);

// Devolver todos los donantes
router.get("/allDonantes", Donantes.alldonantes);

// Devolver donante específico
router.get("/Donante/:id", Donantes.idDonantes);

// Editar donante existente
router.put("/updateDonante/:id", Donantes.updateDonante);

// Eliminar donante existente
router.delete("/deleteDonante/:id", Donantes.deleteDonante);

// Ver todos los donantes de un usuario
router.get("/donantesByUser/:id", Donantes.donantesByUser);

// Obtener todos los donantes (función adicional)
router.get("/getDonantes", Donantes.getDonantes);

export default router;
