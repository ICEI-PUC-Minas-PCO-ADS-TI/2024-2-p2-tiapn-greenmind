const express = require('express');
const path = require('path');
const router = express.Router();
const desperdicioAlimentarController = require('../controllers/desperdicio-alimentarController');

router.post('/api/salvar-dados', desperdicioAlimentarController.salvarDados);

router.get('/api/historico-dados', desperdicioAlimentarController.getHistoricoDados);


module.exports = router;