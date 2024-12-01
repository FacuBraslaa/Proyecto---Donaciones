import express from 'express';
import Ongosc from '../Controllers/ongosc.js';
import ongosc from '../Controllers/ongosc.js';
import upload from '../Uploads.js'; // Configuración de Multer para subir archivos
import { validarOngoscLogueado } from '../Middlewares/Middlewares.js';
const router = express.Router();

// Crear Ongosc
router.post("/", Ongosc.createOngosc);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/foto/:id', upload.single('Foto_de_perfil'), ongosc.actualizarFoto);

// Devolver todas las Ongosc
router.get("/", Ongosc.getOngosc);

// Devolver una Ongosc por id
router.get("/:id", Ongosc.getongoscById);

// Ruta para actualizar un donante por ID (permite actualizar la imagen de perfil)
router.put('/:id', upload.single('Foto_de_perfil'), ongosc.updateOngosc);

// Eliminar ongosc existente
router.delete("/:id", Ongosc.deleteOngosc);

router.post('/login',  Ongosc.loginOngosc);

router.post('/logout',  Ongosc.logoutOngosc);

export default router;
