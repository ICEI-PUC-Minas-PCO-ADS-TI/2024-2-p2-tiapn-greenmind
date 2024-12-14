const next = document.getElementById('next')
const prev = document.getElementById('prev')
const fim = document.getElementById('finalizar')
const barra_resultado = document.getElementById("barra_resultado");
const color_background =  document.getElementById('op1').style.backgroundColor;
const questionario = document.getElementById("questionario");
const painel = document.getElementById("painel");
const splash = document.getElementById("splash");
const iniciar_quiz = document.getElementById("iniciar_quiz");
const cores = ['#45C4B0', '#45AEC4', '#45C486', '#45AFC4']
var id = 0
//Questão selecionada pega o do do html
var questoes_selecionadas = []
var opcaoSelecionada = false;

const backURL = "backend-greenmind-degdgcebgvesfua9.brazilsouth-01.azurewebsites.net";

// questõs que vão ser perguntadas
const Questions = [
    {
        q: "Com que frequência você consome alimentos cultivados localmente? ",
        a: [{ text: "Diariamente", estado: "visible" },
            { text: "Eventualmente", estado: "visible" },
            { text: "Nunca", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" }
        ]
    },
    {
        q: "Você possui horta em sua residência? (No solo ou em vasos)",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" }
        ]
    },
    {
        q: "Com que frequência você consome produtos embalados ou processados?",
        a: [{ text: "Nunca", estado: "visible" },
            { text: "Eventualmente", estado: "visible" },
            { text: "Diariamente", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" }
        ]
    },
    {
        q: "Qual o meio de transporte que você mais usa?",
        a: [{ text: "Automóvel", estado: "visible" },
            { text: "Motocicleta", estado: "visible" },
            { text: "Transporte Público", estado: "visible" },
            { text: "Bicicleta", estado: "visible" },
            { text: "", estado: "hidden" }
        ]
    },
    {
        q: "Você adota equipamentos e tecnologias que reduzem o consumo de água e/ou energia em sua residência?",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" }
        ]
    },
    {
        q: "Quanto tempo você gasta no banho diariamente?",
        a: [{ text: "5 a 10 min", estado: "visible" },
            { text: "11 a 25 min", estado: "visible" },
            { text: "26 a 35 min", estado: "visible" },
            { text: "Acima de 35 min", estado: "visible" },
            { text: "", estado: "hidden" },
        ]
    },
    {
        q: "Quando você compra equipamentos eletrônicos?",
        a: [{ text: "Somente quando quebram e precisam ser substituídos", estado: "visible" },
            { text: "Ocasionalmente troco por versões mais modernas", estado: "visible" },
            { text: "Troco sempre por aparelhos mais modernos", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
        ]
    },
    {
        q: "Quando você compra produtos e/ou equipamentos você busca informações sobre a adoção de medidas sustentáveis por parte da empresa?",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
        ]
    },
    {
        q: "Você pratica a coleta seletiva na sua residência?",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
        ]
    },
    {
        q: "Você realiza a compostagem na sua residência?",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
        ]
    },
    {
        q: "Você realiza algum tipo de reaproveitamento de água? (De chuva, de máquina de lavar roupa, outros)",
        a: [{ text: "Sim", estado: "visible" },
            { text: "Não", estado: "visible" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
            { text: "", estado: "hidden" },
        ]
    }
];

/* configurando a resposta de todas as seções, a lista não pode ficar vazia. */
Questions.forEach(() => { 
    questoes_selecionadas.push(0);   
});

function pagina_questao(){
    const question = document.getElementById("question");
    const numero_bola = document.getElementById("numero_bola");
    //Modificando os textos
    numero_bola.innerText = (id+1);
    question.innerText = Questions[id].q;
    
    // criando e configurando as alternativas
    for (let i = 1; i < 6; i++)
    {
        const op = document.getElementById('op'+i);
        op.innerText = Questions[id].a[i - 1].text;
        op.style.visibility = Questions[id].a[i - 1].estado;

        op.addEventListener("click", () => {   
            //Modificando a lista com valores
            questoes_selecionadas[id] = op.id;
            //Chamando as funções ajustadoras
            botao_esta_selecionado()
            verificar_respostas()
            checagem_botoes()
        })
    }
}

