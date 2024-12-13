const db = require('../db/db_connection');
const bcrypt = require('bcrypt');

class UserModel {
    getUsers() {
        let query = 'SELECT * from usuario';
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if(err) return reject({mensagem: "Erro ao consultar usuários", erro: err.message, success: 0});

                return resolve({mensagem: "Usuários retornado", dados: result, success: 1});
            });
        });
    }
    
    getUser(id) {
        let query = 'SELECT idUsuario, nome, tipo_usuario from usuario WHERE idUsuario = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, result) => {
                if(err) return reject({mensagem: "Erro ao consultar usuário", erro: err.message, success: 0});

                return resolve({mensagem: "Usuário retornado", dados: result, success: 1});
            });
        });
    }

    updateName(id, nome) 
    {
        let query = 'UPDATE usuario SET nome = ? WHERE idUsuario = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [nome, id], (err, result) => {
                if(err) return reject({mensagem: "Erro ao tentar mudar o nome", erro: err.message, success: 0});
    
                return resolve({mensagem: "Nome mudado com sucesso", dados: result, success: 1});
            });
        })
    }

    updateEmail(id, email) 
    {
        let query = 'UPDATE usuario SET email = ? WHERE idUsuario = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [email, id], (err, result) => {
                if(err) return reject({mensagem: "Erro ao tentar mudar o email", erro: err.message, success: 0});
    
                return resolve({mensagem: "Usuário cadastrado com sucesso", dados: result, success: 1});
            });
        })
    }

    updatePassword(id, senha) 
    {
        let query = 'UPDATE usuario SET senha = ? WHERE idUsuario = ?';
        return new Promise((resolve, reject) => {
            bcrypt.hash(senha, 4).then((senhaCriptografada) => { 
                db.query(query, [senhaCriptografada, id], (err, result) => {
                    if(err) return reject({mensagem: "Erro ao tentar mudar a senha", erro: err.message, success: 0});
        
                    return resolve({mensagem: "Senha mudada com sucesso", dados: result, success: 1});
                });
            });
        });
    }
}

module.exports = new UserModel();