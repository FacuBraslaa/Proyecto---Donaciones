import pool from '../dbconfig.js';

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

const getIDlike = async (req, res) => {
    const query = 'SELECT "IDlike" FROM "Like"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todos los IDLike
        } else {
            return res.status(404).json({ message: "No se encontraron registros en Like" });
        }
    } catch (error) {
        console.error('Error al obtener IDLike:', error);
        return res.status(500).json({ message: "Error al obtener IDLike", error: error.message });
    }
};

const donantes = {
    getIDDonantes,
    getIDlike,
};

export default donantes;
