const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const pontosRoutes = require('./routes/pontosRoutes');
const userRoutes = require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const formularioRoutes = require('./routes/form-router');
const desperdicioAlimentarRoutes = require('./routes/desperdicio-alimentarRoutes');

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
app.get('/api', (req, res) => {
    res.json("Tudo OK!");
});

// Rotas Cadastro e Login, backend
app.use(authRoutes);
// Rotas pontos de reciclagem mapa
app.use(pontosRoutes);
// Rotas usuários
app.use(userRoutes);
// Rota para o quiz
app.use(quizRoutes);
// Rota para o formulario
app.use(formularioRoutes);
// Rota para desperdício de alimentos
app.use(desperdicioAlimentarRoutes);


// PADRÃO, para rotas não mapeadas.
app.use((req, res) => {
    res.json("404, essa página não existe");
});