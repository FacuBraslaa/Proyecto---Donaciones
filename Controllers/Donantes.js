import pool from '../dbconfig.js';
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';
import bcrypt from "bcryptjs";
import path from "path";

// Configura Cloudinary
cloudinaryV2.config({
    cloud_name: 'df8yoixyy',
    api_key: '335398466712473',
    api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow'
});

// Configuración de Multer para almacenar temporalmente las imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Validar campos únicos
const Chekdoble = async (Username, Email, Numero_de_watshapp, id = null) => {
    let query = `
        SELECT * FROM "Donantes"
        WHERE ("Username" = $1 OR "Email" = $2 OR "Numero_de_watshapp" = $3)
    `;
    const values = [Username, Email, Numero_de_watshapp];
    if (id) {
        query += ` AND "ID" != $4`;
        values.push(id);
    }
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const existingUser = result.rows[0];
            if (existingUser.Username === Username) return { field: 'Username', value: Username };
            if (existingUser.Email === Email) return { field: 'Email', value: Email };
            if (existingUser.Numero_de_watshapp === Numero_de_watshapp) return { field: 'Numero_de_watshapp', value: Numero_de_watshapp };
        }
        return null;
    } catch (error) {
        console.error('Error al verificar campos únicos:', error);
        throw new Error('Error al verificar campos únicos');
    }
};

// Resto de las funciones de los controladores usando pool.query

const logoutDonante =  async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send('Error al cerrar sesión');
        res.send('Sesión cerrada');
    });
};

const loginDonante = async (req, res) => {
    const { Username, Password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM "Donantes" WHERE "Username" = $1', [Username]);
        if (result.rows.length !== 1) return res.status(404).json({ message: "No se encontró usuario" });
        const user = result.rows[0];
        if (bcrypt.compareSync(Password, user.Password)) {
            req.session.donanteId = user.ID;
            return res.send('Inicio de sesión exitoso');
        } else {
            return res.send('Contraseña incorrecta');
        }
    } catch (err) {
        console.error('Error buscando el username', err.stack);
        return res.status(500).json({ message: 'Error al obtener username', error: err.message });
    }
};

const getDonantes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Donantes"');
        return res.json(result.rows);
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
        return res.status(500).json({ message: 'Error al obtener donantes', error: err.message });
    }
};

const actualizarFoto = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Se requiere una imagen de perfil" });
    const id = parseInt(req.params.id);
    try {
        const result = await cloudinaryV2.uploader.upload(req.file.path);
        const Foto_de_perfil = result.secure_url;
        const query = `UPDATE "Donantes" SET "Foto_de_perfil" = $1 WHERE "ID" = $2`;
        const resultInsert = await pool.query(query, [Foto_de_perfil, id]);
        return res.json({ message: "Se subió la foto correctamente" });
    } catch (error) {
        console.error('No se ha podido subir la foto:', error);
        return res.status(500).json({ message: "No se ha podido subir la foto", error: error.message });
    }
};

// Crear donante (modificado para manejar la imagen)
const createDonante = async (req, res) => {
    try {
        const { Codigo_postal, Numero_de_watshapp, Like, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;
        const hashedPassword = bcrypt.hashSync(Password, 10);

        if (!Username || !Email || !Numero_de_watshapp) return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });
        
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp);
       
        if (duplicate) return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });

        const query = `INSERT INTO "Donantes" ("Codigo_postal", "Numero_de_watshapp", "Like", "Done", "Username", "Password", "Name_and_Lastname", "Email", "Fecha_de_nacimiento", "Direccion") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING "ID"`;
        const resultInsert = await pool.query(query, [Codigo_postal, Numero_de_watshapp, Like, Done, Username, hashedPassword, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);
       
        return res.json({ message: "Donante registrado correctamente", idDonante: resultInsert.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Donante:', error);
        return res.status(500).json({ message: "Error al registrar Donante", error: error.message });
    }
};

// Actualizar donante
const updateDonante = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Codigo_postal, Numero_de_watshapp, Like, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    if (!Username || !Email || !Numero_de_watshapp) return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });

    try {
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp, id);
        if (duplicate) return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });

        const query = `UPDATE "Donantes" SET "Password" = $1, "Email" = $2, "Numero_de_watshapp" = $3, "Name_and_Lastname" = $4, "Fecha_de_nacimiento" = $5, "Direccion" = $6, "Codigo_postal" = $7, "Like" = $8, "Done" = $9, "Username" = $10 WHERE "ID" = $11`;
        const result = await pool.query(query, [hashedPassword, Email, Numero_de_watshapp, Name_and_Lastname, Fecha_de_nacimiento, Direccion, Codigo_postal, Like, Done, Username, id]);
        if (result.rowCount > 0) return res.json({ message: "Donante actualizado correctamente" });
        return res.status(404).json({ message: "Donante no encontrado" });
    } catch (error) {
        console.error('Error al actualizar Donante:', error);
        return res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
    }
};

// Eliminar donante
const deleteDonante = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    try {
        const result = await pool.query('DELETE FROM "Donantes" WHERE "ID" = $1', [id]);
        if (result.rowCount > 0) return res.json({ message: "Donante eliminado correctamente" });
        return res.status(404).json({ message: "Donante no encontrado" });
    } catch (err) {
        console.error('Error al eliminar Donante:', err);
        return res.status(500).json({ message: "Error al eliminar Donante", error: err.message });
    }
};

// Obtener donante por ID
const getDonanteById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM "Donantes" WHERE "ID" = $1', [id]);
        if (result.rows.length > 0) return res.json(result.rows[0]);
        return res.status(404).json({ message: "Donante no encontrado con el ID proporcionado" });
    } catch (err) {
        console.error('Error al requerir donante por ID:', err);
        return res.status(500).json({ message: "Error al requerir donante por ID", error: err.message });
    }
};

// Exportar los controladores
const donantes = {
    getDonantes,
    createDonante,
    updateDonante,
    deleteDonante,
    getDonanteById,
    actualizarFoto,
    loginDonante,
    logoutDonante,
};

export default donantes;
