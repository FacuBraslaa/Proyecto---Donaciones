import express from 'express';
import donantes from '../Controllers/Donantes.js'; // Importa el controlador de donantes
import upload from '../Uploads.js'; // Importa la configuración de multer

const router = express.Router();

// Rutas para Donantes
router.get('/', donantes.getDonantes);
router.get('/:id', donantes.getDonanteById);
router.post('/', upload.single('Foto_de_perfil'), donantes.createDonante); // Usa multer aquí para manejar la imagen
router.put('/:id', upload.single('Foto_de_perfil'), donantes.updateDonante); // Permite subir imagen en la actualización si es necesario
router.delete('/:id', donantes.deleteDonante);

export default router;
