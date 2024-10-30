import { client } from '../dbconfig.js';

// Validar campos únicos (Username, Email, Numero_de_watshapp, Cuit)
const Chekdoble = async (Username, Email, Numero_de_watshapp, Cuit, id = null) => {
    let query = `
        SELECT * FROM "Ongosc"
        WHERE ("Username" = $1 OR "Email" = $2 OR "Numero_de_watshapp" = $3 OR "Cuit" = $4)
    `;
    
    const values = [Username, Email, Numero_de_watshapp, Cuit];
    
    // Excluir la entidad actual en caso de actualización
    if (id) {
        query += ` AND "ID" != $5`;
        values.push(id);
    }

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            const existingUser = result.rows[0];
            if (existingUser.Username === Username) return { field: 'Username', value: Username };
            if (existingUser.Email === Email) return { field: 'Email', value: Email };
            if (existingUser.Numero_de_watshapp === Numero_de_watshapp) return { field: 'Numero_de_watshapp', value: Numero_de_watshapp };
            if (existingUser.Cuit === Cuit) return { field: 'Cuit', value: Cuit };
        }
        return null; // No hay duplicados
    } catch (error) {
        console.error('Error al verificar campos únicos:', error);
        throw new Error('Error al verificar campos únicos');
    }
};

// Obtener todas las entidades Ongosc
const getOngosc = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM "Ongosc"');
        return res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        return res.status(500).json({ message: 'Error al obtener Ongosc', error: err.message });
    }
};

// Obtener un donante por ID
const getongoscById = async (req, res) => {
    const id = req.params.id; 

    
    const query = `
        SELECT * FROM "Ongosc"
        WHERE "ID" = $1
    `;

    try {
        const result = await client.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Ongosc no encontrado" });
        }
        return res.json(result.rows[0]); // Envía el donante encontrado como respuesta
    } catch (error) {
        console.error('Error al obtener Ongosc por ID:', error);
        return res.status(500).json({ message: "Error al obtener Ongosc", error: error.message });
    }
};

// Crear una nueva entidad Ongosc
const createOngosc = async (req, res) => {
    const { Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil, Like, Done } = req.body;

    // Verificar si se proporcionaron los datos obligatorios
    if (!Password || !Email || !Numero_de_watshapp || !Cuit) {
        return res.status(400).json({ message: "Se requiere Username, Email, Número de WhatsApp y Cuit" });
    }

    // Verificar si el username, email, whatsapp o Cuit ya existen
    try {
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp, Cuit);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al verificar campos únicos", error: error.message });
    }

    // Consulta SQL para insertar un nuevo registro sin el campo ID (autoincremental)
    const query = `
        INSERT INTO "Ongosc" 
        ( "Username", "Codigo_postal", "Email", "Numero_de_watshapp", "UsernameOrganizacion", "Password", "Direccion", "Cuit", "Foto_de_perfil", "Like", "Done") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil, Like, Done]);
        return res.json({ message: "Ongosc registrado correctamente", idOngosc: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Ongosc:', error);
        return res.status(500).json({ message: "Error al registrar Ongosc", error: error.message });
    }
};

// Actualizar una entidad Ongosc
const updateOngosc = async (req, res) => {
    const id = req.params.id; // Obtener el ID de los parámetros de la URL
    const { Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil, Like, Done } = req.body;

    // Verificar si se proporcionaron los datos obligatorios
    if (!Username || !Email || !Numero_de_watshapp || !Cuit) {
        return res.status(400).json({ message: "Se requiere Username, Email, Número de WhatsApp y Cuit" });
    }

    // Verificar si el username, email, whatsapp o Cuit ya existen
    try {
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp, Cuit, id);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al verificar campos únicos", error: error.message });
    }

    // Consulta SQL para actualizar el registro correspondiente
    const query = `
        UPDATE "Ongosc"
        SET "Username" = $1, "Codigo_postal" = $2, "Email" = $3, "Numero_de_watshapp" = $4, "UsernameOrganizacion" = $5, "Password" = $6, "Direccion" = $7, "Cuit" = $8, "Foto_de_perfil" = $9, "Like" = $10, "Done" = $11
        WHERE "ID" = $12
    `;

    try {
        await client.query(query, [Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil, Like, Done, id]);
       return res.json({ message: "Ongosc actualizado correctamente" });
    } catch (error) {
        console.error('Error al actualizar Ongosc:', error);
        return res.status(500).json({ message: "Error al actualizar Ongosc", error: error.message });
    }
};

// Eliminar una entidad Ongosc
const deleteOngosc = async (req, res) => {
    const id = req.params.id; // Obtener el ID de los parámetros de la URL

    // Consulta SQL para eliminar el registro correspondiente
    const query = `
        DELETE FROM "Ongosc"
        WHERE "ID" = $1
    `;

    try {
        const result = await client.query(query, [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Ongosc no encontrado" });
        }
        return res.json({ message: "Ongosc eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar Ongosc:', error);
        return res.status(500).json({ message: "Error al eliminar Ongosc", error: error.message });
    }
};

const ongosc = {
    getOngosc,
    getongoscById, 
    createOngosc,
    updateOngosc,
    deleteOngosc,
};

export default ongosc;
