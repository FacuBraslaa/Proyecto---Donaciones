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




// Exportamos las funciones que manejan las Opciones
const OpcionesController = {
    crearOpciones,
};

export default OpcionesController;
