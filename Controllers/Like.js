import pool from '../dbconfig.js';

// Obtener todos los ID de los donantes (usuarios autenticados)
const getIDDonantes = async (req, res) => {
    const userId = req.user.IDdonantes;  // Obtener el ID del donante autenticado desde req.user
    const query = 'SELECT "IDdonantes" FROM "Donantes" WHERE "IDdonantes" = $1';

    try {
        const result = await pool.query(query, [userId]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar el ID del donante autenticado
        } else {
            return res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener IDdonantes:', error);
        return res.status(500).json({ message: "Error al obtener IDdonantes", error: error.message });
    }
};

// Obtener todos los ID de los likes (con usuario autenticado)
const getIDlike = async (req, res) => {
    const userId = req.user.IDdonantes; // Obtener el ID del donante autenticado desde req.user
    const query = 'SELECT "IDlike", "donanteId", "ongoscId" FROM "Like" WHERE "donanteId" = $1';

    try {
        const result = await pool.query(query, [userId]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los IDLike del usuario autenticado
        } else {
            return res.status(404).json({ message: "No se encontraron likes para este donante" });
        }
    } catch (error) {
        console.error('Error al obtener IDLike:', error);
        return res.status(500).json({ message: "Error al obtener IDLike", error: error.message });
    }
};

// Insertar un nuevo Like para un usuario autenticado y una Ongosc autenticada
const insertLike = async (req, res) => {
    const { IDongosc } = req.params; 
   
    // Verificar que la Ongosc existe
    const checkOngoscQuery = 'SELECT "IDongosc" FROM "Ongosc" WHERE "IDongosc" = $1';

    try {
        // Verificar si la Ongosc existe
        const checkOngoscResult = await pool.query(checkOngoscQuery, [IDong]);
        if (checkOngoscResult.rows.length === 0) {
            return res.status(404).json({ message: "Ongosc no encontrada" });
        }

        // Si la Ongosc existe, insertar el Like
        const query = 'INSERT INTO "Like" ("IDdonantes", "IDongosc") VALUES ($1, $2) RETURNING "IDlike"';
        const result = await pool.query(query, [IDdonantes, IDongosc]);

        return res.status(201).json({ message: "Like agregado", IDlike: result.rows[0].IDlike });
    } catch (error) {
        console.error('Error al insertar Like:', error);
        return res.status(500).json({ message: "Error al insertar Like", error: error.message });
    }
};

// Obtener todos los Likes para el usuario autenticado
const getLikes = async (req, res) => {
    const userId = req.user.IDdonantes; // Obtener el ID del donante autenticado desde req.user
    const query = 'SELECT * FROM "Like" WHERE "donanteId" = $1';

    try {
        const result = await pool.query(query, [userId]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los Likes del donante autenticado
        } else {
            return res.status(404).json({ message: "No se encontraron Likes para este donante" });
        }
    } catch (error) {
        console.error('Error al obtener Likes:', error);
        return res.status(500).json({ message: "Error al obtener Likes", error: error.message });
    }
};

const donantes = {
    getIDDonantes,
    getIDlike,
    insertLike,
    getLikes,
};

export default donantes;
