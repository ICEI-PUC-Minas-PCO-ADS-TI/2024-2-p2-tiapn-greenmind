const express = require('express');
const path = require('path');
const router = express.Router();
const pontosController = require('../controllers/pontosController');

// GET
// Rota Pegar favoritos
router.get('/api/pontosreciclagem', pontosController.getFavorites)

// POST

// Rota Favoritar
router.post('/api/pontosreciclagem', pontosController.addFavorite);

module.exports = router;