function calcularConsumo() {
  // Pegando os valores dos campos do formulário
  const potencia = parseFloat(document.getElementById('potencia').value); // Potência em Watts
  const diasUso = parseFloat(document.getElementById('diasUso').value); // Dias de uso
  const horaUso = parseFloat(document.getElementById('HoraUso').value); // Horas de uso por dia
  

  // Verificando se os valores são válidos
  if (isNaN(potencia) || isNaN(diasUso) || isNaN(horaUso) ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
  }

  // Calculando o consumo total em kWh
  const consumoKWh = potencia * horaUso * diasUso   / 1000;

  // Exibindo o resultado
  document.getElementById('resultado').innerText = `Desperdício Total em kWh: ${consumoKWh.toFixed(3)} kWh`;



// Virando a carta
document.querySelector('.carta').classList.add('flipped');
}

function virar() {
// Removendo a classe "flipped" para voltar à frente da carta
document.querySelector('.carta').classList.remove('flipped');
}





function calcularConsumoa() {
  const litros = parseFloat(document.getElementById('litros').value); // Consumo em metros cúbicos
  const diasUso = parseFloat(document.getElementById('diasUso').value); // Dias de uso
  const horaUso = parseFloat(document.getElementById('HoraUso').value); // Horas de uso por dia

  if (isNaN(litros) || isNaN(diasUso) || isNaN(horaUso)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Calculando o consumo total em Litros
  const consumolitros = litros * 1000 * horaUso * diasUso;

  // Exibindo o resultado
  document.getElementById('resultadoa').innerText = `Desperdício Total: ${consumolitros.toFixed(0)} Litros`;

  // Virando a carta
  document.querySelector('.carta').classList.add('flipped');
}

function virar() {
  // Removendo a classe "flipped" para voltar à frente da carta
  document.querySelector('.carta').classList.remove('flipped');
}