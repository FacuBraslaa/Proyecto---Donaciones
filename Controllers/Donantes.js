import { client } from '../dbconfig.js';
import pg from "pg"; // Asegúrate de que pg se use correctamente

// Obtener todos los donantes
const getDonantes = async () => {
    try {
        const res = await client.query('SELECT * FROM donantes');
        console.log(res.rows); // Muestra los resultados en la consola
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
    } finally {
        client.end(); // Cierra la conexión
    }
}

const createDonante = async (req, res) => {
    const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;

    // Inserta los datos en la tabla 'donantes'
    const query = `
        INSERT INTO donantes 
        (nombre_usuario, contraseña, gmail, numero_whatsapp, nombre, apellido, fecha_nacimiento, direccion, codigo_postal) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;

    try {
        const result = await client.query(query, [nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal]);
        // Aquí result.insertId no está disponible para consultas SQL, usar RETURNING id en la consulta
        res.json({ message: "Donante registrado correctamente" });
    } catch (error) {
        console.error('Error al registrar Donante:', error); // Imprime el error en la consola
        res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
}

const updateDonante = async (req, res) => {
    const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;

    // Actualiza los datos en la tabla 'donantes'
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
        const result = await client.query(query, [contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal, nombreUsuario]);

        if (result.rowCount > 0) {
            res.json({ message: "Donante actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar Donante:', error); // Imprime el error en la consola
        res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
    }
}

const deleteDonante = async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM donantes WHERE id = $1'; // Corregí 'public.donantes' a 'donantes'

    try {
        await client.query(query, [id]);
        res.send("Donante Eliminado Correctamente");
    } catch (err) {
        console.error('Error al eliminar Donante:', err); // Imprime el error en la consola
        res.status(500).json({ message: "Error al eliminar Donante", err: err.message });
    }
}

const donantes = {
    getDonantes,
    updateDonante,
    createDonante,
    deleteDonante,
}

export default donantes;
