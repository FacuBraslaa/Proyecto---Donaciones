import express from 'express';
import Like from '../Controllers/Like.js';  // Verifica la ruta y el contenido del controlador
import { validarDonanteLogueado } from '../Middlewares/Middlewares.js';

const router = express.Router();


// Devolver donante específico
router.get("/Like/:id", validarDonanteLogueado, Like.getIDDonantes);

// Devolver donante específico
router.get("/Like/:id", Like.getIDlike);

// Devolver donante específico
router.post("/Like/:IDongosc", Like.insertLike);

// Devolver donante específico
router.get("/getlike/", Like.getLikes);


export default router;

