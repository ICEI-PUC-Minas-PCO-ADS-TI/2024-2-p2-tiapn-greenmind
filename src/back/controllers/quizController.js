exports.analiseQuiz = (req, res) => {
    const { respostas } = req.body;

    if (!respostas || typeof respostas !== "string") {
        return res.status(400).json({ error: "Respostas inválidas." });
    }

    // Mapeamento de impacto por questão e resposta
    const impactoPorResposta = [
        [0.09, 0.2, 0.4],          // Questão 1: Consumo de alimentos locais
        [0.09, 0.4],               // Questão 2: Possui horta em casa
        [0.09, 0.4, 0.6],          // Questão 3: Consumo de produtos embalados
        [0.4, 0.3, 0.2, 0.09],     // Questão 4: Meio de transporte mais usado
        [0.09, 0.4],               // Questão 5: Redução de consumo de água/energia
        [0.09, 0.4, 0.6, 0.8],     // Questão 6: Tempo de banho diário
        [0.09, 0.4, 0.6],          // Questão 7: Compra de eletrônicos
        [0.09, 0.4],               // Questão 8: Busca por informações de sustentabilidade
        [0.09, 0.4],               // Questão 9: Prática de coleta seletiva
        [0.09, 0.4],               // Questão 10: Realiza compostagem
        [0.09, 0.4]                // Questão 11: Reaproveitamento de água
    ];
    
    let quantidadePlanetas = 0;

    for (let i = 0; i < respostas.length; i++) {
        const resposta = parseInt(respostas[i]); // Resposta selecionada (1, 2 ou 3)
        if (isNaN(resposta) || resposta < 1 || resposta > impactoPorResposta[i]?.length) {
            return res.status(400).json({ error: `Resposta inválida na questão ${i + 1}` });
        }
        quantidadePlanetas += impactoPorResposta[i][resposta - 1]; // Adiciona o impacto correspondente
    }

    // Arredonda ou mantém casas decimais, se necessário
    quantidadePlanetas = Math.round(quantidadePlanetas * 10) / 10;

    // Retorna o resultado
    res.json({ quantidadePlanetas });
}