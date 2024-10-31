import express from 'express';
import session from 'express-session';
import { v2 as cloudinary } from 'cloudinary';

// Import routes
import DonantesRouter from './Routes/DonantesRouter.js';
import CategoriaRouter from './Routes/CategoriaRouter.js';
import OngoscRouter from './Routes/OngoscRouter.js';
import LikeRouter from './Routes/LikeRouter.js';
import OpcionesRouter from './Routes/OpcionesRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

(async function() {
    try {
        // Configuration
        cloudinary.config({ 
            cloud_name: 'df8yoixyy', 
            api_key: '335398466712473', 
            api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow' 
        });

        // Upload an image
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
app.get("/chau", (_, res) => {
    res.send("Proyecto funcionando");
});

// Use imported routes
app.use("/donantes", DonantesRouter);
app.use("/categoria", CategoriaRouter); 
app.use("/ongosc", OngoscRouter); 
app.use("/Like", LikeRouter); 
app.use("/opciones", OpcionesRouter); 

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
