import React, { useEffect, useState, useRef }  from 'react';

var lista_perguntas_e_alternativas = [
  {
      "q": "Com que frequência você consome alimentos cultivados localmente?",
      1: "Diariamente",
      2: "Eventualmente",
      3: "Nunca",
      4: "",
      5: ""
  },
  {
      "q": "Você possui horta em sua residência? (No solo ou em vasos)",
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
  {
      "q": "Com que frequência você consome produtos embalados ou processados?",
      1: "Diariamente",
      2: "Eventualmente",
      3: "Nunca",
      4: "",
      5: ""
  },
  {
      "q": "Qual o meio de transporte que você mais usa?",
      1: "Automóvel",
      2: "Motocicleta",
      3: "Transporte Público",
      4: "Bicicleta",
      5: "",
      // 6: "Motocicleta de terceiros (carona)";
      // 7: "Transporte público – ônibus";
      // 8: "Bicicleta";
  },
  { // cpm campo de texto
      "q": "Você adota equipamentos e tecnologias que reduzem o consumo de água e/ou energia em sua residência?", 
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
  {
      "q": "Quanto tempo você gasta no banho diariamente?", 
      1: "5 a 10 min",
      2: "11 a 25 min",
      3: "26 a 35 min",
      4: "Acima de 35 min",
      5: ""
  },
  {
      "q": "Quando você compra equipamentos eletrônicos?",
      1: "Somente quando quebram e precisam ser substituídos",
      2: "Ocasionalmente troco por versões mais modernas",
      3: "Troco sempre por aparelhos mais modernos",
      4: "",
      5: ""
  },
  {
      "q": "Quando você compra produtos e/ou equipamentos você busca informações sobre a adoção de medidas sustentáveis por parte da empresa?",
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
  {
      "q": "Você pratica a coleta seletiva na sua residência?",
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
  {
      "q": "Você realiza a compostagem na sua residência?",
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
  {
      "q": "Você realiza algum tipo de reaproveitamento de água? (De chuva, de máquina de lavar roupa, outros)",
      1: "Sim",
      2: "Não",
      3: "",
      4: "",
      5: ""
  },
];

const opcoes_data = [
  {valor: 'todos_ate_agora', texto: 'Todos até Agora'},
  {valor: 'hoje', texto: 'Hoje'},
  {valor: 'semana_retrasada', texto: 'Últimos 7 Dias'},
  {valor: 'mes_retrasado', texto: 'Últimos 30 Dias'},
  {valor: 'data_especifica', texto: 'Data Específica'}
];

//
let data_pesquisar = "0";
let data_inicial = "0";
let ocupacao = "0";

function App(){
  function Aba_copiar_texto(props){
    const [copiar_api, setCopiarAPI] = useState(false);

    const copiarApi = () => {
      navigator.clipboard.writeText(props.texto);
      setCopiarAPI(true);

      setTimeout (() => {
          setCopiarAPI(false);
      }, 2000);
    };
    return (
      <>
      {copiar_api ? <p id="certo">{props.texto}</p> : <p id="errado">{props.texto}</p>}
      <button onClick={copiarApi}>Copiar Texto</button>
      </>
    )
  }

  function Input_data(props){
    // Por enquanto usado apenas para atualizar a tela
    const [data_input, setData_input] = useState("")

    const manipular_data = (e) => {
      e.preventDefault();
      const valor_numerico = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
      // Vendo se o valor está correto para a pesquisa
      props.set_pesquisar(valor_numerico.length === 8);
      // Verifica se pode colocar o hífen, e se pode, onde pode
      if (valor_numerico.length > 2 && valor_numerico.length <= 4){
        const data_correta = `${valor_numerico.slice(0, 2)}-${valor_numerico.slice(2)}`;
        props.data.current = data_correta; 
        setData_input(data_correta);
        return;
      }else if (valor_numerico.length > 4){
        const data_correta = `${valor_numerico.slice(0, 2)}-${valor_numerico.slice(2, 4)}-${valor_numerico.slice(4)}`;
        props.data.current = data_correta; 
        setData_input(data_correta);
        return;
      }
      // Se não tem hífen, retorne o valor númerico apenas
      props.data.current = valor_numerico; 
      setData_input(valor_numerico);
    };

    return(
      <>
        <input
          type="text"
          inputmode="numeric"
          placeholder={`${props.texto} (Ex: 11-07-2023)`}
          id="input_data"
          onChange={manipular_data}
          value={props.data.current}
          maxLength={10}
        />
      </>
    )
  }

  //----------------------------------------------------------------------
  // Declaração de variaveis
  const [texto_json, setTexto_json] = useState("");
  const [carregou, setCarregou] = useState(false);
  const [pode_pesquisar, setPode_pesquisar] = useState(false);
  const [pode_pesquisar2, setPode_pesquisar2] = useState(false);
  const [selected, setSelected] = useState(opcoes_data[0].valor);
  const resultado_media = useRef(0);
  const resultado_lista_arrays = useRef([]);
  const data = useRef("");
  const data2 = useRef("");

  // variaveis modal
  const modal = document.querySelector("[data-modal]")

  // Pega a API
  const pesquisar_dados = async () => {
    const response = await fetch(`https://greenlight.dev.br/resultadoDados.php?data=${data_inicial}&data2=${data_pesquisar}&ocupacao=${ocupacao}`);
    const dados = await response.json();
    setCarregou(false);
    setTexto_json(dados);
  };

  // Ao rodar pela primeira vez executa essa função
  useEffect(() => {
    pesquisar_dados();
  }, []);
  
  // Sempre que a API estiver carregada, ele pega os dados dela
  useEffect(() => {
    if (texto_json) {
      resultado_media.current = texto_json["media"];
      resultado_lista_arrays.current = texto_json["lista_medias"];
      // Mudando a cor do fundo
      if (resultado_media.current > 50){
        document.documentElement.style.setProperty('--cor-fundo', '#A5FFAC');
        document.documentElement.style.setProperty('--cor-blocos', '#ABC315');
        document.documentElement.style.setProperty('--cor-trans', '165, 255, 172');
      }else if(resultado_media.current < 50 && resultado_media.current >= 35){
        document.documentElement.style.setProperty('--cor-fundo', '#F2F2F2');
        document.documentElement.style.setProperty('--cor-blocos', '#F2BE24');
        document.documentElement.style.setProperty('--cor-trans', '242, 242, 242');
      }else{
        document.documentElement.style.setProperty('--cor-fundo', '#F4C1C1');
        document.documentElement.style.setProperty('--cor-blocos', '#F25252');
        // document.documentElement.style.setProperty('--cor-blocos', '#D92929');
        document.documentElement.style.setProperty('--cor-trans', '244, 193, 193');
      }
      setCarregou(true);
    }
  }, [texto_json]);

  // Pegando do dropdown
  const mudarOpcaoData = (e) => {
    e.preventDefault();
    switch(e.target.value){
      case "todos_ate_agora":
        data_inicial = "0";
        data_pesquisar = "0";
        pesquisar_dados();
        break;
      case "data_especifica":
        break;
      case "hoje":
        calcular_data("hoje");
        break;
      case "semana_retrasada":
        calcular_data("semana");
      break;
      case "mes_retrasado":
        calcular_data("mes");
        break;
    }
    setSelected(e.target.value);
  }

  const mudarOcupacao = (e) => {
    e.preventDefault();
    ocupacao = e.target.value;
    pesquisar_dados();
  }

  // Fazendo pesquisa com data
  const enviar_data = () => {
    // juntando a data
    data_inicial = `${data.current.slice(6, 10)}-${data.current.slice(3, 5)}-${data.current.slice(0, 2)}`;
    data_pesquisar = `${data2.current.slice(6, 10)}-${data2.current.slice(3, 5)}-${data2.current.slice(0, 2)}`;

    pesquisar_dados();
  };

  function calcular_data(quando){
    const dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1; // A contagem começa em 0, por isso do mais 1
    const ano = dataAtual.getFullYear();

    // Formatar o mês e o dia para terem sempre dois dígitos
    mes = mes < 10 ? "0" + mes : mes;
    dia = dia < 10 ? "0" + dia : dia;

    data_pesquisar = ano + "-" + mes + "-" + dia;
    
    if (quando=="hoje"){
      data_inicial = data_pesquisar;
    }else if (quando === "semana"){
      const umaSemanaAtras = new Date(dataAtual.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      var dia_semana = umaSemanaAtras.getDate();
      var mes_semana = umaSemanaAtras.getMonth() + 1;
      const ano_semana = umaSemanaAtras.getFullYear();
      
      mes_semana = mes_semana < 10 ? "0" + mes_semana : mes_semana;
      dia_semana = dia_semana < 10 ? "0" + dia_semana : dia_semana;
      
      data_inicial = ano_semana + "-" + mes_semana + "-" + dia_semana;
    }else{
      const trintaDiasAtras = new Date(dataAtual.getTime() - 30 * 24 * 60 * 60 * 1000);

      var dia_mes = trintaDiasAtras.getDate();
      var mes_mes = trintaDiasAtras.getMonth() + 1;
      const ano_mes = trintaDiasAtras.getFullYear();

      mes_mes = mes_mes < 10 ? "0" + mes_mes : mes_mes;
      dia_mes = dia_mes < 10 ? "0" + dia_mes : dia_mes;

      data_inicial = ano_mes + "-" + mes_mes + "-" + dia_mes;
    }

    pesquisar_dados();
  }

  function Barra_porcentagem(props){
    return(
      <>
        <div className="alternativa">
          <div className="preenchimento-porcentagem" style={{width : (parseInt(props.porcentagem))+"%"}}></div>
          <div className="resposta">{props.alternativa}</div>
          <div className="porcentagem-texto">{props.porcentagem}%</div>
        </div>
      </>
    )
  }

  return (
    <>
      {carregou ?(
        <> 
          <section id="secao-1">
            <p>A <strong>Pegada Ecológica Global</strong> é</p>
            {resultado_media.current >= 50 ? <h1>Excelente 🔥</h1> : resultado_media.current >= 35 ? <h1>Moderada 🤷</h1> : <h1>Péssima 💔</h1>}
            <p>Pois a <strong>média geral</strong> é de</p>
            <p><span>{resultado_media.current}</span> pontos!!!</p>
          </section>

          <section id="secao-2">
            <p>Esta página tem o intuito de exibir a <strong>Pegada Ecológica Global</strong> e <strong>média geral</strong> de todos que responderam a pesquisa 🌳<br></br><br></br> Esses dados são anônimos e todas as pessoas que participaram terão influência no resultado 🔐</p>
            <p>Você pode filtrar as respostas com base na data. É só usar a ferramenta de filtro abaixo 👀</p> 
          </section>

          <hr></hr>
          <section id="secao-3">
            <div id="filtro">
              {/* <label htmlFor="opcao-data">Filtrando por:</label> */}
              {/* faz da maneira que eu fiz abaixo, não se faz lista dessa forma no react */}
              {/* <select name="opcao-data" id="opcao-ocupacao" value={ocupacao} onChange={mudarOcupacao}>
                  <option value="0">Qualquer</option>
                  <option value="1">Professor</option>
                  <option value="2">Aluno</option>
                  <option value="3">Visitante</option>
              </select> */}
              <select name="opcao-data" id="opcao-data" value={selected} onChange={mudarOpcaoData}>
                {opcoes_data.map(option => (
                  <option key={option.valor} value={option.valor}>{option.texto}</option>
                ))}
              </select>
              <div id="campo-inserir-data">   
                {selected === "data_especifica" &&(    
                  <>
                  <Input_data data={data} set_pesquisar={setPode_pesquisar} texto="Data inicial"/>
                  <Input_data data={data2} set_pesquisar={setPode_pesquisar2} texto="Data final"/>
                  <button id='btVisualizar' onClick={enviar_data} disabled={!pode_pesquisar || !pode_pesquisar2}>Pesquisar</button>
                  </>
                )}     
              </div>
            </div>
            {resultado_media.current !== 0 ? (
            <>
            {lista_perguntas_e_alternativas.map((questao, index_questao) => (
              <>
                <div className="box-questao">
                <div className="box-pergunta">
                <div className="numero-questao">{index_questao + 1}</div>
                <div className="pergunta">{questao['q']}</div>
                </div>
                  {Array(5).fill(0).map((alternativa, index_alternativa) => (
                    <>
                    {lista_perguntas_e_alternativas[index_questao][index_alternativa+1] !== "" &&(
                      <Barra_porcentagem
                        porcentagem={resultado_lista_arrays.current[index_questao][index_alternativa]} 
                        alternativa={lista_perguntas_e_alternativas[index_questao][index_alternativa+1]}
                      />
                    )}
                    </>
                  ))}
                </div>
                </>
            ))}
          <p>*Devido ao arredondamento dos números, as porcentagens podem não somar exatamente 100%*</p>
          
          </> ) : (
            <>
            <p>Ops...<br></br>Não há registros para o filtro</p>
            </>
          )}

          </section>
          <footer>
            <div id="campo-redes">
              <h3>Siga nossas Redes 🔥</h3>
              <div id="campo-redes-icones">
                  <a class="nav-link" href="https://www.instagram.com/greenlight.dev/"><i class="bi bi-instagram"></i></a>
                  <a class="nav-link" href="https://github.com/XaropinhoS20/PegadaEcologica"><i class="bi bi-github"></i></a>
                  <a class="nav-link" href="https://www.linkedin.com/in/greenlight-pegada-ecol%C3%B3gica-925bb2273/"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            
            <div id="campo-outros">
              <a href='../index.html'>Página Inicial</a>
              <a href='#'>Sobre Nós (Em Manutenção)</a>
            </div>
          </footer>
        </>
      ):(
        <span class="loader"></span>
      )}
    </>
  )
}

export default App;
