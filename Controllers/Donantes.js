import { client } from '../dbconfig.js';
import pg from 'pg'; 

await client.connect(); 

// Obtener todos los donantes
const getDonantes = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM donantes');
        res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener donantes', error: err.message });
    }
};

// Crear donante
const createDonante = async (req, res) => {
    const { ID, Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password,Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion} = req.body;

    const query = `
        INSERT INTO "Donantes" 
        ("ID", "Codigo_postal", "Numero_de_watshapp", "Like", "Foto_de_perfil", "Done", "Username", "Password", "Name_and_Lastname", "Email", "Fecha_de_nacimiento", "Direccion"
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12)
        RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [ID, Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password,Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);
        res.json({ message: "Donante registrado correctamente", idDonante: result.rows[0].id });
    } catch (error) {
        console.error('Error al registrar Donante:', error);
        res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
};

// Actualizar donante
const updateDonante = async (req, res) => {
    const { ID, Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password,Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion} = req.body;

    const query = `
        UPDATE donantes 
        SET 
        Password = $1, 
        Email = $2, 
        Numero_de_watshapp = $3, 
        Name_and_Lastname = $4, 
        Fecha_de_nacimiento = $5, 
        Direccion = $6, 
        Codigo_postal = $7 
        WHERE 
        Username = $8
        
    `;

    try {
        const result = await client.query(query, [ID, Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password,Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);

        if (result.rowCount > 0) {
            res.json({ message: "Donante actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar Donante:', error);
        res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
    }
};

// Eliminar donante
const deleteDonante = async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM donantes WHERE id = $1';

    try {
        const result = await client.query(query, [id]);
        if (result.rowCount > 0) {
            res.json({ message: "Donante eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (err) {
        console.error('Error al eliminar Donante:', err);
        res.status(500).json({ message: "Error al eliminar Donante", error: err.message });
    }
};

// Obtener donante por ID
const donantesById = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM donantes WHERE id = $1';

    try {
        const result = await client.query(query, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (err) {
        console.error('Error al requerir donante:', err);
        res.status(500).json({ message: "Error al requerir donante", error: err.message });
    }
};

const donantes = {
    getDonantes,
    createDonante,
    updateDonante,
    deleteDonante,
    donantesById,
};

export default donantes;
