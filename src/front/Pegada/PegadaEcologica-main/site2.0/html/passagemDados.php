<?php
function mandar_banco_dados($bairro, $unidade, $data, $total, $questoes){
    // Ajuste a pasta que esse arquivo esta
    require('../conexao_servidor.php');
    
    $stmt = $conn->prepare("INSERT INTO tabelaecologica (total, questoes) VALUES (:valor1, :valor2)");
    
    $stmt->bindValue(':valor1', $total);
    $stmt->bindValue(':valor2', $questoes);
    
    $stmt->execute();
     
    $stmt2 = $conn->prepare("INSERT INTO tabelainfo (bairro, departamento, dia) VALUES (:valor1, :valor2, :valor3)");
    
    $stmt2->bindValue(':valor1', $bairro);
    $stmt2->bindValue(':valor2', $unidade);
    $stmt2->bindValue(':valor3', $data);
    
    $stmt2->execute();
}

function somarTotal($questoes){
    // O valor de cada opção
    $valores_questoes = array(
        array(7, 4, 2, 0, 0),
        array(6, 2, 0, 0, 0),
        array(6, 3, 2, 0, 0),
        array(1, 3, 4, 6, 0),
        array(6, 0, 0, 0, 0),
        array(6, 4, 3, 2, 0),
        array(7, 3, 0, 0, 0),
        array(7, 0, 0, 0, 0),
        array(6, 0, 0, 0, 0),
        array(6, 0, 0, 0, 0),
        array(7, 0, 0, 0, 0)
    );
    $total = 0;
    foreach (str_split($questoes, 1) as $indice => $letra){
        $total += $valores_questoes[$indice][$letra - 1];
    }
    return $total;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" and isset($_POST['bairro'])){
    $bairro_variavel = $_POST['bairro'];
    $unidade_variavel = $_POST['unidade'];
    $data_atual = date("Y-m-d");
    $questoes_variavel = $_POST['questoes'];
    $dica_variavel = $_POST['dica'];

    if (!is_numeric($questoes_variavel) or strlen($questoes_variavel) != 11 or 
        !verificar_respostas($questoes_variavel))
    {
        ///////////////////////////////////////////////////////////////////////////////
        header('Location: quiz.html');
        exit();
    }
    $total_variavel = somarTotal($questoes_variavel);
    mandar_banco_dados($bairro_variavel, $unidade_variavel, $data_atual, $total_variavel, $questoes_variavel);
    header('Location: resultado.html?total='. $total_variavel . "&dica=" . $dica_variavel);
    exit();
}

