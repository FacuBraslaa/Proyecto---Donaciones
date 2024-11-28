const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Si usas cookies o autenticación
}));

app.use(express.json());

app.post('/donantes', (req, res) => {
    console.log('Datos recibidos:', req.body);
    res.status(200).json({ message: 'Cuenta creada correctamente' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
