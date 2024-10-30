import { client } from '../dbconfig.js'; 
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';

// Configura Cloudinary (asegúrate de hacer esto en un archivo separado o en un lugar centralizado)
cloudinaryV2.config({
    cloud_name: 'df8yoixyy', 
    api_key: '335398466712473', 
    api_secret: 'WTQLTAWJmRFe1nVreu1OkxrZlow' 
});

// Conectar a la base de datos (asegúrate de hacer esto en el lugar adecuado de tu aplicación)
await client.connect();

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

// Validar campos únicos (username, email, whatsapp)
const Chekdoble = async (Username, Email, Numero_de_watshapp, id = null) => {
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
       return res.json(result.rows); // Envía los resultados como respuesta
    } catch (err) {
        console.error('Error ejecutando la consulta', err.stack);
       return res.status(500).json({ message: 'Error al obtener donantes', error: err.message });
    }
};

// Crear donante (modificado para manejar la imagen)
const createDonante = async (req, res) => {
    // Verifica si se ha subido una imagen
    if (!req.file) {
        return res.status(400).json({ message: "Se requiere una imagen de perfil" });
    }

    try {
        // Subir imagen a Cloudinary
        const result = await cloudinaryV2.uploader.upload(req.file.path);
        const Foto_de_perfil = result.secure_url; // URL segura de la imagen en Cloudinary

        const { Codigo_postal, Numero_de_watshapp, Like, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion } = req.body;

        // Verificar si se proporcionaron los datos obligatorios
        if (!Username || !Email || !Numero_de_watshapp) {
            return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });
        }

        // Verificar si el username, email o whatsapp ya existen
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp);
        if (duplicate) {
            return res.status(400).json({ message: `${duplicate.field} ya está en uso: ${duplicate.value}` });
        }

        const query = `
            INSERT INTO "Donantes" 
            ("Codigo_postal", "Numero_de_watshapp", "Like", "Foto_de_perfil", "Done", "Username", "Password", "Name_and_Lastname", "Email", "Fecha_de_nacimiento", "Direccion") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING "ID"
        `;

        const resultInsert = await client.query(query, [Codigo_postal, Numero_de_watshapp, Like, Foto_de_perfil, Done, Username, Password, Name_and_Lastname, Email, Fecha_de_nacimiento, Direccion]);
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

    // Verificar si se proporcionaron los datos obligatorios
    if (!Username || !Email || !Numero_de_watshapp) {
        return res.status(400).json({ message: "Se requiere Username, Email y Número de WhatsApp" });
    }

    // Verificar si el username, email o whatsapp ya existen (excluyendo al donante actual)
    try {
        const duplicate = await Chekdoble(Username, Email, Numero_de_watshapp, id);
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
        const result = await client.query(query, [Password, Email, Numero_de_watshapp, Name_and_Lastname, Fecha_de_nacimiento, Direccion, Codigo_postal, Like, req.file ? result.secure_url : null, Done, Username, id]);
        if (result.rowCount > 0) {
            return res.json({ message: "Donante actualizado correctamente" });
        } else {
            return res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar Donante:', error);
        return res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
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
            return res.json({ message: "Donante eliminado correctamente" });
        } else {
            return res.status(404).json({ message: "Donante no encontrado" });
        }
    } catch (err) {
        console.error('Error al eliminar Donante:', err);
        return res.status(500).json({ message: "Error al eliminar Donante", error: err.message });
    }
};

// Obtener donante por ID
const getDonanteById = async (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM "Donantes" WHERE "ID" = $1';

    try {
        const result = await client.query(query, [id]);
        if (result.rows.length > 0) {
            return res.json(result.rows[0]); // Devolver solo el primer resultado
        } else {
            res.status(404).json({ message: "Donante no encontrado con el ID proporcionado" });
        }
    } catch (err) {
        console.error('Error al requerir donante por ID:', err);
        return res.status(500).json({ message: "Error al requerir donante por ID", error: err.message });
    }
};

const donantes = {
    getDonantes,
    createDonante,
    updateDonante,
    deleteDonante,
    getDonanteById,
};

export default donantes;
