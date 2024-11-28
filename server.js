const express = require('express');
const app = express();

// Middleware global para configurar CORS manualmente
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Origen permitido
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Encabezados permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permitir credenciales
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Manejo de preflight requests
    }
    next();
});

// Middleware para procesar JSON
app.use(express.json());

// Ejemplo de endpoint
app.post('/donantes', (req, res) => {
    res.status(200).json({ message: 'Cuenta creada correctamente' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
