import express from 'express';
import Categoria from '../Controllers/Categoria.js';  // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Devolver donante específico
router.get("/donantes/:id", Categoria.getIDDonantes);

// Devolver opción específica
router.get("/opciones/:id", Categoria.getIDOpciones);

//Mostrar los Nombres a los donantes
router.get("/Nombres/:", Categoria.getNombresparaDonantesyong);

export default router;
