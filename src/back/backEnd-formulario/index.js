const express = require ("express");
const app = express();
const router = require ("./routers/index");
const conexao = require ("./connection/conexao");
const tabelas = require ("./connection/tabelas");
const cors = require("cors");

app.use(cors());

tabelas.init(conexao);
router(app);

app.listen(3000, (error) => {
    if (error) {
        console.log('error', error);
        return
    }
    console.log("servidor rodando na porta 3000");
});