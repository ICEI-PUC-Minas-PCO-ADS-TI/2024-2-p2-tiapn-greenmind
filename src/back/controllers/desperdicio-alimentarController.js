const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

exports.salvarDados = (req, res) => {
    const { item, quantidadeDesperdiciada, quantidadeComprada, dataRegistro, token } = req.body;

    
    if(!authController.isLoggedIn(token)) {
        console.log("deslogado");
        return res.status(500).json({message: "Usuário deve estar logado"})
    }
    
    const idUsuario = jwt.decode(token).id;

    const query = `
    INSERT INTO DesperdiciosAlimentares (data_registro, quantidade_desperdicada, tipo_alimento, quantidade_comprada, id_usuario)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [
        dataRegistro,
        quantidadeDesperdiciada,
        item,
        quantidadeComprada,
        idUsuario
    ], (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json({ error: 'Erro ao salvar os dados no banco de dados' });
        }
        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    });
}

exports.getHistoricoDados = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log(token);
    
    if(!authController.isLoggedIn(token)) {
        return res.status(500).json({message: "Usuário deve estar logado"})
    }
    
    const idUsuario = jwt.decode(token).id;

    const query = `SELECT * FROM DesperdiciosAlimentares WHERE id_usuario = ? ORDER BY data_registro DESC`;

    db.query(
        query, [
            idUsuario
        ], (err, result) => {
            if(err) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao buscar dados históricos' });
            }
            res.status(200).json(result); 
    });
}