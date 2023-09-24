const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Importa el controlador de perfil de usuario

// Ruta para mostrar el perfil de usuario
router.get('/my-perfil-admin/:nombre/:id', adminController.getPefilAdmin);



module.exports = router;
