import pool from '../dbconfig.js';

// Crear Opciones
const crearOpciones = async (req, res) => {
    const { Nombres } = req.body;

    const query = `
        INSERT INTO "Opciones" 
            ("Nombres")
            VALUES ($1)
            RETURNING "idOpciones"
    `;

    try {
        const result = await pool.query(query, [Nombres]);
        const idOpciones = result.rows[0].idOpciones; 
        return res.json({ message: "Opción registrada correctamente", idOpciones });
    } catch (error) {
        console.error('Error al registrar Opción:', error);
        return res.status(500).json({ message: "Error al registrar Opción", error: error.message });
    }
};

// Obtener todas las opciones
const getOpciones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Opciones"');
        return res.json(result.rows); 
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        return res.status(500).json({ message: 'Error al obtener Opciones', error: err.message });
    }
};

// Eliminar Opción por ID
const deleteOpcion = async (req, res) => {
    // Desestructurando el ID correcto
    const { id } = req.params; 

    const query = `
        DELETE FROM "Opciones"
        WHERE "idOpciones" = $1
    `;

    try {
        const result = await pool.query(query, [id]);

        // Comprobando si se eliminó alguna fila
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Opción no encontrada" });
        } else {
            return res.json({ message: "Opción eliminada correctamente" });
        }
    } catch (error) {
        console.error('Error al eliminar la opción:', error);
        return res.status(500).json({ message: "Error al eliminar la opción", error: error.message });
    }
};


const OpcionesController = {
    crearOpciones,
    getOpciones,
    deleteOpcion
};

export default OpcionesController;
