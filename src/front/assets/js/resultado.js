const backURL = "http://backend-greenmind-degdgcebgvesfua9.brazilsouth-01.azurewebsites.net/api/user";

let dados;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token");

    if (token) {
        fetch(backURL, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result);
            if (result.success) {
                let nome = result.dados[0].nome;

                // Recuperar a quantidade de planetas do localStorage
                const quantidadePlanetas = parseFloat(localStorage.getItem('quantidadePlanetas'));

                const showNome = document.querySelector(".showNome");
                showNome.innerHTML = "Olá " + nome + ", seriam necessárias:";

                // Verificar se a quantidade de planetas está disponível
                if (quantidadePlanetas) {
                    // Atualizar o texto do resultado
                    const resultadoText = document.querySelector('#row-contentRating h1');
                    resultadoText.textContent = `${quantidadePlanetas.toFixed(1)} TERRA${quantidadePlanetas > 1 ? 'S' : ''}`;

                    // Localizar a div onde as imagens serão exibidas
                    const boxPlanet = document.getElementById('boxPlanet');

                    // Limpar qualquer conteúdo existente
                    boxPlanet.innerHTML = '';

                    // Adicionar imagens inteiras para a parte inteira do número
                    const parteInteira = Math.floor(quantidadePlanetas);
                    const parteDecimal = quantidadePlanetas - parteInteira;

                    for (let i = 0; i < parteInteira; i++) {
                        const img = document.createElement('img');
                        img.src = "../../assets/img/Pegada Ecologica/landing_page/terra.png";
                        img.alt = "Planeta Terra";
                        img.classList.add('planet-image');
                        boxPlanet.appendChild(img);
                    }

                    // Adicionar uma imagem cortada para a parte decimal, se existir
                    if (parteDecimal > 0) {
                        const img = document.createElement('img');
                        img.src = "../../assets/img/Pegada Ecologica/landing_page/terra.png";
                        img.alt = "Planeta Terra Parcial";
                        img.classList.add('planet-image');
                        img.style.clipPath = `inset(0 ${(1 - parteDecimal) * 100}% 0 0)`; // Corta verticalmente da esquerda para a direita
                        boxPlanet.appendChild(img);
                    }
                } else {
                    console.error('Quantidade de planetas não encontrada no localStorage.');
                }
            }
        });
    } else {
        window.location.href = "../../index.html";
    }
});
