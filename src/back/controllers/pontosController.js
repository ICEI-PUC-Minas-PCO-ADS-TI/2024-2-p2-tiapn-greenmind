const db = require('../db/db_connection');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');

exports.getFavorites = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    let idUsuario = "";
    
    if(!authController.isLoggedIn(token)) {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }else {
        idUsuario = jwt.decode(token).id;
    }

    let query = 'SELECT * FROM pontodereciclagem WHERE id_usuario = ?';
    db.query(query, [idUsuario], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de buscar os favoritos", success: 0, erro: err.message});

        return res.json({mensagem: "Favoritos retornados", dados: result, success: 1});
    });
};

exports.addFavorite = (req, res) => {
    const { nome, endereco, token } = req.body;
    let idUsuario = "";

    if(!authController.isLoggedIn(token)) {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }else {
        idUsuario = jwt.decode(token).id;
    }

    let query = 'SELECT COUNT(*) AS count FROM pontodereciclagem WHERE nome = ? AND endereco = ? AND id_usuario = ?';
    db.query(query, [nome, endereco, idUsuario], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de favoritar ponto", erro: err.message});

        if(result[0].count > 0) {
            return res.json({mensagem: "Você já favoritou esse ponto", success: 0});
        }

        query = 'INSERT INTO pontodereciclagem(id_usuario, nome, endereco) VALUES(?, ?, ?)';
        db.query(query, [idUsuario, nome, endereco], (err, result) => {
            if(err) return res.json({mensagem: "Erro no processo de favoritar", success: 0, erro: err.message});
    
            return res.json({mensagem: "Favoritado com sucesso!", success: 1});
        });
    });

};