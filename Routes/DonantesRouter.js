import express from 'express';
import Donantes from '../Controllers/Donantes.js';

const router = express.Router();

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

export default router;
