const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Importa el controlador de perfil de usuario
const checkAdminRole = require('../middlewares/cacheMiddleware');

// Ruta para mostrar el perfil de usuario
router.get('/my-perfil-admin/:nombre/:id',checkAdminRole, adminController.getPefilAdmin);

router.get('/my-perfil-admin/:nombre/:id/create-alumno', checkAdminRole, adminController.getCreateAlumno);
router.get('/my-perfil-admin/:nombre/:id/create-materia', checkAdminRole, adminController.getCreateMateria);
router.get('/my-perfil-admin/:nombre/:id/visualizarData',checkAdminRole,adminController.getVisualizarPerfil);
router.get('/my-perfil-admin/:nombre/:id/alumno-Data',checkAdminRole,adminController.alumnoData);
// Ruta para procesar la creación de alumnos (POST)
router.post('/my-perfil-admin/:nombre/:id/create-alumno', checkAdminRole, adminController.postCreateAlumno);


module.exports = router;
