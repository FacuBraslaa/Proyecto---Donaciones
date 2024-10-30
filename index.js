import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const port = 3000;

app.use(express.json());

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'df8yoixyy', 
        api_key: '335398466712473', 
        api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow' 
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();


// Rutas de prueba
app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

// Importación de rutas
import DonantesRouter from './Routes/DonantesRouter.js';
import CategoriaRouter from './Routes/CategoriaRouter.js';
import OngoscRouter from './Routes/OngoscRouter.js'; 
import LikeRouter from './Routes/LikeRouter.js'; 
import OpcionesRouter from './Routes/OpcionesRouter.js';

// Usar las rutas importadas
app.use("/donantes", DonantesRouter);
app.use("/categoria", CategoriaRouter); 
app.use("/ongosc", OngoscRouter); 
app.use("/Like", LikeRouter); 
app.use("/opciones", OpcionesRouter); 

// Manejo de error 404
app.use((req, res) => {
    res.status(404).send('Lo siento, no se ha encontrado la página solicitada. ERROR 404');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
