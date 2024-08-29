import { client } from '../dbconfig.js';
import pg from 'pg'; // Importa correctamente el cliente de pg (asegúrate de que sea necesario)

const { Pool } = pg;
const pool = new Pool(); // Si estás usando pool, configúralo según tu configuración

// Obtener todos los donantes
const getDonantes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM donantes');
        res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener donantes', error: err.message });
    }
}

// Crear donante
const createDonante = async (req, res) => {
    const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;

    const query = `
        INSERT INTO donantes 
        (nombre_usuario, contraseña, gmail, numero_whatsapp, nombre, apellido, fecha_nacimiento, direccion, codigo_postal) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
    `;

    try {
        const result = await pool.query(query, [nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal]);
        res.json({ message: "Donante registrado correctamente", idDonante: result.rows[0].id });
    } catch (error) {
        console.error('Error al registrar Donante:', error);
        res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
}

// Actualizar donante
const updateDonante = async (req, res) => {
    const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;

    const query = `
        UPDATE donantes 
        SET 
            contraseña = $1, 
            gmail = $2, 
            numero_whatsapp = $3, 
            nombre = $4, 
            apellido = $5, 
            fecha_nacimiento = $6, 
            direccion = $7, 
            codigo_postal = $8 
        WHERE 
            nombre_usuario = $9
    `;

    try {
        const result = await pool.query(query, [contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal, nombreUsuario]);

        if (result.rowCount > 0) {
            res.json({ message: "Donante actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar Donante:', error);
        res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
    }
}

// Eliminar donante
const deleteDonante = async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM donantes WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        if (result.rowCount > 0) {
            res.send("Donante Eliminado Correctamente");
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (err) {
        console.error('Error al eliminar Donante:', err);
        res.status(500).json({ message: "Error al eliminar Donante", error: err.message });
    }
}

// Obtener donantes por id de usuario
const donantesById = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM donantes WHERE id_user = $1';

    try {
        const result = await pool.query(query, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (err) {
        console.error('Error al requerir donante:', err);
        res.status(500).json({ message: "Error al requerir donante", error: err.message });
    }
}

const donantes = {
    getDonantes,
    createDonante,
    updateDonante,
    deleteDonante,
    donantesById,
}

export default donantes;
