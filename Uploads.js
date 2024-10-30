import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import https from 'https'; // Importar el módulo https

// Configura el agente HTTPS para ignorar certificados no válidos
const agent = new https.Agent({  
    rejectUnauthorized: false // Ignorar certificados no válidos (no recomendado para producción)
});

// Configurar Cloudinary
cloudinary.config({
    cloud_name: 'df8yoixyy', 
    api_key: '335398466712473', 
    api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow',
    httpAgent: agent, // Usa el agente configurado
});

// Configuración de Multer para almacenar las imágenes en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Nombre de la carpeta en Cloudinary
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif'], // Formatos permitidos
    },
});

// Middleware Multer configurado para subir archivos
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // Limitar el tamaño del archivo a 2MB
});

export default upload;
