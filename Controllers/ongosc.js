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
        res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        res.status(500).json({ message: 'Error al obtener Ongosc', error: err.message });
    }
};

// Crear una nueva entidad Ongosc
const createOngosc = async (req, res) => {
    const { Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil } = req.body;

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

    const query = `
        INSERT INTO "Ongosc" 
        ("Username", "Codigo_postal", "Email", "Numero_de_watshapp", "UsernameOrganizacion", "Password", "Direccion", "Cuit", "Foto_de_perfil") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Foto_de_perfil]);
        res.json({ message: "Ongosc registrado correctamente", idOngosc: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Ongosc:', error);
        res.status(500).json({ message: "Error al registrar Ongosc", error: error.message });
    }
};

const ongosc = {
    getOngosc,
    createOngosc,
};

export default ongosc;

