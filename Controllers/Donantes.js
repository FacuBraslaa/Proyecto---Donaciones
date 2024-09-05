import { client } from '../dbconfig.js'; // No es necesario volver a importar pg

await client.connect(); 

// Obtener todos los donantes
const getDonantes = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM "Donantes"');
        res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener donantes', error: err.message });
    }
};

// Crear donante
const createDonante = async (req, res) => {
    const { ID, Codigo_postal, Numero_de_whatsapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;

    const query = `
        INSERT INTO "Donantes" 
        ("ID", "Codigo_postal", "Numero_de_whatsapp", "Like", "Foto_de_perfil", "Done", "Username", "Password", "Name_and_Lastname", "Email", "Fecha_de_nacimiento", "Direccion") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [ID, Codigo_postal, Numero_de_whatsapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);
        res.json({ message: "Donante registrado correctamente", idDonante: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Donante:', error);
        res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
};

// Actualizar donante
const updateDonante = async (req, res) => {
    const { Codigo_postal, Numero_de_whatsapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;

    const query = `
        UPDATE "Donantes"
        SET 
        "Password" = $1, 
        "Email" = $2, 
        "Numero_de_whatsapp" = $3, 
        "Name_and_Lastname" = $4, 
        "Fecha_de_nacimiento" = $5, 
        "Direccion" = $6, 
        "Codigo_postal" = $7,
        "Like" = $8,
        "Foto_de_perfil" = $9,
        "Done" = $10
        WHERE "Username" = $11
    `;

    try {
        const result = await client.query(query, [Password, Email, Numero_de_whatsapp, Name_and_Lastname, Fecha_de_nacimiento, Direccion, Codigo_postal, Like, Foto_de_perfil, Done, Username]);

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
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    const query = 'DELETE FROM "Donantes" WHERE "ID" = $1';

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
    const query = 'SELECT * FROM "Donantes" WHERE "ID" = $1';

    try {
        const result = await client.query(query, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Devolver solo el primer resultado
        } else {
            res.status(404).json({ message: "Donante no encontrado con el ID proporcionado" });
        }
    } catch (err) {
        console.error('Error al requerir donante por ID:', err);
        res.status(500).json({ message: "Error al requerir donante por ID", error: err.message });
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
