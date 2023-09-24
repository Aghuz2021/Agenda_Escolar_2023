const connection = require('../database/db');
const cacheMiddleware = require('../middlewares/cacheMiddleware');
const CreateRegistro = require('../controllers/crudController');


exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { usuario, nombre, rol, contrasenia } = req.body;


    const userData = {
        usuario,
        nombre,
        rol,
        contrasenia
    };

    const renderOptions = {
        view: 'login',
        title: 'Correcto',
        message: `¡Registro exitoso de ${nombre}!`
    };
    CreateRegistro(connection, userData, res, renderOptions);

    
};

exports.postAuth = async (req, res) => {
    const { usuario, contrasenia, rol } = req.body;
    
    if (usuario && contrasenia && rol) {
        connection.query('SELECT * FROM users WHERE usuario = ? AND contrasenia = ? AND rol = ?', [usuario, contrasenia, rol], async (error, results) => {
            console.log(results.length === 0) 
            if (error) {
                // Manejar el error de la consulta
                res.status(500).send('Error interno del servidor');
                
            } else if (results.length === 0) { // se evalúa como verdadera si la consulta SQL no encontró ningún resultado,
                // No se encontró un usuario
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Credenciales incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    ruta: 'login',
                    timer: 10000,
                });
            } else {
                // Usuario encontrado, iniciar sesión
                req.session.loggedin = true;
                req.session.nombre = results[0].nombre;
                req.session.rol = results[0].rol;
                if ( results[0].rol == 'maestro'){
                    // Corrección: redirigir al perfil del usuario usando results[0].id
                    res.redirect(`/user/my-perfil/${results[0].nombre}/${results[0].id}`)
                }else if(results[0].rol = 'admin'){
                    // Corrección: redirigir al perfil del usuario usando results[0].id
                    res.redirect(`/user/my-perfil-admin/${results[0].nombre}/${results[0].id}`)
                }
                
            }
        });
    } 
};
