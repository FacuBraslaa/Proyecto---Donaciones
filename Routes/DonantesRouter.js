import express from 'express';
import Donantes from '../Controllers/Donantes.js';

const router = express.Router();

// Crear donante
router.post("", Donantes.createDonante);

// Devolver donante específico
router.get("/:id", Donantes.getDonanteById);

// Editar donante existente
router.put("/:id", Donantes.updateDonante);

// Eliminar donante existente
router.delete("/:id", Donantes.deleteDonante);

// Obtener todos los donantes (función adicional)
router.get("", Donantes.getDonantes);

export default router;
