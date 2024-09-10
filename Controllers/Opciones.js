import { conn } from "../db.js"; 
import pg from "pg"; // Importamos el cliente de pg

// Instanciamos el cliente de PostgreSQL
const client = new pg.Client(conn);
client.connect();

// Crear Opciones
const crearOpciones = async (req, res) => {
    const { Nombres } = req.body;

    const query = `
        INSERT INTO "Opciones" 
            ("Nombres")
            VALUES ($1)
            RETURNING "ID"
    `;

    try {
        const result = await client.query(query, [Nombres]);
        res.json({ message: "Opción registrada correctamente", idOpcion: result.rows[0].ID });
    } catch (error) {
        console.error('Error al registrar Opción:', error);
        res.status(500).json({ message: "Error al registrar Opción", error: error.message });
    }
};

// Exportamos las funciones que manejan las Opciones
const OpcionesController = {
    crearOpciones,
};

export default OpcionesController;
