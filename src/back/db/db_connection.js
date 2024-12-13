const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // SUBSTITUA pelo seu usuário no banco de dados
    password: "root", // SUBSTITUA pela sua senha no banco de dados
    database: "greenmindtestesprint4",
    port: "" // Porta. Por padrão, eu deixo vazio.
});

var conn=mysql.createConnection({host:"greenmind-db-server.mysql.database.azure.com", user:"nwwatgofht", password:"senha!23", database:"greenmindtestesprint4", port:3306});

conn.connect((err) => {
    if(err) {
        console.log("Erro ao tentar se conectar com o banco de dados!" + err.stack);
        console.log("Certifique-se de que o banco de dados foi iniciado corretamente e de que as credenciais estão corretas.\n" + err.stack);
        return;
    }
    console.log("Conectado com o banco de dados");
});

module.exports = conn;
