// userController.js

// Importa cualquier módulo necesario, como el modelo de usuario o la conexión a la base de datos
const connection = require('../database/db'); // Supongamos que tienes una conexión a la base de datos


// Renderiza la página de perfil de usuario
exports.getPefilMaestro = async (req, res) => {
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
             res.render('maestroPerfil', {
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