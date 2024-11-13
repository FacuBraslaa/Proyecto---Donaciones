import express from 'express';
import Like from '../Controllers/Like.js';  // Verifica la ruta y el contenido del controlador


const router = express.Router();

// Obtener todos los likes
router.get("/", Like.getLikes);

// Devolver el ID del like de un donante específico
router.get("/:IDdonante", Like.getIDdonanteparalike);

// Insertar Like para un donante
router.post("/:IDongosc", Like.insertLike);

// Insertar Like para un donante
router.delete("/:IDdonante", Like.deleteLikeByDonante);

export default router;
