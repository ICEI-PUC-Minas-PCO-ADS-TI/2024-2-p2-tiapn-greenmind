async function carregarPerguntas() {
    try {
      const response = await fetch("http://backend-greenmind-degdgcebgvesfua9.brazilsouth-01.azurewebsites.net/formulario");
      const perguntas = await response.json();
  
      const formContainer = document.getElementById("quiz-container");
  
      if (!formContainer) {
        console.error("Elemento 'main form' não encontrado.");
        return;
      }
  
      // Gerando HTML para as perguntas e alternativas
      let perguntasHTML = perguntas
        .map(
          (pergunta) => `
          <div class="pergunta-container" id="pergunta-${pergunta.idPergunta}">
            <p class="question">
              Questão ${pergunta.idPergunta} - ${pergunta.tituloPergunta}
            </p>
            ${pergunta.alternativas
              .map(
                (alternativa) => `
                <label>
                  <input type="radio" name="pergunta-${pergunta.idPergunta}" value="${alternativa.id}" data-alternativa='${JSON.stringify(alternativa)}' />
                  ${alternativa.perguntaMsg}
                </label>
                <br />
                <p class="msg-erro" style="display:none;"></p> <!-- Inicialmente oculta -->
                <br />
              `
              )
              .join("")}
          </div>
        `
        )
        .join("");
  
      formContainer.innerHTML = perguntasHTML;
  
      // Adicionando evento de clique para o botão de ver resultados
      document.getElementById("ver-resultados").addEventListener("click", function () {
        // Iterando pelas perguntas
        perguntas.forEach((pergunta) => {
          const perguntaContainer = document.getElementById(`pergunta-${pergunta.idPergunta}`);
          const radios = perguntaContainer.querySelectorAll('input[type="radio"]');
  
          // Para cada alternativa de uma pergunta, verificar se é errada e exibir a mensagem de erro
          radios.forEach((radio) => {
            const alternativa = JSON.parse(radio.getAttribute("data-alternativa"));
            
            // Procurando o elemento msg-erro correspondente ao radio
            const msgErroElement = radio.closest(".pergunta-container").querySelector(".msg-erro");
  
            // Verifica se a alternativa é errada e exibe a mensagem de erro
            if (alternativa.isRespostaErrada) {
              msgErroElement.textContent = alternativa.msgErro;
              msgErroElement.style.display = "block";
              msgErroElement.style.color = "red";
              msgErroElement.style.fontSize = "13px";
              msgErroElement.style.marginLeft = "20px";
              msgErroElement.style.marginBottom = "5px";
              msgErroElement.style.fontStyle = "italic";
            } else {
              // Se for uma alternativa correta, a mensagem de erro é escondida
              msgErroElement.style.display = "none";
            }
          });
        });
      });
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  }
  
  // Carregar perguntas ao carregar a página
  document.addEventListener("DOMContentLoaded", () => {
    carregarPerguntas();
  });
  