module.exports = (req, res, next) => {
   if (!req.dni)
       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   next();
};
module.checkAdminRole = (req, res, next) => {
    // Verifica el rol del usuario, asumiendo que 'rol' está configurado en la sesión del usuario
    req.session.loggedin = true;
    req.session.nombre = results[0].nombre;
    req.session.rol = results[0].rol;
    
    if (req.session.rol === 'admin') {
        next(); // Permite el acceso al formulario
    } else {
        res.status(403).send('Acceso denegado. Debes ser un administrador.');
    }
};