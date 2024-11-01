import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

// Configuración del pool de conexiones
export const pool = new Pool({
    user: "default",
    host: "ep-purple-mountain-a4zkc965-pooler.us-east-1.aws.neon.tech",
    database: "verceldb",
    password: "fC8McY3Jmuhj",
    port: 5432,
    ssl: true
});

export default pool;



