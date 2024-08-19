import { Client } from '../.dbconfig.js'

//obtener todos los donantes 


const getDonantes = async () => {
    try {
      const res = await client.query('SELECT * FROM donantes');
      console.log(res.rows); // Muestra los resultados en la consola
    } catch (err) {
      console.error('Error ejecutando la consulta', err.stack);
    } finally {
      client.end(); // Cierra la conexión
    }
}