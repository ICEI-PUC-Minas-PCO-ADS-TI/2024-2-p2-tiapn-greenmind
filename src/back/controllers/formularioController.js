const atendimentoModel = require('../models/formularioModel');

class formularioController {

    getFormulario() {
        return atendimentoModel.listar();
    }
}

module.exports = new formularioController();
