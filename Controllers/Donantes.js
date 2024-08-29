import { client } from '../dbconfig.js'
import pg from "pg" // Importamos el cliente de pg (recordar que para utilizar 'import' es necesario usar "type": "module" en el package.json)
//obtener todos los donantes 


const getDonantes = async () => {
    try {
      const res = await Client.query('SELECT * FROM donantes');
      console.log(res.rows); // Muestra los resultados en la consola
    } catch (err) {
      console.error('Error ejecutando la consulta', err.stack);
    } finally {
      client.end(); // Cierra la conexión
    }
}



      const createDonante = async (req, res) => {

        /*
            {
                "nombreUsuario": "Nombre de usuario",
                "contraseña": "Contraseña",
                "gmail": "correo@example.com",
                "numeroWhatsapp": "+1234567890",
                "nombre": "Nombre",
                "apellido": "Apellido",
                "fechaNacimiento": "YYYY-MM-DD",
                "direccion": "Calle Falsa 123",
                "codigoPostal": "12345"
            }
        */
    
        const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;
    
        // Inserta los datos en la tabla 'donantes'
        const result = await conn.query(
            `INSERT INTO donantes 
            (nombre_usuario, contraseña, gmail, numero_whatsapp, nombre, apellido, fecha_nacimiento, direccion, codigo_postal) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal]
        );
    
        try {
          await client.query(query, [nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal]);
          res.json({ message: "Donante registrado correctamente" });
      } catch (error) {
          console.error('Error al registrar Donante:', error); // Imprime el error en la consola
          res.status(500).json({ message: "Error al registrar Donante", error: error.message });
      }
        // Recupera el id generado
        const idDonantes = result.insertId;
    
        // Envía la respuesta con todos los datos incluidos
        res.json({ idDonantes, nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal });
    };
    
  const alldonantes = async (req, res) => {
      let query = 'SELECT * FROM public.donantes';

      try {
          const result = await Client.query(query);
          res.json(result);
      } catch (err) {
          console.error('Error al requerir donantes:', err); // Imprime el error en la consola
          res.status(500).json({ message: "Error al requerir donantes", err: err.message });
      }
  }

  const idDonantes = async (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM public.Donante WHERE id = $1";

    try {
        const result = await client.query(query, [id]);
        res.json(result);
    } catch (err) {
        console.error('Error al requerir Donante:', err); // Imprime el error en la consola
        res.status(500).json({ message: "Error al requerir Donante", err: err.message });
    }
}

const updateDonante = async (req, res) => {

  /*
      {
          "nombreUsuario": "Nombre de usuario",
          "contraseña": "Contraseña",
          "gmail": "correo@example.com",
          "numeroWhatsapp": "+1234567890",
          "nombre": "Nombre",
          "apellido": "Apellido",
          "fechaNacimiento": "YYYY-MM-DD",
          "direccion": "Calle Falsa 123",
          "codigoPostal": "12345"
      }
  */

  const { nombreUsuario, contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal } = req.body;

  // Actualiza los datos en la tabla 'donantes'
  const query = `
      UPDATE donantes 
      SET 
          contraseña = ?, 
          gmail = ?, 
          numero_whatsapp = ?, 
          nombre = ?, 
          apellido = ?, 
          fecha_nacimiento = ?, 
          direccion = ?, 
          codigo_postal = ? 
      WHERE 
          nombre_usuario = ?
  `;

  try {
      const result = await conn.query(query, [contraseña, gmail, numeroWhatsapp, nombre, apellido, fechaNacimiento, direccion, codigoPostal, nombreUsuario]);
      
      if (result.affectedRows > 0) {
          res.json({ message: "Donante actualizado correctamente" });
      } else {
          res.status(404).json({ message: "Donante no encontrado" });
      }
  } catch (error) {
      console.error('Error al actualizar Donante:', error); // Imprime el error en la consola
      res.status(500).json({ message: "Error al actualizar Donante", error: error.message });
  }
};

const deleteDonante = async (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM public.Donante WHERE id = $1';

  try {
      await Client.query(query, [id]);
      res.send("Donante Eliminado Correctamente");
  } catch (err) {
      console.error('Error al eliminar Donante:', err); // Imprime el error en la consola
      res.status(500).json({ message: "Error al eliminar Donante", err: err.message });
  }
}

const donantesByUser = async (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM public.donantes WHERE id_user = $1';

  try {
      const result = await Client.query(query, [id]);
      if (result.rows.length > 0) {
          res.json(result.rows);
      } else {
          res.status(404).json({ message: "Usuario no encontrado" });
      }
  } catch (err) {
      console.error('Error al requerir usuario:', err); // Imprime el error en la consola
      res.status(500).json({ message: "Error al requerir usuario", err: err.message });
  }
}

  
const donantes = {

  getDonantes,
  updateDonante,
  createDonante,
  idDonantes, 
  deleteDonante,
  donantesByUser, 
  alldonantes,
}
export default donantes