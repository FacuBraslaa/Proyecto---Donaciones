const express = require('express');
const cors = require('cors');
const app = express();

// Configuración básica de CORS
app.use(cors()); 

// Middleware para procesar JSON
app.use(express.json());

// Endpoint ejemplo
app.post('/donantes', (req, res) => {
    console.log(req.body); // Datos enviados desde el frontend
    res.status(200).json({ message: 'Cuenta creada correctamente' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
