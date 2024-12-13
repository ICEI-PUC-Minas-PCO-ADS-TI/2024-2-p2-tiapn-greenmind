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

    console.log(req.body);

    console.log(nome);
    console.log(endereco);
    console.log(token);

    if(!authController.isLoggedIn(token)) {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }else {
        idUsuario = jwt.decode(token).id;
    }

    let query = 'INSERT INTO pontodereciclagem(id_usuario, nome, endereco) VALUES(?, ?, ?)';
    db.query(query, [idUsuario, nome, endereco], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de favoritar", success: 0, erro: err.message});

        return res.json({mensagem: "Favoritado com sucesso!", success: 1});
    });
};