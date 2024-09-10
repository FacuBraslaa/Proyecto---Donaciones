import { client } from '../dbconfig.js'; // Asegúrate de que 'client' se exporte correctamente desde dbconfig.js

// Crear Opciones
const crearOpciones = async (req, res) => {
    const { Nombres } = req.body;

    const query = `
        INSERT INTO "Opciones" 
            ("Nombres")
            VALUES ($1)
    `;

    try {
        await client.query(query, [Nombres]);
        res.json({ message: "Opción registrada correctamente" });
    } catch (error) {
        console.error('Error al registrar Opción:', error);
        res.status(500).json({ message: "Error al registrar Opción", error: error.message });
    }
};


// Exportamos las funciones que manejan las Opciones
const OpcionesController = {
    crearOpciones,
};

export default OpcionesController;
