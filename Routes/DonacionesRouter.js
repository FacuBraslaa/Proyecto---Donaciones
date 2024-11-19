import express from 'express';
import Donaciones from '../Controllers/Donaciones.js';  // Verifica la ruta y el contenido del controlador
const router = express.Router();


// Obtener todas las donaciones
router.get("/", Donaciones.getDonaciones);

// Devolver donaciones de un donante específico por ID
router.get("/:IDdonante", Donaciones.getIDdonanteparadonaciones);

// Insertar una donación para un donante específico
router.post("/:IDongosc", Donaciones.insertDonacion); 

// Eliminar una donación específica por ID de donación
router.delete("/:IDdonante", Donaciones.deleteDonacionByDonante);

export default router;
