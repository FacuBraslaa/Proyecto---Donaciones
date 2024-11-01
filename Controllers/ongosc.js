import pool from '../dbconfig.js';
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';
import bcrypt from "bcrypt";

// Configura Cloudinary
cloudinaryV2.config({
    cloud_name: 'df8yoixyy',
    api_key: '335398466712473',
    api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow'
});

// Configuración de Multer para almacenar temporalmente las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Validar campos únicos
const Chekdoble = async (Username, Email, Numero_de_watshapp, Cuit, id = null) => {
    let query = `
        SELECT * FROM "Ongosc"
        WHERE ("Username" = $1 OR "Email" = $2 OR "Numero_de_watshapp" = $3 OR "Cuit" = $4)
    `;
    
    const values = [Username, Email, Numero_de_watshapp, Cuit];
    
    if (id) {
        query += ` AND "ID" != $5`;
        values.push(id);
    }

    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const existingUser = result.rows[0];
            if (existingUser.Username === Username) return { field: 'Username', value: Username };
            if (existingUser.Email === Email) return { field: 'Email', value: Email };
            if (existingUser.Numero_de_watshapp === Numero_de_watshapp) return { field: 'Numero_de_watshapp', value: Numero_de_watshapp };
            if (existingUser.Cuit === Cuit) return { field: 'Cuit', value: Cuit };
        }
        return null;
    } catch (error) {
        console.error('Error al verificar campos únicos:', error);
        throw new Error('Error al verificar campos únicos');
    }
};

const logoutOngosc =  async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send('Error al cerrar sesión');
        res.send('Sesión cerrada');
    });
};

const loginOngosc = async (req, res) => {
    const { Username, Password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM "Ongosc" WHERE "Username" = $1', [Username]);
        if (result.rows.length !== 1) return res.status(404).json({ message: "No se encontró usuario" });
        const user = result.rows[0];
        if (bcrypt.compareSync(Password, user.Password)) {
            req.session.ongoscId = user.ID;
            return res.send('Inicio de sesión exitoso');
        } else {
            return res.send('Contraseña incorrecta');
        }
    } catch (err) {
        console.error('Error buscando el username', err.stack);
        return res.status(500).json({ message: 'Error al obtener username', error: err.message });
    }
};

// Obtener todas las entidades Ongosc
const getOngosc = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Ongosc"');
        return res.json(result.rows);
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
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Ongosc no encontrado" });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener Ongosc por ID:', error);
        return res.status(500).json({ message: "Error al obtener Ongosc", error: error.message });
    }
};

const actualizarFoto = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Se requiere una imagen de perfil" });
    }

    const id = parseInt(req.params.id);

    try {
        const result = await cloudinaryV2.uploader.upload(req.file.path);
        const Foto_de_perfil = result.secure_url;

        const query = `
            UPDATE "Ongosc"
            SET "Foto_de_perfil" = $1
            WHERE "ID" = $2
        `;

        await pool.query(query, [Foto_de_perfil, id]);
        return res.json({ message: "Se subió la foto correctamente" });
    } catch (error) {
        console.error('No se ha podido subir la foto:', error);
        return res.status(500).json({ message: "No se ha podido subir la foto", error: error.message });
    }
};

// Crear una nueva entidad Ongosc
const createOngosc = async (req, res) => {
    const { Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Like, Done } = req.body;

    const hashedPassword = bcrypt.hashSync(Password, 10);

    if (!Username || !Email || !Numero_de_watshapp || !Cuit) {
        return res.status(400).json({ message: "Se requiere Username, Email, Número de WhatsApp y Cuit" });
    }

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
        ( "Username", "Codigo_postal", "Email", "Numero_de_watshapp", "UsernameOrganizacion", "Password", "Direccion", "Cuit", "Like", "Done") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING "ID"
    `;

    try {
        const result = await pool.query(query, [Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, hashedPassword, Direccion, Cuit, Like, Done]);
        return res.json({ message: "Ongosc registrado correctamente", idOngosc: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Ongosc:', error);
        return res.status(500).json({ message: "Error al registrar Ongosc", error: error.message });
    }
};

// Actualizar una entidad Ongosc
const updateOngosc = async (req, res) => {
    const id = req.params.id;
    const { Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, Password, Direccion, Cuit, Like, Done } = req.body;

    const hashedPassword = bcrypt.hashSync(Password, 10);

    if (!Username || !Email || !Numero_de_watshapp || !Cuit) {
        return res.status(400).json({ message: "Se requiere Username, Email, Número de WhatsApp y Cuit" });
    }

    try {
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp, Cuit, id);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error al verificar campos únicos", error: error.message });
    }

    const query = `
        UPDATE "Ongosc"
        SET "Username" = $1, "Codigo_postal" = $2, "Email" = $3, "Numero_de_watshapp" = $4, "UsernameOrganizacion" = $5, "Password" = $6, "Direccion" = $7, "Cuit" = $8, "Like" = $9, "Done" = $10
        WHERE "ID" = $11
    `;

    try {
        await pool.query(query, [Username, Codigo_postal, Email, Numero_de_watshapp, UsernameOrganizacion, hashedPassword, Direccion, Cuit, Like, Done, id]);
       return res.json({ message: "Ongosc actualizado correctamente" });
    } catch (error) {
        console.error('Error al actualizar Ongosc:', error);
        return res.status(500).json({ message: "Error al actualizar Ongosc", error: error.message });
    }
};

// Eliminar una entidad Ongosc
const deleteOngosc = async (req, res) => {
    const id = req.params.id;

    const query = `
        DELETE FROM "Ongosc"
        WHERE "ID" = $1
    `;

    try {
        const result = await pool.query(query, [id]);
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
    actualizarFoto,
    logoutOngosc,
    loginOngosc,
};

export default ongosc;
