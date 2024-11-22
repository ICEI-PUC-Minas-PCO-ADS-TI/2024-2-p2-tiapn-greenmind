// redirecionando a pagina
const bt_inicio = document.getElementById("ir_inicio")
const logo_inicio = document.getElementById("logo_inicio")
const bt_ir_mediaGlobal = document.getElementById("ir_mediaGlobal")

bt_inicio.addEventListener('click', ir_inicio)
logo_inicio.addEventListener('click', ir_inicio)
bt_ir_mediaGlobal.addEventListener('click', ir_mediaGlobal)

// ir inicio
function ir_inicio(){
    location.href = "index.html"
}
// Ir media global
function ir_mediaGlobal(){
    location.href= "../resultadoDados";
}

// configurando a tela do resultado
// declarando as variaveis
const urlParams = new URLSearchParams(window.location.search);
var resultado = urlParams.get('total');
var dicaURL = urlParams.get('dica');

if (resultado === null || resultado===""){
    resultado = 0;
}


// Descripitografando a dica
var texto_dica;
if (dicaURL.slice(-1)=="E"){
    texto_dica = "Dica: Reduza o consumo de água, tentando usar equipamentos com potencial de diminuir o desperdício."
}else if(dicaURL.slice(-1)=="L"){
    // texto_dica = "Dica: Busque consumir menos produtos, a fim de gerar menos lixo."
    texto_dica = "Dica: Opte por adquirir produtos de menor impacto ambiental, privilegiando os recicláveis sempre que possível. Pratique a separação adequada do lixo e faça o descarte correto."
}else{
    texto_dica = "Dica: Repense seus hábitos de consumo."
}

// Declarando as variaveis
const titulo = document.getElementById("titulo_resultado");
const texto_resultado = document.getElementById("resultado");
const texto_geral = document.getElementById("texto_geral");
const dica = document.getElementById('dica');

texto_resultado.innerText = resultado;

let texto;
let dica_esta_ativa = false;
let qualidade_resultado;

// chegando o resultado
if (resultado >= 50)
{
    qualidade_resultado = "Excelente";
    texto = "Parabéns! Sua Pegada Ecológica está muito boa. Sua pegada aproxima-se da Colômbia, cuja a pegada necessita de apenas 1,1 planetas para suprir as demandas utilizadas da natureza. Continue assim!";
    dica.style.visibility = 'hidden'
}

else if (resultado >= 35 && resultado <= 49)
{
    qualidade_resultado = "Moderada";
    texto = "Sua pegada é moderada. Isso significa que seu consumo acaba sendo superior a velocidade em que a terra consegue repor para natureza. A sua pegada se assemelha a de países como Alemanha e França  que necessitam de cerca de 2,7 planetas para repor o que consomem. Mas calma, você está no caminho certo!";
    dica.addEventListener('click', setar_dica);
    document.documentElement.style.setProperty('--blocos', '#F2BE24');
    document.documentElement.style.setProperty('--bloco-transparente', 'rgba(242, 190, 36, .92)');
}

else
{
    qualidade_resultado = "Péssima";
    texto = "Que pena, parece que sua Pegada Ecológica está ruim. Sua pegada assemelha-se com a da Bélgica, que necessita de 4,3 planetas para repor tudo que consome, sendo um número bastante alto. Mas isso pode melhorar! Bora lá mudar isso? O planeta precisa da sua ajuda!";
    dica.addEventListener('click', setar_dica)
    document.documentElement.style.setProperty('--blocos', '#D92929');
    document.documentElement.style.setProperty('--bloco-transparente', 'rgba(253, 170, 170, .9)');
}

titulo.innerText = qualidade_resultado;   
texto_geral.innerText = texto
texto.wordBreak = true;

// configurando a dica
function setar_dica(){
    if (!dica_esta_ativa){
        dica.innerText = "Retornar"
        texto_geral.innerText = texto_dica;
        dica_esta_ativa = true;
    }else{
        dica.innerText = "Quer uma dica?"
        texto_geral.innerText = texto;
        dica_esta_ativa = false;
    }
}