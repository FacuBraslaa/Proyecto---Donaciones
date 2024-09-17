import { client } from '../dbconfig.js'; 
 
const getIDDonantes = async (req, res) => {
    const query = 'SELECT "IDdonantes" FROM "Donantes"';

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows); // Mostrar todos los IDdonantes
        } else {
            res.status(404).json({ message: "No se encontraron donantes" });
        }
    } catch (error) {
        console.error('Error al obtener IDdonantes:', error);
        res.status(500).json({ message: "Error al obtener IDdonantes", error: error.message });
    }
};

const getIDOpciones = async (req, res) => {
    const query = 'SELECT "idOpciones" FROM "Opciones"';

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows); // Mostrar todos los idOpciones
        } else {
            res.status(404).json({ message: "No se encontraron opciones" });
        }
    } catch (error) {
        console.error('Error al obtener idOpciones:', error);
        res.status(500).json({ message: "Error al obtener idOpciones", error: error.message });
    }
};

const getNombresparaDonantesyong = async (req, res) => {
    const query = 'SELECT "Nombres" FROM "Opciones"';
    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: "No se encontraron los Nombres" });
        }
    } catch (error) {
        console.error('Error al obtener Nombres:', error);
        res.status(500).json({ message: "Error al obtener Nombres", error: error.message });
    }
};


const donantes = {
    getIDDonantes,
    getIDOpciones,
    getNombresparaDonantesyong
};

export default donantes;
