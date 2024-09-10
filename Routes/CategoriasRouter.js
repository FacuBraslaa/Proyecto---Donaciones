import express from 'express';
import Donantes from '../Controllers/Donantes.js';

const router = express.Router();

// Crear categoria para donante
router.post("/", Donantes.createCategoria);

// Editar categoria del donante
router.put("/:id", Donantes.updateCategoria);

// Obtener todos los donantes con x categoria
router.get("/", Donantes.getDonanteByCategoria);

export default router;