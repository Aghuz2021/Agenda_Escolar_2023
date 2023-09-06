// userController.js

// Importa cualquier módulo necesario, como el modelo de usuario o la conexión a la base de datos
const connection = require('../database/db'); // Supongamos que tienes una conexión a la base de datos


// Renderiza la página de perfil de usuario
exports.getPefilMaestro = async (req, res) => {
    try {
        // Obtiene el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;

        // Realiza una consulta a la base de datos para obtener la información del usuario
        connection.query('SELECT * FROM users WHERE id = ?', [userId], async (error, results) => {
            if (error) {
                // Maneja el error de la consulta
                console.error('Error en la consulta de perfil de usuario:', error);
                res.status(500).render('error', { message: 'Error interno del servidor' });
            } else if (results.length === 0) {
                // No se encontró el usuario
                res.render('error', { message: 'Usuario no encontrado' });
            } else {
                // Usuario encontrado, muestra el perfil
                const user = results[0];
                res.render('./views_Maestro/maestroPerfil', { user });
            }
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).render('error', { message: 'Error interno del servidor' });
    }
};

