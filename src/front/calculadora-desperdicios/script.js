const ctx = document.getElementById('grafico-despesas').getContext('2d');
let chart = null;

const form = document.getElementById('desperdicio-form');
const resumoLista = document.getElementById('resumo-lista');

// Dados do desperdício inicial
const dataDesperdicio = {
    arroz: 0,
    carne: 0,
    graos: 0,
};

// Dados sobre o impacto ambiental por kg desperdiçado
const impactoCO2 = {
    arroz: 1.5,  // kg de CO2 por kg desperdiçado
    carne: 30,   // kg de CO2 por kg desperdiçado
    graos: 2,    // kg de CO2 por kg desperdiçado
};

// Adicionando evento ao formulário para capturar os dados
form.addEventListener('submit', (event) => {
    event.preventDefault();  // Evita o envio do formulário

    const item = document.getElementById('item').value;
    const quantidadeComprada = parseFloat(document.getElementById('quantidade-comprada').value);
    const quantidadeDesperdiciada = parseFloat(document.getElementById('quantidade-desperdiciada').value);

    // Verifica se os valores são válidos
    if (isNaN(quantidadeComprada) || isNaN(quantidadeDesperdiciada) || quantidadeDesperdiciada <= 0 || quantidadeComprada <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    // Atualiza o valor do desperdício para o item selecionado
    dataDesperdicio[item] += quantidadeDesperdiciada;

    // Atualiza o resumo e o gráfico
    atualizarResumo(quantidadeComprada, quantidadeDesperdiciada, item);
    atualizarGrafico();
});

// Atualiza a lista de resumo com os itens e valores
function atualizarResumo(quantidadeComprada, quantidadeDesperdiciada, item) {
    // Calcula a porcentagem de desperdício
    const porcentagem = (quantidadeDesperdiciada / quantidadeComprada) * 100;

    // Calcula o impacto em CO₂ com base no item
    const co2Emitido = impactoCO2[item] * quantidadeDesperdiciada;

    // Cria a mensagem para o resumo
    const mensagem = `Você desperdiçou ${porcentagem.toFixed(1)}% dos alimentos comprados, o que equivale a ${co2Emitido.toFixed(2)} kg de CO₂ emitidos.`;

    // Exibe a mensagem de impacto no resumo
    const itemResumo = document.createElement('li');
    itemResumo.textContent = mensagem;
    resumoLista.appendChild(itemResumo);
}

// Atualiza o gráfico com os novos dados
function atualizarGrafico() {
    if (chart) {
        chart.destroy();  // Destroi o gráfico antigo
    }

    // Cria um novo gráfico com os dados atualizados
    chart = new Chart(ctx, {
        type: 'pie',  // Tipo de gráfico (gráfico de pizza)
        data: {
            labels: Object.keys(dataDesperdicio),
            datasets: [{
                data: Object.values(dataDesperdicio),
                backgroundColor: ['#75B843', '#FF4D4D', '#FFD700'],
            }],
        },
    });
}
