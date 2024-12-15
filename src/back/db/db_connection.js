const mysql = require('mysql2');
const { env } = require('process');

const db = mysql.createConnection({
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "root", // SUBSTITUA pelo seu usuário no banco de dados
    password: env.DB_PASSWORD || "root", // SUBSTITUA pela sua senha no banco de dados
    database: env.DB_DATABASE || "greenmindtestesprint4",
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
