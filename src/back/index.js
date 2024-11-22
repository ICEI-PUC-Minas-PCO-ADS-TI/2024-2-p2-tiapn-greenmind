const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "../frontend/assets")));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Processamento requests

// GET
app.get('/', (req, res) => {
    res.json("Tudo OK!");
});

// Rotas Cadastro e Login, backend
app.use(authRoutes);

// PADRÃO, para rotas não mapeadas.
app.use((req, res) => {
    res.json("404, essa página não existe");
});