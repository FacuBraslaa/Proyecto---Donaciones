import express from 'express';
import Ongosc from '../Controllers/Ongosc.js';

const router = express.Router();

// Crear Ongosc
router.post("/", Ongosc.createOngosc);

// Devolver todas las Ongosc
router.get("/", Ongosc.getOngosc);

export default router;
