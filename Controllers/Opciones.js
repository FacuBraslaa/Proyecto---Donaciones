import { client } from '../dbconfig.js'; 

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
        const result = await client.query(query, [Nombres]);
        const idOpciones = result.rows[0].IdOpciones; 
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
        res.json(result.rows); 
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener Opciones', error: err.message });
    }
};

//Eliminar Opcion por ID
const deleteOpcion = async (req, res) => {
    const { idOpciones } = req.params; 

    
    const query = `
        DELETE FROM "Opciones"
        WHERE "idOpciones" = $1
    `;

    try {
        const result = await client.query(query, [idOpciones]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: "Opción no encontrada" });
        } else {
            res.json({ message: "Opción eliminada correctamente" });
        }
    } catch (error) {
        console.error('Error al eliminar la opción:', error);
        res.status(500).json({ message: "Error al eliminar la opción", error: error.message });
    }
};



const OpcionesController = {
    crearOpciones,
    getOpciones,
    deleteOpcion
};

export default OpcionesController;
