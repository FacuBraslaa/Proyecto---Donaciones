import { Client } from "pg"; // Importamos el cliente de pg (recordar que para utilizar 'import' es necesario usar "type": "module" en el package.json)

// Pueden (y deberían) utilizar variables de entorno para almacenar los datos de conexión (dotenv)
const client = new Client({
    user: "default",
    host: "ep-purple-mountain-a4zkc965-pooler.us-east-1.aws.neon.tech",
    database: "verceldb",
    password: "fC8McY3Jmuhj",
    port: 5432,
});

client.connect(); 