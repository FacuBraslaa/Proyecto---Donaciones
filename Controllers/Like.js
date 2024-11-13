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

// Obtener todos los Likes en general
const getLikes = async (req, res) => {
    const query = 'SELECT * FROM "Like"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los Likes en la base de datos
        } else {
            return res.status(404).json({ message: "No se encontraron likes" });
        }
    } catch (error) {
        console.error('Error al obtener los likes:', error);
        return res.status(500).json({ message: "Error al obtener los likes", error: error.message });
    }
};

// Eliminar un like específico de un donante usando su IDdonante y IDlike
const deleteLikeByDonante = async (req, res) => {
    const { IDdonante, IDlike } = req.params;  // Obtener tanto el IDdonante como el IDlike desde los parámetros de la ruta

    try {
        // Eliminar el like específico del donante
        const query = 'DELETE FROM "Like" WHERE "IDdonante" = $1 AND "IDlike" = $2 RETURNING "IDlike"';
        const result = await pool.query(query, [IDdonante, IDlike]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: `Se ha eliminado el like con ID ${IDlike} del donante con ID ${IDdonante}`
            });
        } else {
            return res.status(404).json({ message: "No se encontró el like para eliminar para este donante" });
        }
    } catch (error) {
        console.error('Error al eliminar el like:', error);
        return res.status(500).json({ message: "Error al eliminar el like", error: error.message });
    }
};


const donantes = {
    getIDdonanteparalike,
    insertLike,
    getLikes,
    deleteLikeByDonante, 
};

export default donantes;

