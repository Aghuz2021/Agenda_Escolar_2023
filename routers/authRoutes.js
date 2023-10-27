const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);

router.post('/auth', authController.postAuth);


module.exports = router;
