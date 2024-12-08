const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

// GET

// Rota Pegar Informações Usuários
router.get('/api/user/all', userController.getUsers);
router.get('/api/user', userController.getCurrentUser);

// PUT

// Rotas Mudar Informações Usuário
router.patch('/api/user/changeusername', userController.changeUsername);
router.patch('/api/user/changeemail', userController.changeEmail);
router.patch('/api/user/changepassword', userController.changePassword);

// Rota Cadastro
// router.post('/api/cadastro', a.signUp)

module.exports = router;