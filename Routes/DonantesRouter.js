import express from "express";
const router = express.Router();

import Donantes from "../Controllers/Donantes.js";

// Crear paciente
router.post("/registerDonante", Donantes.createDonante);

// Devolver todos los pacientes
router.get("/allDonantes", Donantes.alldonantes);

// Devolver paciente especifico
router.get("/Donante/:id", Donantes.idDonantes);

// Editar Paciente Existente
router.put("/updateDonante/:id", Donantes.updateDonante);

// Eliminar Paciente Existente
router.delete("/deleteDonante/:id", Donantes.deleteDonante);

// Ver todos los pacientes de un usuario
router.get("/donantesByUser/:id", Donantes.donantesByUser);

router.get("/getDonantes", Donantes.getDonantes);

export default router;