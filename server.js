const express = require('express');
const cors = require('cors');

const app = express();

// Configuración básica de CORS
app.use(cors({
    origin: '*', // Origen permitido
    methods: ['GET', 'POST','PUT', 'OPTIONS'], // Métodos permitidos
     allowedHeaders : ['Content-Type','Authorization'], // Cabeceras permitidas
     credentials : true // Permitir credenciales
})) 

// Middleware para procesar JSON
app.use(express.json());

// Endpoint para manejar solicitudes POST en /donantes
app.post('/donantes', (req, res) => {
    console.log('Datos recibidos:', req.body); // Muestra los datos enviados desde el frontend
    res.status(200).json({ message: 'Cuenta creada correctamente' }); // Respuesta de éxito
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

