import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; // Asegúrate de usar la versión v2 de Cloudinary
import https from 'https';

// Configura el agente HTTPS para ignorar certificados no válidos (para pruebas locales)
const agent = new https.Agent({  
    rejectUnauthorized: false // No recomendado para producción
});

// Configurar Cloudinary
cloudinary.config({
    cloud_name: 'df8yoixyy', 
    api_key: '335398466712473', 
    api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow',
    secure: true, // Esto asegura que se usen URLs HTTPS en producción
    httpAgent: agent, // Usa el agente configurado
});

// Configuración de Multer para almacenar las imágenes en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Carpeta en Cloudinary
        format: async (req, file) => 'png', // Formato de archivo (puede cambiarse según la extensión de archivo)
        public_id: (req, file) => file.originalname.split('.')[0], // Opcional: nombre basado en el nombre original
        resource_type: 'image' // Tipo de recurso (imagen)
    },
});

// Middleware Multer configurado para subir archivos
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Tamaño máximo de archivo (2MB)
});

export default upload;
