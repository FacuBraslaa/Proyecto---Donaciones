import { client } from '../dbconfig.js'; 

await client.connect();

// Validar campos únicos (username, email, whatsapp)
const checkDuplicateFields = async (Username, Email, Numero_de_watshapp, id = null) => {
    let query = `
        SELECT * FROM "Donantes"
        WHERE ("Username" = $1 OR "Email" = $2 OR "Numero_de_watshapp" = $3)
    `;
    
    const values = [Username, Email, Numero_de_watshapp];
    
    // Excluir el donante actual en caso de actualización
    if (id) {
        query += ` AND "ID" != $4`;
        values.push(id);
    }

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            const existingUser = result.rows[0];
            if (existingUser.Username === Username) return { field: 'Username', value: Username };
            if (existingUser.Email === Email) return { field: 'Email', value: Email };
            if (existingUser.Numero_de_watshapp === Numero_de_watshapp) return { field: 'Numero_de_watshapp', value: Numero_de_watshapp };
        }
        return null; // No hay duplicados
    } catch (error) {
        console.error('Error al verificar campos únicos:', error);
        throw new Error('Error al verificar campos únicos');
    }
};

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
    const { Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;

    // Verificar si se proporcionaron los datos obligatorios
    if (!Username || !Email || !Numero_de_watshapp) {
        return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });
    }

    // Verificar si el username, email o whatsapp ya existen
    try {
        const duplicate = await checkDuplicateFields(Username, Email, Numero_de_watshapp);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al verificar campos únicos", error: error.message });
    }

    const query = `
        INSERT INTO "Donantes" 
        ("Codigo_postal", "Numero_de_watshapp", "Like", "Foto_de_perfil", "Done", "Username", "Password", "Name_and_Lastname", "Email", "Fecha_de_nacimiento", "Direccion") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);
        res.json({ message: "Donante registrado correctamente", idDonante: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Donante:', error);
        res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
};

// Actualizar donante
const updateDonante = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;

    // Verificar si se proporcionaron los datos obligatorios
    if (!Username || !Email || !Numero_de_watshapp) {
        return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });
    }

    // Verificar si el username, email o whatsapp ya existen (excluyendo al donante actual)
    try {
        const duplicate = await checkDuplicateFields(Username, Email, Numero_de_watshapp, id);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al verificar campos únicos", error: error.message });
    }

    const query = `
        UPDATE "Donantes"
        SET 
        "Password" = $1, 
        "Email" = $2, 
        "Numero_de_watshapp" = $3, 
        "Name_and_Lastname" = $4, 
        "Fecha_de_nacimiento" = $5, 
        "Direccion" = $6, 
        "Codigo_postal" = $7,
        "Like" = $8,
        "Foto_de_perfil" = $9,
        "Done" = $10,
        "Username" = $11
        WHERE "ID" = $12
    `;

    try {
        const result = await client.query(query, [Password, Email, Numero_de_watshapp, Name_and_Lastname, Fecha_de_nacimiento, Direccion, Codigo_postal, Like, Foto_de_perfil, Done, Username, id]);
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
const getDonanteById = async (req, res) => {
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
    getDonanteById
};

export default donantes;
