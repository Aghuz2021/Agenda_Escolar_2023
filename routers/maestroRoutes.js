const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestroController'); // Importa el controlador de perfil de usuario

// Ruta para mostrar el perfil de usuario
router.get('/my-perfil/:nombre/:id', maestroController.getPefilMaestro);



module.exports = router;