function checagem_botoes(){
    // habilitar/desabilitar next
    if (id + 1 < Questions.length) { // o user não chegou na última questão
        next.disabled = (questoes_selecionadas[id] === 0); // o user não selecionou alguma alternativa?
        next.style.display = (next.disabled) ? "none" : "block";

        // animação de aparecer
        next.style.animation = "aparecer .3s"
        next.addEventListener("animationend" ,function restart(){questionario.style.animation = ""});
    } else { // o user está na última questão
        next.disabled = true;
        next.style.display = "none";
    }

    // habilitar/desabilitar prev
    prev.disabled = (id === 0);
    prev.style.display = (prev.disabled) ? "none" : "block";
}

verificar_respostas();
troca_pergunta()

next.addEventListener("click", passar)

prev.addEventListener("click", voltar)

fim.addEventListener("click", finalizar)

iniciar_quiz.addEventListener("click", desaparecer);

function desaparecer()
{
    splash.style.animation = "desaparecer .8s ease-in"
    setTimeout(abrir_quiz, 700);
}

function abrir_quiz()
{
    splash.style.display = "none"
    painel.style.display = "block"
}

function passar(){
    id++;
    troca_pergunta()
}

function voltar(){
    id--;
    troca_pergunta()
    console.log(questoes_selecionadas)
}

async function finalizar() {    
    // Concatenar as respostas em uma string
    let questoes_juntas = "";
    for (let i = 0; i < Questions.length; i++) {
        questoes_juntas += (questoes_selecionadas[i].slice(-1));
    }

    // Preparar os dados para envio
    const payload = {
        respostas: questoes_juntas // String com as respostas selecionadas
    };

    const apiUrl = `${backURL}/api/analiseQuiz`;

    try {
        // Fazer a requisição para a API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        // Extrair o resultado da API
        const resultado = await response.json();
        const quantidadePlanetas = resultado.quantidadePlanetas;

        localStorage.setItem('quantidadePlanetas', quantidadePlanetas);

        window.location.href = "resultado.html";
    } catch (error) {
        console.error("Erro ao se comunicar com a API:", error);
    }
}

// Função EXCLUSIVA da função finalizar
function verificar_repeticoes(lista_repeticoes){
    return lista_repeticoes.filter(Boolean).length >=2;
}

function verificar_respostas(){
    // Se na lista inclui 0, significa que nem todas as perguntas foram respondidas
    if (questoes_selecionadas.includes(0)){
        fim.disabled = true
        fim.style.display = "none";
    }
    else{
        fim.disabled = false
        fim.style.display = "block";
        fim.style.cursor = "pointer";
    }
}

function botao_esta_selecionado(){
    opcao = "op"
    for (let i = 1; i < 6; i++){
        if (opcao+i == questoes_selecionadas[id]){
            document.getElementById('op'+i).style.animation = "acender .05s"
            document.getElementById('op'+i).style.backgroundColor = "#EBEBEB"
        }
        else{
            document.getElementById('op'+i).style.animation = "apagar .3s"
            document.getElementById('op'+i).style.backgroundColor = color_background
        }}
}

function troca_pergunta(){
    questionario.style.animation = "aparecer .5s"
    questionario.addEventListener("animationend" ,function restart(){questionario.style.animation = ""});
    barra_resultado.style.width = (((id+1)/11)*100)+"%";
    pagina_questao();
    checagem_botoes();
    botao_esta_selecionado();
    // seleciona a cor aleatoria pra proxima pagina
    let indice_aleatorio = Math.floor(Math.random() * cores.length);
    document.documentElement.style.setProperty('--azul', cores[indice_aleatorio]);
}
