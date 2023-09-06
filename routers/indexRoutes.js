const express = require('express');
const router = express.Router();
const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.get('/', cacheMiddleware, (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            rol: req.session.rol,
            nombre: req.session.nombre
        });
    } else {
        res.render('index', {
            login: false,
            nombre: 'Debe iniciar sesión'
        });
    }
});

module.exports = router;
