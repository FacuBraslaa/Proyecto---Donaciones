import { client } from '../dbconfig.js';

// Obtener todos los ID de Ongosc
const getIDOngosc = async (req, res) => {
    const query = 'SELECT "ID" FROM "Ongosc"';

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows); // Mostrar todos los IDs de Ongosc
        } else {
            res.status(404).json({ message: "No se encontraron Ongosc" });
        }
    } catch (error) {
        console.error('Error al obtener ID de Ongosc:', error);
        res.status(500).json({ message: "Error al obtener ID de Ongosc", error: error.message });
    }
};

// Funciones existentes para obtener ID de Donantes y Donaciones
const getIDDonantes = async (req, res) => {
    const query = 'SELECT "IDdonantes" FROM "Donantes"';

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows); // Mostrar todos los ID de Donantes
        } else {
            res.status(404).json({ message: "No se encontraron donantes" });
        }
    } catch (error) {
        console.error('Error al obtener IDdonantes:', error);
        res.status(500).json({ message: "Error al obtener IDdonantes", error: error.message });
    }
};

const getIDDonaciones = async (req, res) => {
    const query = 'SELECT "IDlike" FROM "Like"';

    try {
        const result = await client.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows); // Mostrar todos los ID de Like
        } else {
            res.status(404).json({ message: "No se encontraron donaciones" });
        }
    } catch (error) {
        console.error('Error al obtener IDLike:', error);
        res.status(500).json({ message: "Error al obtener IDLike", error: error.message });
    }
};

const donantes = {
    getIDDonantes,
    getIDDonaciones,
    getIDOngosc, 
};

export default donantes;
