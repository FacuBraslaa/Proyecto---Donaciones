import pool from '../dbconfig.js';

// Obtener todas las donaciones de un donante específico usando su IDdonante
const getIDdonanteparadonaciones = async (req, res) => {
    const { IDdonante } = req.params;  // Obtener el IDdonante desde los parámetros de la ruta
    const query = 'SELECT "IDdonaciones", "IDdonante", "IDongosc" FROM "Donaciones" WHERE "IDdonante" = $1';

    try {
        const result = await pool.query(query, [IDdonante]);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todas las donaciones del donante especificado
        } else {
            return res.status(404).json({ message: "No se encontraron donaciones para este donante" });
        }
    } catch (error) {
        console.error('Error al obtener las donaciones:', error);
        return res.status(500).json({ message: "Error al obtener las donaciones", error: error.message });
    }
};

// Insertar donación para un donante
const insertDonacion = async (req, res) => {
    const { IDongosc } = req.params; // Toma el IDongosc desde los parámetros de la ruta
    const { IDdonante } = req.body;  // Toma el IDdonante desde el cuerpo de la solicitud

    // Verificar que se haya enviado correctamente el IDdonante
    if (!IDdonante) {
        return res.status(400).json({ message: "IDdonante es requerido" });
    }

    console.log('IDdonante:', IDdonante);
    console.log('IDongosc:', IDongosc);

    try {
        // Insertar la donación en la base de datos
        const query = 'INSERT INTO "Donaciones" ("IDdonante", "IDongosc") VALUES ($1, $2) RETURNING "IDdonaciones"';
        const result = await pool.query(query, [IDdonante, IDongosc]);

        return res.status(201).json({ message: "Donación agregada", IDdonaciones: result.rows[0].IDdonaciones });
    } catch (error) {
        console.error('Error al insertar donación:', error);
        return res.status(500).json({ message: "Error al insertar donación", error: error.message });
    }
};

// Obtener todas las donaciones en general
const getDonaciones = async (req, res) => {
    const query = 'SELECT * FROM "Donaciones"';

    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            return res.json(result.rows); // Mostrar todas las donaciones en la base de datos
        } else {
            return res.status(404).json({ message: "No se encontraron donaciones" });
        }
    } catch (error) {
        console.error('Error al obtener las donaciones:', error);
        return res.status(500).json({ message: "Error al obtener las donaciones", error: error.message });
    }
};

// Eliminar donación por donante
const deleteDonacionByDonante = async (req, res) => {
    const { IDdonante } = req.params;   // Obtener IDdonante desde los parámetros de la ruta
    const { IDdonaciones } = req.body;  // Obtener IDdonaciones desde el cuerpo de la solicitud
    
    // Verificar que ambos valores estén presentes
    if (!IDdonante || !IDdonaciones) {
        return res.status(400).json({ message: "IDdonante y IDdonaciones son requeridos" });
    }

    try {
        // Eliminar la donación específica del donante
        const query = 'DELETE FROM "Donaciones" WHERE "IDdonante" = $1 AND "IDdonaciones" = $2 RETURNING "IDdonaciones"';
        const result = await pool.query(query, [IDdonante, IDdonaciones]);

        if (result.rowCount > 0) {
            return res.status(200).json({
                message: `Se ha eliminado la donación con ID ${IDdonaciones} del donante con ID ${IDdonante}`
            });
        } else {
            return res.status(404).json({ message: "No se encontró la donación para eliminar para este donante" });
        }
    } catch (error) {
        console.error('Error al eliminar la donación:', error);
        return res.status(500).json({ message: "Error al eliminar la donación", error: error.message });
    }
};

const donantes = {
    getIDdonanteparadonaciones,
    insertDonacion,
    getDonaciones,
    deleteDonacionByDonante, 
};

export default donantes;

