const connection = require('../database/db');

exports.getPefilAdmin = async (req, res) => {
   try {
      const userId = req.params.id;
      connection.query('SELECT * FROM usuarios WHERE id = ?', [userId], async (error, results) => {
         if (error) {
            console.error('Error en la consulta de perfil de usuario:', error);
            res.status(500).render('error', {
               message: 'Error interno del servidor'
            });
         } else if (results.length === 0) {
            res.render('error', {
               message: 'Usuario no encontrado'
            });
         } else {
            const user = results[0];
            res.render('adminPerfil', {
               user
            });
         }
      });
   } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      res.status(500).render('error', {
         message: 'Error interno del servidor'
      });
   }
};

exports.getCreateAlumno = (req, res) => {
   
   res.render('createAlumno')
   
};
exports.getCreateMateria = (req, res) => {
   
   res.render('createmateria')
   
};
exports.getVisualizarPerfil = (req, res) => {
   try {
      const userId = req.params.id;
      connection.query('SELECT * FROM usuarios WHERE id = ?', [userId], async (error, results) => {
         if (error) {
            console.error('Error en la consulta de perfil de usuario:', error);
            res.status(500).render('error', {
               message: 'Error interno del servidor'
            });
         } else if (results.length === 0) {
            res.render('error', {
               message: 'Usuario no encontrado'
            });
         } else {
            
            const user = results[0];
            res.render('adminVisual', {
               user
            });
         }
      });
   } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      res.status(500).render('error', {
         message: 'Error interno del servidor'
      });
   }
   
};




exports.postCreateAlumno = (req, res) => {
   // Aquí debes implementar la lógica para insertar un alumno en la base de datos
   // Puedes acceder a los datos del formulario a través de req.body

   // Ejemplo de inserción:
   const alumnoData = {
      rol: req.body.rol,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dni: req.body.dni,
      fecha_nacimiento: req.body.fecha_nacimiento,
      correo: req.body.correo,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      contrasenia: req.body.contrasenia,
      estado: 1
   };

   connection.query('INSERT INTO usuarios SET ?', alumnoData, (error, results) => {
      if (error) {
         console.error('Error al insertar alumno:', error);
         res.status(500).render('error', {
            message: 'Error al crear el alumno'
         });
      } else {
         console.log('Alumno creado con éxito');
         const { nombre, id } = req.params;
         res.render('createAlumno', {
            alert: true,
            alertTitle: "Éxito",
            alertMessage: "Alumno creado con éxito",
            alertIcon: 'success',
            showConfirmButton: true,
            ruta: `user/my-perfil-admin/${nombre}/${id}/`, // Utiliza las variables nombre e id
            timer: 10000,
        });
      }
   });
   
};
exports.alumnoData = (req, res) => {
   try {
      // Modificar la consulta SQL para seleccionar todos los usuarios con rol "Estudiante"
      connection.query('SELECT * FROM usuarios WHERE rol = "Estudiante"', async (error, results) => {
         if (error) {
            console.error('Error en la consulta de perfil de usuarios:', error);
            res.status(500).render('error', {
               message: 'Error interno del servidor'
            });
         } else {
            // No es necesario verificar si results.length === 0
            const usuarios = results; // Obtener todos los usuarios con rol "Estudiante"
            res.render('adminAlumnosData', {
               usuarios: usuarios // Enviar la matriz de usuarios a la plantilla
            });
         }
      });
   } catch (error) {
      console.error('Error al obtener los perfiles de usuarios:', error);
      res.status(500).render('error', {
         message: 'Error interno del servidor'
      });
   }
};