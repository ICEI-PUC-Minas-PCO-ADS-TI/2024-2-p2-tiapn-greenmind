const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');

// POST

// Rota Login
router.post('/api/login', authController.signIn);

// Rota Cadastro
router.post('/api/cadastro', authController.signUp)


module.exports = router;