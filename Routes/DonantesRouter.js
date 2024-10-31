// Importa las dependencias necesarias
import express from 'express';
import donantes from '../Controllers/Donantes.js'; // Controlador de donantes
import upload from '../Uploads.js'; // Configuración de Multer para subir archivos
import { validarDonanteLogueado } from '../Middlewares/Middlewares.js';

const router = express.Router();

// Ruta para obtener todos los donantes
router.get('/', donantes.getDonantes);

// Ruta para obtener un donante por ID
router.get('/:id', validarDonanteLogueado, donantes.getDonanteById);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/',  donantes.createDonante);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/foto/:id', upload.single('Foto_de_perfil'), donantes.actualizarFoto);

// Ruta para actualizar un donante por ID (permite actualizar la imagen de perfil)
router.put('/:id', upload.single('Foto_de_perfil'), donantes.updateDonante);

// Ruta para eliminar un donante por ID
router.delete('/:id', donantes.deleteDonante);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/login',  donantes.loginDonante);

router.post('/logout',  donantes.logoutDonante);

export default router;