function verificar_respostas($lista){
    // Nessa lista contem a quantidade de opções do quiz
    $respostas = [3, 2, 3, 5, 2, 4, 3, 2, 2, 2, 2];
    $array_resposta_user = str_split($lista, 1);
    
    // Verificando se o valor da resposta está no quiz, evitando fraudes
    foreach($array_resposta_user as $indice => $res){
        if ($res > $respostas[$indice]){
            return false;
        }
    }
    return true;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" and 
    is_numeric($_POST['resultado_questoes']) and strlen($_POST['resultado_questoes']) == 11
    and verificar_respostas($_POST['resultado_questoes']))
{      
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta
      http-equiv="Cache-Control"
      content="no-cache, no-store, must-revalidate"
    />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Cadastro</title>
	<link rel="icon" href="../Imagens/icons/favicon.ico">
    <!--Bootstrap-->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../css/passagemDados.css">

    <!-- biblioteca pra pesquisar na dropdown -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
</head>
<body>
    <form method="post" id="formulario_variaveis">
        <!-- Quardando dados -->
        <input type="hidden" name="questoes" value="<?= $_POST['resultado_questoes'] ?>">
        <input type="hidden" name="total" value="<?= $_POST['resultado_total'] ?>">
        <input type="hidden" name="dica" value="<?= $_POST['resultado_dica'] ?>">
        <input type="hidden" name="bairro" value="n respodido">
        <input type="hidden" name="unidade" value="n respondido">
    </form>
	<!--Barra de progresso-->
	<div class="progress">
        <div class="progress-bar" id="barra_resultado" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <!-- Formulario -->
    <div id="formulario">
        <div id="form_1_id">
            <h3>Deseja <span>ampliar</span> nossa Pesquisa nos informando mais sobre você?</h3>
            <button onclick="confirmar_1()">
                Sim, quero contribuir e ajudar o meio ambiente!
            </button>

            <button onclick="sair()">
                Não, quero ver meu resultado
            </button>
            <h3>🔒 Garantimos que as perguntas serão usadas apenas como maneira de ampliar nosso foco na cidade</h3>                
        </div>
        <div id="form_2_id" style="display: none;">
            <h3>É morador de Volta Redonda?</h3>
            <button onclick="confirmar_2()">
                Sim
            </button>

            <button onclick="n_mora()">
                Não
            </button>
        </div>
        <div id="form_3_id" style="display: none;">
            <label for="bairro_dropdown">Informe seu bairro</label>
            <br>
            <select class="select2" id="bairro_dropdown_id" name="bairro_dropdown">
                <option value="Açude I, II, III, IV">Açude I, II, III, IV</option>
                <option value="Aero Clube">Aero Clube</option>
                <option value="Água Limpa">Água Limpa</option>
                <option value="Belmonte">Belmonte</option>
                <option value="Bela Vista">Bela Vista</option>
                <option value="Brasilândia">Brasilândia</option>
                <option value="Candelária">Candelária</option>
                <option value="Casa de Pedra">Casa de Pedra</option>
                <option value="Caieiras">Caieiras</option>
                <option value="Câilândia">Câilândia</option>
                <option value="Cidade Nova">Cidade Nova</option>
                <option value="Coqueiros">Coqueiros</option>
                <option value="Conforto">Conforto</option>
                <option value="Conjunto Residencial Vila Rica">Conjunto Residencial Vila Rica</option>
                <option value="Dom Bosco">Dom Bosco</option>
                <option value="Eldorado">Eldorado</option>
                <option value="Estrada União Retiro/ Morada do Campo">Estrada União Retiro/ Morada do Campo</option>
                <option value="Eucaliptal">Eucaliptal</option>
                <option value="Ilha Parque">Ilha Parque</option>
                <option value="Jardim Amália">Jardim Amália</option>
                <option value="Jardim Belmonte">Jardim Belmonte</option>
                <option value="Jardim Cidade do Aço">Jardim Cidade do Aço</option>
                <option value="Jardim das Américas">Jardim das Américas</option>
                <option value="Jardim Esperança">Jardim Esperança</option>
                <option value="Jardim Normandia/Village Santa Helena/ Jd Provence 2">Jardim Normandia/Village Santa Helena/ Jd Provence 2</option>
                <option value="Jardim Paraíba">Jardim Paraíba</option>
                <option value="Jardim Ponte Alta">Jardim Ponte Alta</option>
                <option value="Jardim Provence 1">Jardim Provence 1</option>
                <option value="Jardim Suíça">Jardim Suíça</option>
                <option value="Jardim Tiradentes">Jardim Tiradentes</option>
                <option value="Jardim Vila Rica">Jardim Vila Rica</option>
                <option value="Laranjal">Laranjal</option>
                <option value="Mariana Torres">Mariana Torres</option>
                <option value="Minerlândia">Minerlândia</option>
                <option value="Monte Castelo">Monte Castelo</option>
                <option value="Morada da Colina/ Mirante do Vale">Morada da Colina/ Mirante do Vale</option>
                <option value="Nova Primavera">Nova Primavera</option>
                <option value="N. Srº, das Graças">N. Srº, das Graças</option>
                <option value="Niterói">Niterói</option>
                <option value="Parque das Ilhas">Parque das Ilhas</option>
                <option value="Pedreira">Pedreira</option>
                <option value="Pinte da Serra">Pinte da Serra</option>
                <option value="Ponte Alta">Ponte Alta</option>
                <option value="Recanto Vila Rica (Três Poços)">Recanto Vila Rica (Três Poços)</option>
                <option value="Rio das Flores">Rio das Flores</option>
                <option value="Roma 1/ Condado do Ipê/ Parque das Garças">Roma 1/ Condado do Ipê/ Parque das Garças</option>
                <option value="Roma II/ S. Francisco/ Santa Bárbara">Roma II/ S. Francisco/ Santa Bárbara</option>
                <option value="Rústico/ Santa Tereza">Rústico/ Santa Tereza</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Cruz II">Santa Cruz II</option>
                <option value="Santa Inês">Santa Inês</option>
                <option value="Santa Rita de Cássia">Santa Rita de Cássia</option>
                <option value="Santa Rita do Zarur">Santa Rita do Zarur</option>
                <option value="Santa Tereza">Santa Tereza</option>
                <option value="Santo Agostinho">Santo Agostinho</option>
                <option value="São Carlos">São Carlos</option>
                <option value="São Cristóvão">São Cristóvão</option>
                <option value="São Geraldo">São Geraldo</option>
                <option value="São João">São João</option>
                <option value="São Luiz/Nova São Luiz">São Luiz/Nova São Luiz</option>
                <option value="São Sebastião">São Sebastião</option>
                <option value="Sessenta">Sessenta</option>
                <option value="Siderlândia">Siderlândia</option>
                <option value="Siderópolis">Siderópolis</option>
                <option value="Siderville">Siderville</option>
                <option value="Veneza">Veneza</option>
                <option value="Verde Vale">Verde Vale</option>
                <option value="Vila Americana">Vila Americana</option>
                <option value="Vila Brasília">Vila Brasília</option>
                <option value="Vila Mury/Limoeiro">Vila Mury/Limoeiro</option>
                <option value="Vila Santa Cecília">Vila Santa Cecília</option>
                <option value="Village Jardim Primavera">Village Jardim Primavera</option>
                <option value="Village Sul">Village Sul</option>
                <option value="Vista Bela">Vista Bela</option>
                <option value="Vista Verde">Vista Verde</option>
                <option value="Volta Grande 1 e 3">Volta Grande 1 e 3</option>
                <option value="Volta Grande 2">Volta Grande 2</option>
            </select>
            <br>
            <label for="departamentos">Trabalha na CSN? Nos informe sua Unidade Organizacional</label>
            <br>
            <select class="select2" id="departamentos" name="departamentos">
            <option value="COORDENACAO DE ENGENHARIA">COORDENACAO DE ENGENHARIA</option>
                <option value="COORDENACAO DE ENGENHARIA EQUIPAMENTOS">COORDENACAO DE ENGENHARIA EQUIPAMENTOS</option>
                <option value="COORDENACAO DE GESTAO DE MANUTENCAO">COORDENACAO DE GESTAO DE MANUTENCAO</option>
                <option value="COORDENACAO DE LAMINACAO">COORDENACAO DE LAMINACAO</option>
                <option value="COORDENACAO DE PCP FATURAMENTO E ACESSO">COORDENACAO DE PCP FATURAMENTO E ACESSO</option>
                <option value="COORDENACAO DE PINTURA">COORDENACAO DE PINTURA</option>
                <option value="COORDENACAO DE PLANEJAMENTO E CONTROLE">COORDENACAO DE PLANEJAMENTO E CONTROLE</option>
                <option value="COORDENACAO DE PROJETOS ESPECIAIS">COORDENACAO DE PROJETOS ESPECIAIS</option>
                <option value="COORDENACAO DE UTILIDADES">COORDENACAO DE UTILIDADES</option>
                <option value="COORDENACAO DESEMPENHO DE CONTRATOS">COORDENACAO DESEMPENHO DE CONTRATOS</option>
                <option value="COORDENACAO INSPECAO SINTERIZACAO 4">COORDENACAO INSPECAO SINTERIZACAO 4</option>
                <option value="COORDENACAO PLANEJAMENTO DE PERFORMANCE">COORDENACAO PLANEJAMENTO DE PERFORMANCE</option>
                <option value="COORDENACAO PROCESSOS LAMINACAO A QUENTE">COORDENACAO PROCESSOS LAMINACAO A QUENTE</option>
                <option value="COORDENACAO DE DESEMPENHO DE CONTRATOS">COORDENACAO DE DESEMPENHO DE CONTRATOS</option>
                <option value="COORDENACAO PROCESSOS LAMINACAO A QUENTE">COORDENACAO PROCESSOS LAMINACAO A QUENTE</option>
                <option value="COORDENACAO DE LAMINACAO">COORDENACAO DE LAMINACAO</option>
                <option value="COORDENACAO DE PCP FATURAMENTO E ACESSO">COORDENACAO DE PCP FATURAMENTO E ACESSO</option>
                <option value="COORDENACAO DE PINTURA">COORDENACAO DE PINTURA</option>
                <option value="COORDENACAO PLANEJAMENTO DE PERFORMANCE">COORDENACAO PLANEJAMENTO DE PERFORMANCE</option>
                <option value="COORDENACAO PROCESSOS LAMINACAO A QUENTE">COORDENACAO PROCESSOS LAMINACAO A QUENTE</option>
                <option value="DIRETORIA DE METALURGIA">DIRETORIA DE METALURGIA</option>
                <option value="DIRETORIA DE PRODUTOS">DIRETORIA DE PRODUTOS</option>
                <option value="DIRETORIA EXECUTIVA PRODUCAO SIDERURGIA">DIRETORIA EXECUTIVA PRODUCAO SIDERURGIA</option>
                <option value="DIRETORIA PROJETOS MANUTENCAO E SUPORTE">DIRETORIA PROJETOS MANUTENCAO E SUPORTE</option>
                <option value="GERENCIA CENTRO DE SERVICO E ZINCAGEM">GERENCIA CENTRO DE SERVICO E ZINCAGEM</option>
                <option value="GERENCIA COQUEIFICACAO">GERENCIA COQUEIFICACAO</option>
                <option value="GERENCIA DE AGUAS E EFLUENTES">GERENCIA DE AGUAS E EFLUENTES</option>
                <option value="GERENCIA DE CALCINACAO">GERENCIA DE CALCINACAO</option>
                <option value="GERENCIA DE CARBOQUIMICOS E CALCINACAO">GERENCIA DE CARBOQUIMICOS E CALCINACAO</option>
                <option value="GERENCIA DE CILINDROS">GERENCIA DE CILINDROS</option>
                <option value="GERENCIA DE DECAPAGEM ACIDA">GERENCIA DE DECAPAGEM ACIDA</option>
                <option value="GERENCIA DE ENCRUAMENTO">GERENCIA DE ENCRUAMENTO</option>
                <option value="GERENCIA DE ESTANHAMENTO">GERENCIA DE ESTANHAMENTO</option>
                <option value="GERENCIA DE GARANTIA DA QUALIDADE">GERENCIA DE GARANTIA DA QUALIDADE</option>
                <option value="GERENCIA DE INSPECAO MECANICA REFRATAR">GERENCIA DE INSPECAO MECANICA REFRATAR</option>
                <option value="GERENCIA DE LAMINADOS A FRIO">GERENCIA DE LAMINADOS A FRIO</option>
                <option value="GERENCIA DE LAMINADOS A QUENTE">GERENCIA DE LAMINADOS A QUENTE</option>
                <option value="GERENCIA DE MANUT DA METALURGIA DO ACO">GERENCIA DE MANUT DA METALURGIA DO ACO</option>
                <option value="GERENCIA DE MANUTENCAO">GERENCIA DE MANUTENCAO</option>
                <option value="GERENCIA DE MANUTENCAO DE EXECUCAO REDUCAO">GERENCIA DE MANUTENCAO DE EXECUCAO REDUCAO</option>
                <option value="GERENCIA DE MANUTENCAO E TRANSPORTE">GERENCIA DE MANUTENCAO E TRANSPORTE</option>
                <option value="GERENCIA DE MANUTENCAO ELETRICA">GERENCIA DE MANUTENCAO ELETRICA</option>
                <option value="GERENCIA DE MANUTENCAO REFRATARIA">GERENCIA DE MANUTENCAO REFRATARIA</option>
                <option value="GERENCIA DE MANUT MAQ MOV E CORREIAS TRANSP">GERENCIA DE MANUT MAQ MOV E CORREIAS TRANSP</option>
                <option value="GERENCIA DE MANUTENCAO MECANICA">GERENCIA DE MANUTENCAO MECANICA</option>
                <option value="GERENCIA DE MANUTENCAO">GERENCIA DE MANUTENCAO</option>
                <option value="GERENCIA DE MANUTENCAO DO LTQ">GERENCIA DE MANUTENCAO DO LTQ</option>
                <option value="GERENCIA DE MANUTENCAO ELETROMECANICA">GERENCIA DE MANUTENCAO ELETROMECANICA</option>
		<option value="GERENCIA DE MEIO AMBIENTE">GERENCIA DE MEIO AMBIENTE</option>
                <option value="GERENCIA DE MOVIMENTACAO DE PRODUTO">GERENCIA DE MOVIMENTACAO DE PRODUTO</option>
                <option value="GERENCIA DE OFICINAS MECANICAS">GERENCIA DE OFICINAS MECANICAS</option>
                <option value="GERENCIA DE PATIO DE MATERIAS PRIMAS">GERENCIA DE PATIO DE MATERIAS PRIMAS</option>
                <option value="GERENCIA DE PCP EMBALAGEM E LOGISTICA">GERENCIA DE PCP EMBALAGEM E LOGISTICA</option>
                <option value="GERENCIA DE PREP ARMAZENAGEM BOBINAS">GERENCIA DE PREP ARMAZENAGEM BOBINAS</option>
                <option value="GERENCIA DE PROG CONTR E ABASTECIMENTO">GERENCIA DE PROG CONTR E ABASTECIMENTO</option>
                <option value="GERENCIA DE PROJETOS ALTO FORNO">GERENCIA DE PROJETOS ALTO FORNO</option>
                <option value="GERENCIA DE PROJETOS COQUERIA">GERENCIA DE PROJETOS COQUERIA</option>
                <option value="GERENCIA DE PROJETOS LAMINACAO">GERENCIA DE PROJETOS LAMINACAO</option>
                <option value="GERENCIA DE PROJETOS METALURGIA DO ACO">GERENCIA DE PROJETOS METALURGIA DO ACO</option>
                <option value="GERENCIA DE PROJETOS SINTERIZACAO">GERENCIA DE PROJETOS SINTERIZACAO</option>
                <option value="GERENCIA DE QUALIDADE E INOVACAO">GERENCIA DE QUALIDADE E INOVACAO</option>
                <option value="GERENCIA DE RECOZIMENTO E ACABAMENTO">GERENCIA DE RECOZIMENTO E ACABAMENTO</option>
                <option value="GERENCIA DE RECOZIMENTO E ZINCAGEM">GERENCIA DE RECOZIMENTO E ZINCAGEM</option>
                <option value="GERENCIA DE REDUCAO A FRIO LTF 3">GERENCIA DE REDUCAO A FRIO LTF 3</option>
		<option value="GERENCIA DE SEGURANÇA DO TRABALHO">GERENCIA DE SEGURANÇA DO TRABALHO</option>
                <option value="GERENCIA DE SINTERIZACOES">GERENCIA DE SINTERIZACOES</option>
                <option value="GERENCIA DE SUPORTE OPERACIONAL">GERENCIA DE SUPORTE OPERACIONAL</option>
                <option value="GERENCIA DE TRANSPORTE FERROVIARIO INTERNO">GERENCIA DE TRANSPORTE FERROVIARIO INTERNO</option>
                <option value="GERENCIA DE TECNOLOGIA DE AUTOMACAO">GERENCIA DE TECNOLOGIA DE AUTOMACAO</option>
                <option value="GERENCIA DESENV PRODUTOS UPV">GERENCIA DESENV PRODUTOS UPV</option>
                <option value="GERENCIA GERAL  DE PLANEJAMENTO E LOGISTICA">GERENCIA GERAL  DE PLANEJAMENTO E LOGISTICA</option>
                <option value="GERENCIA GERAL DE DESENV DE PRODUTOS">GERENCIA GERAL DE DESENV DE PRODUTOS</option>
                <option value="GERENCIA GERAL DE EXECUCAO">GERENCIA GERAL DE EXECUCAO</option>
                <option value="GERENCIA GERAL DE METALURGIA DO ACO">GERENCIA GERAL DE METALURGIA DO ACO</option>
                <option value="GERENCIA GERAL DE REDUTORES">GERENCIA GERAL DE REDUTORES</option>
                <option value="GERENCIA GERAL DE SINTERIZACAO E ALTO FORNO">GERENCIA GERAL DE SINTERIZACAO E ALTO FORNO</option>
                <option value="GERENCIA GERAL PRODUCAO ACOS LONGOS">GERENCIA GERAL PRODUCAO ACOS LONGOS</option>
                <option value="GERENCIA LAMINACAO QUENTE FRIO">GERENCIA LAMINACAO QUENTE FRIO</option>
                <option value="GERENCIA MANUT GALVANIZ E LAMINADOS FRIO">GERENCIA MANUT GALVANIZ E LAMINADOS FRIO</option>
                <option value="GERENCIA MANUT LINGOTAMENTO CONTINUO">GERENCIA MANUT LINGOTAMENTO CONTINUO</option>
                <option value="GERENCIA MANUT MAQ MOV E CORREIAS TRANSP">GERENCIA MANUT MAQ MOV E CORREIAS TRANSP</option>
                <option value="GERENCIA MANUTENCAO DE UTILIDADES">GERENCIA MANUTENCAO DE UTILIDADES</option>
                <option value="GERENCIA MANUTENCAO REFRATARIA">GERENCIA MANUTENCAO REFRATARIA</option>
                <option value="GERENCIA QUALID PRODUTOS ASSIST TECNICA">GERENCIA QUALID PRODUTOS ASSIST TECNICA</option>
                <option value="GERENCIA TECNOLOGIA DE AUTOMACAO">GERENCIA TECNOLOGIA DE AUTOMACAO</option>
                <option value="GERENCIA TRANSPORTE FERROVIARIO INTERNO">GERENCIA TRANSPORTE FERROVIARIO INTERNO</option>
		<option value="RH">RH</option>
            </select>
                <br>
            <input type="checkbox" id="csn" name="csn">
            <label for="csn">Não trabalho na CSN</label>
            <button id="btContinuar" onclick="confirmar_3()"><i>VER MEU RESULTADO</i></button>
        </div>
    </div>
    <script src="../passagemDados.js"></script>
</body>
</html>
<?php }else{
        header('Location: quiz.html');
} ?>
