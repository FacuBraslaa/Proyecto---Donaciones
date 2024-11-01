import express from 'express';
import Donaciones from '../Controllers/Donaciones.js';  // Verifica la ruta y el contenido del controlador
import { validarDonanteLogueado } from '../Middlewares/Middlewares.js';
import { validarOngoscLogueado } from '../Middlewares/Middlewares.js';
const router = express.Router();

// Devolver ongosc específico
router.get("/Donaciones/:id", validarOngoscLogueado, Donaciones.getIDOngosc);

// Devolver donante específico
router.get("/Donaciones/:id",validarDonanteLogueado, Donaciones.getIDDonantes);

// Devolver donante específico
router.get("/Donaciones/:id",validarDonanteLogueado, Donaciones.getIDDonaciones);

export default router;