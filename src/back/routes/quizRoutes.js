const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST

// Rota Favoritar
router.post('/api/analiseQuiz', quizController.analiseQuiz);

module.exports = router;