import express from 'express';
import session from 'express-session';
import { v2 as cloudinary } from 'cloudinary';

// Import routes
import DonantesRouter from './Routes/DonantesRouter.js';
import CategoriaRouter from './Routes/CategoriaRouter.js';
import OngoscRouter from './Routes/ongoscRouter.js';
import LikeRouter from './Routes/LikeRouter.js';
import OpcionesRouter from './Routes/OpcionesRouter.js';
import DonacionesRouter from './Routes/DonacionesRouter.js';  // Corregido: cambiado a DonacionesRouter

const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log('HOLAAAAA')
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Origen permitido
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permitir credenciales
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Manejo de preflight requests
    }
    next();
});

app.use(express.json());

(async function() {
    try {
        // Cloudinary configuration
        cloudinary.config({ 
            cloud_name: 'df8yoixyy', 
            api_key: '335398466712473', 
            api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow' 
        });

        // Upload an image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 
            { public_id: 'shoes' }
        );
        
        console.log("Upload Result:", uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        console.log("Optimized URL:", optimizeUrl);

        // Transform the image: auto-crop to square aspect ratio
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
        
        console.log("Auto-Cropped URL:", autoCropUrl);
        
    } catch (error) {
        console.error("Error in Cloudinary operations:", error);
    }
})();

app.use(
    session({
      secret: 'mi_secreto',
      resave: false,
      saveUninitialized: false,
    })
);

// Test route
app.get("/", (_, res) => {
    res.send("Proyecto funcionando");
});

// Use imported routes
app.use("/donaciones", DonacionesRouter);  // Ruta correcta para Donaciones
app.use("/donantes", DonantesRouter);  // Ruta correcta para Donantes
app.use("/categoria", CategoriaRouter); 
app.use("/ongosc", OngoscRouter); 
app.use("/Like", LikeRouter); 
app.use("/opciones", OpcionesRouter); 

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
