let countdownInterval;
let countdownTime = 2 * 60 * 60;

function startTimer() {
    document.getElementById("startReminder").style.display = "none";
    document.getElementById("stopReminder").style.display = "inline-block";
    countdownTime = 2 * 60 * 60;
    updateCountdownDisplay();
    
    countdownInterval = setInterval(() => {
        countdownTime--;
        updateCountdownDisplay();
        
        if (countdownTime <= 0) {
            alert("Hora de beber água!");
            countdownTime = 2 * 60 * 60;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdownInterval);
    document.getElementById("startReminder").style.display = "inline-block";
    document.getElementById("stopReminder").style.display = "none";
    document.getElementById("countdown").innerText = "";
}

function updateCountdownDisplay() {
    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    document.getElementById("countdown").innerText = 
        `Tempo restante: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function marcarConcluido() {
    const statusDiv = document.getElementById("status");
    if (statusDiv) {
        statusDiv.innerHTML = "Desafio concluído!";
        statusDiv.style.color = "green";
    }
}
function registrarItens() {
    const item1 = document.getElementById('item1').value;
    const item2 = document.getElementById('item2').value;
    const item3 = document.getElementById('item3').value;

    if (item1 && item2 && item3) {
        document.getElementById('statusMessage').textContent = 
            `Parabéns! Você reciclou: ${item1}, ${item2}, e ${item3}. Continue assim!`;
        document.getElementById('statusMessage').style.color = '#388e3c';
    } else {
        document.getElementById('statusMessage').textContent = 
            'Por favor, preencha todos os campos para registrar os itens reciclados.';
        document.getElementById('statusMessage').style.color = '#d32f2f';
    }
    document.getElementById('item1').value = '';
    document.getElementById('item2').value = '';
    document.getElementById('item3').value = '';
}
function registrarTrajeto() {
    const distancia = document.getElementById('distance').value;
    const modo = document.getElementById('mode').value;

    if (distancia && modo) {
        const impacto = calcularImpacto(distancia, modo);
        document.getElementById('statusMessage').innerHTML = `
            <p>Parabéns! Você percorreu <strong>${distancia} km</strong> de <strong>${modo}</strong>.
            Isso ajudou a evitar a emissão de aproximadamente <strong>${impacto} kg</strong> de CO₂.</p>
        `;
        document.getElementById('statusMessage').style.color = '#1b5e20';
    } else {
        document.getElementById('statusMessage').textContent = 
            'Por favor, preencha todos os campos antes de registrar.';
        document.getElementById('statusMessage').style.color = '#d32f2f';
    }
    document.getElementById('distance').value = '';
    document.getElementById('mode').value = 'bicicleta';
}

function calcularImpacto(distancia, modo) {
    const coeficiente = modo === 'bicicleta' ? 0.2 : 0.3;
    return (distancia * coeficiente).toFixed(2);
}
let totalSacolasEvitadas = 0;

function registrarUso() {
    const bagsAvoided = parseInt(document.getElementById('bagsAvoided').value);

    if (bagsAvoided && bagsAvoided > 0) {
        totalSacolasEvitadas += bagsAvoided;
        const impacto = calcularImpacto(totalSacolasEvitadas);

        const listItem = document.createElement('li');
        listItem.textContent = `Você evitou ${bagsAvoided} sacolas hoje. Total acumulado: ${totalSacolasEvitadas} sacolas evitadas!`;

        document.getElementById('impactList').appendChild(listItem);
        document.getElementById('statusMessage').innerHTML = `
            <p>Parabéns! Ao evitar sacolas plásticas, você está ajudando a preservar nosso planeta. 
            Isso significa menos plástico nos oceanos e aterros!</p>
        `;
        document.getElementById('statusMessage').style.color = '#33691e';
    } else {
        document.getElementById('statusMessage').textContent =
            'Por favor, insira um número válido de sacolas.';
        document.getElementById('statusMessage').style.color = '#d32f2f';
    }
    document.getElementById('bagsAvoided').value = '';
}

function calcularImpacto(sacolas) {
    const impactoCO2 = sacolas * 0.02;
    return impactoCO2.toFixed(2);
}
let totalDiasCompostagem = 0;

function registrarCompostagem() {
    const daysComposted = parseInt(document.getElementById('daysComposted').value);

    if (daysComposted && daysComposted > 0) {
        totalDiasCompostagem += daysComposted;
        const impacto = calcularImpacto(totalDiasCompostagem);

        const listItem = document.createElement('li');
        listItem.textContent = `Você fez compostagem por ${daysComposted} dias. Total acumulado: ${totalDiasCompostagem} dias!`;

        document.getElementById('impactList').appendChild(listItem);
        document.getElementById('statusMessage').innerHTML = `
            <p>Parabéns! Você está contribuindo para reduzir resíduos e criar um futuro mais sustentável.</p>
        `;
    } else {
        document.getElementById('statusMessage').textContent =
            'Por favor, insira um número válido de dias.';
        document.getElementById('statusMessage').style.color = '#d32f2f';
    }
    document.getElementById('daysComposted').value = '';
}

function calcularImpacto(dias) {
    const impactoResiduos = dias * 0.5;
    return impactoResiduos.toFixed(2);
}

function registrarCultivo() {
    const herb = document.getElementById('herb').value;
    const daysCultivated = parseInt(document.getElementById('daysCultivated').value);

    if (daysCultivated && daysCultivated > 0) {
        const listItem = document.createElement('li');
        listItem.textContent = `Você está cultivando ${herb} há ${daysCultivated} dias. Continue cuidando bem dela!`;

        document.getElementById('progressList').appendChild(listItem);

        document.getElementById('statusMessage').innerHTML = `
            <p>Parabéns! Você está ajudando o meio ambiente e tornando seu lar mais verde!</p>
        `;
    } else {
        document.getElementById('statusMessage').textContent =
            'Por favor, insira um número válido de dias.';
        document.getElementById('statusMessage').style.color = '#d32f2f';
    }
    document.getElementById('herb').value = 'manjericão';
    document.getElementById('daysCultivated').value = '';
}
function registrarCompromissos() {
    const checkboxes = document.querySelectorAll('#plasticForm input[type="checkbox"]:checked');
    const commitmentList = document.getElementById('commitmentList');
    const statusMessage = document.getElementById('statusMessage');

    if (checkboxes.length === 0) {
        statusMessage.textContent = 'Por favor, selecione pelo menos uma ação.';
        statusMessage.style.color = '#d32f2f';
        return;
    }
    commitmentList.innerHTML = '';

    checkboxes.forEach(checkbox => {
        const listItem = document.createElement('li');
        listItem.textContent = checkbox.value;
        commitmentList.appendChild(listItem);
    });

    statusMessage.textContent = 'Compromissos registrados com sucesso! Parabéns por contribuir com o meio ambiente!';
    statusMessage.style.color = '#0d47a1';
    checkboxes.forEach(checkbox => (checkbox.checked = false));
}
function registrarCompromissos() {
    const checkboxes = document.querySelectorAll('#paperForm input[type="checkbox"]:checked');
    const commitmentList = document.getElementById('commitmentList');
    const statusMessage = document.getElementById('statusMessage');

    if (checkboxes.length === 0) {
        statusMessage.textContent = 'Por favor, selecione pelo menos uma ação.';
        statusMessage.style.color = '#d32f2f';
        return;
    }
    commitmentList.innerHTML = '';

    checkboxes.forEach(checkbox => {
        const listItem = document.createElement('li');
        listItem.textContent = checkbox.value;
        commitmentList.appendChild(listItem);
    });

    statusMessage.textContent = 'Compromissos registrados com sucesso! Obrigado por ajudar a preservar o meio ambiente.';
    statusMessage.style.color = '#2e7d32';
    checkboxes.forEach(checkbox => (checkbox.checked = false));
}
