const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
const authController = require('./authController');
const User = require('../models/userModel');

const secretKey = "greenmind";


exports.getCurrentUser = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    let idUsuario = "";

    if(!authController.isLoggedIn(token)) {
        return res.json({mensagem: "Usuário não está logado.", success: 0});
    } else {
        idUsuario = jwt.decode(token).id;
    }

    User.getUser(idUsuario).then((result) => {
        return res.json(result);
    }).catch(err => {
        console.log(err);
        return res.json(err.mensagem);
    }) ;
    // return res.json(result);
}

exports.getUsers = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!authController.isAdmin(token)) {
        return res.json({mensagem: "Usuário não tem permissão.", success: 0});
    }

    User.getUsers().then((result) => {
        return res.json(result);
    }).catch((err) => {
        return res.json(result);
    });
}

exports.changeUsername = (req, res) => {
    const { token, nome } = req.body;
    if(nome.length == 0) {
        return res.json({mensagem: "Preencha o nome", success: 0});
    }
    if(!authController.isLoggedIn(token)) 
    {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }
        
    let idUsuario = jwt.decode(token).id;
    
    User.updateName(idUsuario, nome).then((data) => {
        return res.json({mensagem: "Nome modificado com sucesso!", success: 1});
    }).catch((err) => {
        console.log(err);
        return res.json({mensagem: "Erro ao modificar nome", dados: err, success: 0});
    });
}

exports.changeEmail = (req, res) => {
    const { token, email } = req.body;
    if(email.length == 0) {
        return res.json({mensagem: "Preencha o email", success: 0});
    }
    if(!authController.isLoggedIn(token)) 
    {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }
        
    let idUsuario = jwt.decode(token).id;
    
    User.updateEmail(idUsuario, email).then((data) => {
        return res.json({mensagem: "Email modificado com sucesso!", success: 1});
    }).catch((err) => {
        console.log(err);
        return res.json({mensagem: "Erro ao modificar email", dados: err, success: 0});
    });
}

exports.changePassword = (req, res) => {
    const { token, senha } = req.body;
    if(senha.length == 0) {
        return res.json({mensagem: "Preencha a senha", success: 0});
    }
    if(!authController.isLoggedIn(token)) 
    {
        return res.json({mensagem: "Usuário não está logado", success: 0});
    }
        
    let idUsuario = jwt.decode(token).id;
    
    User.updatePassword(idUsuario, senha).then((data) => {
        return res.json({mensagem: "Senha modificada com sucesso!", success: 1});
    }).catch((err) => {
        console.log(err);
        return res.json({mensagem: "Erro ao modificar senha", dados: err, success: 0});
    });
}