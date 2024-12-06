const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');

const secretKey = "greenmind";

// AINDA PRECISO IMPLEMENTAR A PARTE DE VERIFICAR O LOGIN EM CADA PÁGINA E TAMBÉM A PARTE DE LOGOUT.

exports.signUp = (req, res) => {
    const { usuario, email, senha } = req.body;
    let nome = usuario;

    if(nome.length == 0 || email.length == 0 || senha.length == 0) {
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

    let query = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';

    db.query(query, [email, senha], (err, result) => {
        if(err) return res.json({mensagem: "Erro no processo de login", erro: err.message});

        if(result.length == 0) {
            return res.json({mensagem: "Verifique o Email e a Senha e tente novamente.", dados: result});
        }

        const user = result[0];

        const token = jwt.sign(
            {
                id: user.idUsuario,
                nome: user.nome,
                email: user.email,
                tipo_usuario: user.tipo_usuario,
            },
            secretKey
        );
        
        return res.json({mensagem: "Logado com sucesso!", dados: result, success: 1, token: token});
    });
}

exports.isLoggedIn = (token) => {
    if(!token) {
        return false;
    }

    try {
        let dadosToken = jwt.verify(token, secretKey);
        return true;
    }
    catch(err) {
        return false;
    }
}

exports.isAdmin = (token) => {
    if(!this.isLoggedIn(token)) {
        return false;
    }

    try {
        let dadosToken = jwt.verify(token, secretKey);

        if(dadosToken.tipo_usuario == "admin") {
            return true;
        }
        return false;
    }
    catch(err) {
        return false;
    }
}
