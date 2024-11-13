import pool from '../dbconfig.js';

// Obtener todos los likes de un donante específico usando su IDdonante
const getIDdonanteparalike = async (req, res) => {
    const { IDdonante } = req.params;  // Obtener el IDdonante desde los parámetros de la ruta
    const query = 'SELECT "IDlike", "IDdonante", "IDongosc" FROM "Like" WHERE "IDdonante" = $1';

    try {
        const result = await pool.query(query, [IDdonante]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los likes del donante especificado
        } else {
            return res.status(404).json({ message: "No se encontraron likes para este donante" });
        }
    } catch (error) {
        console.error('Error al obtener los likes:', error);
        return res.status(500).json({ message: "Error al obtener los likes", error: error.message });
    }
};

// Insertar Like para un donante
const insertLike = async (req, res) => {
    const { IDongosc } = req.params; // Toma el IDongosc desde los parámetros de la ruta
    const { IDdonante } = req.body;  // Toma el IDdonante desde el cuerpo de la solicitud

    // Verificar que se haya enviado correctamente el IDdonante
    if (!IDdonante) {
        return res.status(400).json({ message: "IDdonante es requerido" });
    }

    console.log('IDdonante:', IDdonante);
    console.log('IDongosc:', IDongosc);

    try {
        // Insertar el Like en la base de datos
        const query = 'INSERT INTO "Like" ("IDdonante", "IDongosc") VALUES ($1, $2) RETURNING "IDlike"';
        const result = await pool.query(query, [IDdonante, IDongosc]);

        return res.status(201).json({ message: "Like agregado", IDlike: result.rows[0].IDlike });
    } catch (error) {
        console.error('Error al insertar Like:', error);
        return res.status(500).json({ message: "Error al insertar Like", error: error.message });
    }
};

// Obtener todos los Likes para un donante específico usando el IDdonante
const getLikes = async (req, res) => {
    const { IDdonante } = req.params; // Obtener el IDdonante desde los parámetros de la ruta
    const query = 'SELECT * FROM "Like" WHERE "IDdonante" = $1';

    try {
        const result = await pool.query(query, [IDdonante]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los Likes del donante especificado
        } else {
            return res.status(404).json({ message: "No se encontraron Likes para este donante" });
        }
    } catch (error) {
        console.error('Error al obtener Likes:', error);
        return res.status(500).json({ message: "Error al obtener Likes", error: error.message });
    }
};

const donantes = {
    getIDdonanteparalike,
    insertLike,
    getLikes,
};

export default donantes;
