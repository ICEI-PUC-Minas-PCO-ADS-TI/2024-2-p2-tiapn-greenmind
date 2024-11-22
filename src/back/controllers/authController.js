const db = require('../db/db_connection');

exports.signUp = (req, res) => {
    const { usuario, email, senha } = req.body;
    let nome = usuario;

    if(nome.length == 0 || email.length == 0 || senha == 0) {
        return res.json({mensagem: "Erro! Preencha todos os dados."});
    }

    // Não faz sentido nenhum fazer 2 requisições ao banco de dados, mudar para só uma. Faz sim.
    let query = 'SELECT COUNT(*) AS count FROM usuario WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de login", erro: err.message});

        if(result[0].count > 0) {
            return res.json({mensagem: "Usuário já cadastrado"});
        }

        let dataHoje = new Date().toISOString().split("T")[0];
        let query = 'INSERT INTO usuario (nome, email, senha, data_cadastro) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, email, senha, dataHoje], (err, result) => {
            if(err) return res.json({mensagem: "Erro ao cadastrar usuário", erro: err.message});

            res.json({mensagem: "Usuário cadastrado com sucesso", dados: result, success: 1});
        });
    });
}

exports.signIn = (req, res) => {
    const { email, senha } = req.body;

    let query = 'SELECT COUNT(*) AS count FROM usuario WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de login", erro: err.message});

        if(result[0].count == 0) {
            return res.json({mensagem: "Verifique o Email e a Senha e tente novamente.", dados: result});
        }
        
        return res.json({mensagem: "Logado com sucesso!", dados: result, success: 1});
    });
}