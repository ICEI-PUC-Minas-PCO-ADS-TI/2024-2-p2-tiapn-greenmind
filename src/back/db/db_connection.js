const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // SUBSTITUA pelo seu usuário no banco de dados
    password: "root", // SUBSTITUA pela sua senha no banco de dados
    database: "greenmindtestesprint4",
    port: "" // Porta. Por padrão, eu deixo vazio.
});

db.connect((err) => {
    if(err) {
        console.log("Erro ao tentar se conectar com o banco de dados!" + err.stack);
        console.log("Certifique-se de que o banco de dados foi iniciado corretamente e de que as credenciais estão corretas.\n" + err.stack);
        return;
    }
    console.log("Conectado com o banco de dados");
});

module.exports = db;
