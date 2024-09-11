import { client } from '../dbconfig.js'; // Asegúrate de que 'client' se exporte correctamente desde dbconfig.js

// Crear Opciones
const crearOpciones = async (req, res) => {
    const { Nombres } = req.body;

    // Consulta SQL con RETURNING para obtener el IdOpciones generado
    const query = `
        INSERT INTO "Opciones" 
            ("Nombres")
            VALUES ($1)
            RETURNING "idOpciones"
    `;

    try {
        const result = await client.query(query, [Nombres]);
        const idOpciones = result.rows[0].IdOpciones; // Extraer el IdOpciones del resultado
        res.json({ message: "Opción registrada correctamente", idOpciones });
    } catch (error) {
        console.error('Error al registrar Opción:', error);
        res.status(500).json({ message: "Error al registrar Opción", error: error.message });
    }
};

// Obtener todos las opciones
const getOpciones = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM "Opciones"');
        res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener Opciones', error: err.message });
    }
};




// Exportamos las funciones que manejan las Opciones
const OpcionesController = {
    crearOpciones,
    getOpciones
};

export default OpcionesController;
