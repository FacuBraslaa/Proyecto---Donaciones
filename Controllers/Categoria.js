import pool from '../dbconfig.js'; 

// Obtener todos los ID de Donantes
const getIDDonantes = async (req, res) => {
    const query = 'SELECT "IDdonantes" FROM "Donantes"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los IDdonantes
        } else {
            return res.status(404).json({ message: "No se encontraron donantes" });
        }
    } catch (error) {
        console.error('Error al obtener IDdonantes:', error);
        return res.status(500).json({ message: "Error al obtener IDdonantes", error: error.message });
    }
};

// Obtener todos los ID de ong o osc
const getIDOngosc = async (req, res) => {
    const query = 'SELECT "IDongosc" FROM "Ongosc"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los IDongosc
        } else {
            return res.status(404).json({ message: "No se encontraron las ong o osc" });
        }
    } catch (error) {
        console.error('Error al obtener Idongosc:', error);
        return res.status(500).json({ message: "Error al obtener IDongosc", error: error.message });
    }
};



/// Obtener opción por ID
const getIDOpciones = async (req, res) => {
    const { id } = req.params;  // Asegúrate de que esto coincide con el nombre del parámetro en la ruta

    const query = 'SELECT * FROM "Opciones" WHERE "idOpciones" = $1';

    try {
        const result = await pool.query(query, [id]);

        if (result.rows.length > 0) {
            return res.json(result.rows[0]);  // Devolver la opción encontrada
        } else {
            return res.status(404).json({ message: "Opción no encontrada" });
        }
    } catch (error) {
        console.error('Error al obtener la opción:', error);
        return res.status(500).json({ message: "Error al obtener la opción", error: error.message });
    }
};

// Obtener todos los Nombres de Opciones
const getNombresparaDonantesyong = async (req, res) => {
    const query = 'SELECT "Nombres" FROM "Opciones"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows);
        } else {
            return res.status(404).json({ message: "No se encontraron los Nombres" });
        }
    } catch (error) {
        console.error('Error al obtener Nombres:', error);
        return res.status(500).json({ message: "Error al obtener Nombres", error: error.message });
    }
};

const donantes = {
    getIDDonantes,
    getIDOpciones,
    getNombresparaDonantesyong,
    getIDOngosc,
};

export default donantes;
