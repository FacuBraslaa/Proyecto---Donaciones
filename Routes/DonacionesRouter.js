import express from 'express';
import Donaciones from '../Controllers/Donaciones';  // Verifica la ruta y el contenido del controlador

const router = express.Router();

// Devolver ongosc específico
router.get("/Donaciones/:id", Donaciones.getIDOngosc);

// Devolver donante específico
router.get("/Donaciones/:id", Donaciones.getIDDonantes);

// Devolver donante específico
router.get("/Donaciones/:id", Donaciones.getIDDonaciones);

export default router;