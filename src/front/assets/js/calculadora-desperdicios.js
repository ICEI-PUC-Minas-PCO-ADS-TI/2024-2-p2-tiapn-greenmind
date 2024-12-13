const ctx = document.getElementById('grafico-despesas').getContext('2d');
let chart = null;
const backURL = "http://localhost:3000/api"

const form = document.getElementById('desperdicio-form');
const resumoLista = document.getElementById('resumo-lista');

const dataDesperdicio = {
    arroz: 0,
    carne: 0,
    graos: 0,
};

const impactoCO2 = {
    arroz: 1.5,  
    carne: 30,   
    graos: 2,    
};


form.addEventListener('submit', async (event) => {
    event.preventDefault();  

    const item = document.getElementById('item').value;
    const quantidadeComprada = parseFloat(document.getElementById('quantidade-comprada').value);
    const quantidadeDesperdiciada = parseFloat(document.getElementById('quantidade-desperdiciada').value);

    if (isNaN(quantidadeComprada) || isNaN(quantidadeDesperdiciada) || quantidadeDesperdiciada <= 0 || quantidadeComprada <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    if (!dataDesperdicio.hasOwnProperty(item)) {
        alert("Item inválido. Escolha entre arroz, carne ou grãos.");
        return;
    }

    dataDesperdicio[item] += quantidadeDesperdiciada;

    const impacto = impactoCO2[item] * quantidadeDesperdiciada;

    await salvarNoBanco(item, quantidadeDesperdiciada, quantidadeComprada, new Date().toISOString().split("T")[0]);

    atualizarResumo(quantidadeComprada, quantidadeDesperdiciada, item, impacto);
    atualizarGrafico();
});

function atualizarResumo(quantidadeComprada, quantidadeDesperdiciada, item, impacto) {
    const porcentagem = (quantidadeDesperdiciada / quantidadeComprada) * 100;
    const mensagem = `Você desperdiçou ${porcentagem.toFixed(1)}% dos alimentos comprados, o que equivale a ${impacto.toFixed(2)} kg de CO₂ emitidos.`;

    const itemResumo = document.createElement('li');
    itemResumo.textContent = mensagem;
    resumoLista.appendChild(itemResumo);
}

function atualizarGrafico() {
    if (chart) {
        chart.data.datasets[0].data = Object.values(dataDesperdicio);  // Atualiza os dados no gráfico existente
        chart.update();  
    } else {
        chart = new Chart(ctx, {
            type: 'pie',  
            data: {
                labels: Object.keys(dataDesperdicio),
                datasets: [{
                    data: Object.values(dataDesperdicio),
                    backgroundColor: ['#75B843', '#FF4D4D', '#FFD700'],
                }],
            },
        });
    }
}

// ****************************************
async function salvarNoBanco(item, quantidadeDesperdiciada, quantidadeComprada, dataRegistro) {

    const response = await fetch(`${backURL}/salvar-dados`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item: item,
            quantidadeDesperdiciada: quantidadeDesperdiciada,
            quantidadeComprada: quantidadeComprada,
            dataRegistro: dataRegistro,
            token: localStorage.getItem('token')
        }),
    });

    if (!response.ok) {
        alert('Erro ao salvar os dados.');
    }
}

async function carregarHistorico() {
    const tabelaHistorico = document.querySelector('#historico-pedidos tbody');
    tabelaHistorico.innerHTML = ''; 

    try {
        const response = await fetch(`${backURL}/historico-dados`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            alert('Erro ao carregar o histórico.');
            return;
        }

        console.log(response);

        const dados = await response.json();
        console.log(dados)
        dados.forEach(dado => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${dado.tipo_alimento}</td>
                <td>${parseFloat(dado.quantidade_comprada).toFixed(2)}</td>
                <td>${parseFloat(dado.quantidade_desperdicada).toFixed(2)}</td>
                <td>${new Date(dado.data_registro).toISOString().split("T")[0]}</td>
            `;

            tabelaHistorico.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        alert('Erro ao buscar os dados do histórico.');
    }
}

document.addEventListener('DOMContentLoaded', carregarHistorico);