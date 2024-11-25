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
router.post('/', donantes.createDonante);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/foto/:id', upload.single('Foto_de_perfil'), donantes.actualizarFoto);

// Ruta para actualizar un donante por ID (permite actualizar la imagen de perfil)
router.put('/:id', upload.single('Foto_de_perfil'), donantes.updateDonante);

// Ruta para eliminar un donante por ID
router.delete('/:id', donantes.deleteDonante);

// Ruta para crear un nuevo donante (incluye la opción de subir una imagen de perfil)
router.post('/login',  donantes.loginDonante);

router.post('/logout',  donantes.logoutDonante);

// Crear un nuevo donante
router.post('/donantes', async (req, res) => {
    try {
        const { Username, Email, Password, Numero_de_watshapp, Codigo_postal, Direccion } = req.body;

        // Validación básica
        if (!Username || !Email || !Password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Lógica para guardar el donante en la base de datos
        const nuevoDonante = await Donante.create({
            Username,
            Email,
            Password,
            Numero_de_watshapp,
            Codigo_postal,
            Direccion
        });

        res.status(201).json({ message: 'Donante creado', donante: nuevoDonante });
    } catch (error) {
        console.error('Error al crear donante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.post('/donantes', async (req, res) => {
    console.log('Datos recibidos:', req.body);

    try {
        const { Username, Email, Password } = req.body;

        if (!Username || !Email || !Password) {
            console.log('Campos faltantes:', { Username, Email, Password });
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Crear donante (simulado)
        const nuevoDonante = { id: 1, Username, Email };
        console.log('Donante creado:', nuevoDonante);

        res.status(201).json(nuevoDonante);
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


export default router;
