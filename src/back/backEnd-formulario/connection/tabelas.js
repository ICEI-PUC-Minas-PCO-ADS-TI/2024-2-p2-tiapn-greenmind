class Tabelas {
    init(connection) {
      this.connection = connection;
      this.createTabelasFormulario();
    }
  
    createTabelasFormulario() {
      const sqlPerguntas = `
        CREATE TABLE IF NOT EXISTS perguntasForm (
          id INT AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(255) NOT NULL
        );
      `;
  
      const sqlAlternativas = `
        CREATE TABLE IF NOT EXISTS alternativasForm (
          id INT AUTO_INCREMENT PRIMARY KEY,
          idPergunta INT NOT NULL,
          perguntaMsg VARCHAR(255) NOT NULL,
          msgErro VARCHAR(255),
          isRespostaErrada BOOLEAN NOT NULL,
          FOREIGN KEY (idPergunta) REFERENCES perguntasForm(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `;
  
      // Criando a tabela perguntasForm
      this.connection.query(sqlPerguntas, (error) => {
        if (error) {
          console.log("Erro ao criar a tabela perguntasForm");
          console.log(error.message);
          return;
        }
        console.log("Tabela perguntasForm criada com sucesso!");
  
        // Inserindo perguntas na tabela perguntasForm
        const sqlInserirPerguntas = `
          INSERT INTO perguntasForm (titulo)
          VALUES
            ('Qual dos seguintes ODS visa garantir o acesso de todos à água potável e ao saneamento?'),
            ('O que a economia circular busca reduzir?'),
            ('Qual das seguintes fontes de energia é considerada renovável?'),
            ('O que é o "consumo consciente"?'),
            ('Qual das seguintes atividades é uma das principais causadoras do aquecimento global?');
        `;
        this.connection.query(sqlInserirPerguntas, (error) => {
          if (error) {
            console.log("Erro ao inserir perguntas");
            console.log(error.message);
            return;
          }
          console.log("Perguntas inseridas com sucesso!");
  
          // Criando a tabela alternativasForm
          this.connection.query(sqlAlternativas, (error) => {
            if (error) {
              console.log("Erro ao criar a tabela alternativasForm");
              console.log(error.message);
              return;
            }
            console.log("Tabela alternativasForm criada com sucesso!");
  
            // Inserindo alternativas na tabela alternativasForm
            const sqlInserirAlternativas = `
              INSERT INTO alternativasForm (idPergunta, perguntaMsg, msgErro, isRespostaErrada)
              VALUES
                (1, 'ODS 6: Água Potável e Saneamento', '', 0),
                (1, 'ODS 3: Saúde e Bem-estar', 'Errada: ODS 3 foca na promoção da saúde e bem-estar, mas não aborda diretamente o acesso à água.', 1),
                (1, 'ODS 4: Educação de Qualidade', 'Errada: ODS 4 trata de educação, sem relação direta com água.', 1),
                (1, 'ODS 11: Cidades e Comunidades Sustentáveis', 'Errada: ODS 11 trata de cidades sustentáveis, mas não foca diretamente em água potável.', 1),
  
                (2, 'O desperdício de recursos e a produção de resíduos', '', 0),
                (2, 'O uso de recursos renováveis, como a energia solar', 'Errada: A economia circular não foca exclusivamente em fontes renováveis, mas na redução de desperdícios.', 1),
                (2, 'A quantidade de consumidores em um mercado', 'Errada: A economia circular não tem como objetivo reduzir o número de consumidores.', 1),
                (2, 'O tempo de vida útil dos produtos', 'Errada: A economia circular busca prolongar a vida útil dos produtos, não reduzi-la.', 1),
  
                (3, 'Energia Solar', '', 0),
                (3, 'Petróleo', 'Errada: O petróleo é uma fonte de energia não renovável.', 1),
                (3, 'Carvão', 'Errada: O carvão é uma fonte não renovável e altamente poluente.', 1),
                (3, 'Energia Nuclear', 'Errada: A energia nuclear depende de urânio, um recurso finito, e não é renovável.', 1),
  
                (4, 'Optar por produtos que causem o menor impacto ambiental possível', '', 0),
                (4, 'Comprar produtos sem considerar os impactos ambientais', 'Errada: O consumo consciente busca evitar o impacto ambiental negativo.', 1),
                (4, 'Consumir produtos apenas de marcas renomadas', 'Errada: O consumo consciente não está relacionado com a marca, mas com a escolha sustentável.', 1),
                (4, 'Comprar sempre produtos em grande quantidade para obter descontos', 'Errada: Comprar em grande quantidade pode levar ao desperdício, o que vai contra o consumo consciente.', 1),
  
                (5, 'Desmatamento e emissão de gases de efeito estufa', '', 0),
                (5, 'Uso excessivo de fertilizantes agrícolas', 'Errada: Embora o uso excessivo de fertilizantes polua, o principal motor do aquecimento global é o desmatamento e gases de efeito estufa.', 1),
                (5, 'Exposição de florestas à luz solar', 'Errada: A exposição das florestas à luz solar não é uma causa relevante do aquecimento global.', 1),
                (5, 'Práticas de jardinagem em áreas urbanas', 'Errada: Práticas de jardinagem têm um impacto menor no aquecimento global comparado ao desmatamento.', 1);
            `;
            this.connection.query(sqlInserirAlternativas, (error) => {
              if (error) {
                console.log("Erro ao inserir alternativas");
                console.log(error.message);
                return;
              }
              console.log("Alternativas inseridas com sucesso!");
            });
          });
        });
      });
    }
  }
  
  module.exports = new Tabelas();
  