import express from 'express';
import Opciones from '../Controllers/Opciones.js'; // Asegúrate que el nombre y la ruta del archivo sean correctos
const router = express.Router();

// Crear opción
router.post("/", Opciones.crearOpciones);

// Obtener todos las Opciones 
router.get("/", Opciones.getOpciones);

export default router;
