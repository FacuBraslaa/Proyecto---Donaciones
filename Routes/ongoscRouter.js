import express from 'express';
import Ongosc from '../Controllers/Ongosc.js';

const router = express.Router();

// Crear Ongosc
router.post("/", Ongosc.createOngosc);

// Devolver todas las Ongosc
router.get("/", Ongosc.getOngosc);

// Devolver una Ongosc por id
router.get("/:id", Ongosc.getongoscById);

// Actualizar Ongosc
router.put("/:id", Ongosc.updateOngosc);

// Eliminar ongosc existente
router.delete("/:id", Ongosc.deleteOngosc);

export default router;
