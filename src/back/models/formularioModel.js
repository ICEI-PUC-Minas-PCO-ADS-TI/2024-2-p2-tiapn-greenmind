const conexao = require("../db/db_connection.js");

class FormularioModel {
    listar() {
        const sql = `
            SELECT 
                p.id AS idPergunta,
                p.titulo AS tituloPergunta,
                a.id AS alternativaId,
                a.perguntaMsg,
                a.msgErro,
                a.isRespostaErrada
            FROM 
                perguntasForm p
            LEFT JOIN 
                alternativasForm a 
            ON 
                p.id = a.idPergunta;
        `;

        return new Promise((resolve, reject) => {
            conexao.query(sql, {}, (error, results) => {
                if (error) {
                    console.log(error.message);
                    return reject(error);
                }

                // Transformar os resultados em JSON estruturado
                const perguntas = {};

                results.forEach(row => {
                    const { idPergunta, tituloPergunta, alternativaId, perguntaMsg, msgErro, isRespostaErrada } = row;

                    if (!perguntas[idPergunta]) {
                        perguntas[idPergunta] = {
                            idPergunta,
                            tituloPergunta,
                            alternativas: []
                        };
                    }

                    if (alternativaId) {
                        perguntas[idPergunta].alternativas.push({
                            id: alternativaId,
                            perguntaMsg,
                            msgErro,
                            isRespostaErrada: Boolean(isRespostaErrada),
                        });
                    }
                });

                // Converter o objeto em um array
                const formattedResults = Object.values(perguntas);

                resolve(formattedResults);
            });
        });
    }
}

module.exports = new FormularioModel();
