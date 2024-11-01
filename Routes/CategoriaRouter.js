import express from 'express';
import Categoria from '../Controllers/Categoria.js';  // Asegúrate de que la ruta sea correcta
import { validarDonanteLogueado } from '../Middlewares/Middlewares.js'; // Asegúrate de que la ruta sea correcta
import { validarOngoscLogueado } from '../Middlewares/Middlewares.js';

const router = express.Router();

// Devolver donante específico
router.get("/donantes/:id", validarDonanteLogueado, Categoria.getIDDonantes);


// Devolver ongosc específico
router.get("/ongosc/:id", validarOngoscLogueado, Categoria.getIDOngosc);

// Devolver opción específica
router.get("/opciones/:id", Categoria.getIDOpciones);

// Mostrar los Nombres a los donantes
router.get("/nombres", validarDonanteLogueado, Categoria.getNombresparaDonantesyong); // Corregido: Eliminada la ":" del endpoint

export default router;
