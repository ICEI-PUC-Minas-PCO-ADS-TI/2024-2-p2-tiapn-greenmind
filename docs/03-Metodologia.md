
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia de trabalho adotada para o projeto "GreenMind" segue princípios ágeis com foco no Scrum, permitindo uma abordagem flexível e iterativa. A equipe se organiza em sprints curtos, possibilitando entregas contínuas e ajustes ao longo do desenvolvimento.

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. A relação dos ambientes com seus respectivos propósitos deverá ser apresentada em uma tabela que especifique e detalhe Ambiente, Plataforma e Link de Acesso. Defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | https://github.com/ICEI-PUC-Minas-PCO-ADS-TI/2024-2-p2-tiapn-greenmind                        |
| Projeto de interface                | Figma                              | https://www.figma.com/files/team/1409007676093007271/recents-and-sharing/recently-viewed?fuid=1352005878152333410                            |
| Gerenciamento do projeto            | GitHub Projects                    | https://github.com/orgs/ICEI-PUC-Minas-PCO-ADS-TI/projects/15                           |
| Hospedagem                          | Vercel                             | http://....                            |

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `documentacao`: versão da entrega da sprint 1 documentada
- `documentacao sprint-2`: versão da entrega da sprint 2 documentada
- `sprint-3-BD`: versão para o desenvolvimento dos wireframes e banco de dados, entrega sprint 3
- `consertando erros`: versão para a correção de erros das sprints anteriores
- `sprint-4`: versão para o desenvolvimento dos artefatos
- `sprint-5`: versão para a integração e finalização do projeto

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `apresentation`: para aprensetação de slides ou reuniões
- `diagrama`: para o identificar os diagramas que foram/serão desenvolvidos
- `comandos`: identificar os scripts ou códigos do projeto
- `modeling`: modelagem do site/ wireframes
- `question`: dúvidas em relação ao desenvolvimento do projeto

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- Documentação Contexto: Christian Sena Gomes, Diego Chaves, Gabriel Henrique, Victor Bryan, Samuel Andrade, João Pedro dos Santos, Lara Damas, Marcela Anjos
- Requisitos: Christian Sena Gomes, Diego Chaves, João Pedro dos Santos
- Casos de uso: Christian Sena Gomes, Gabriel Henrique, Victor Bryan, Marcela Anjos
- Personas: Diego Chaves, Victor Bryan, Samuel Andrade, Lara Damas
- Mapa De Stakeholders: Samuel Andrade,  Lara Damas, Marcela Anjos
- Slide: João Pedro dos Santos

  
#### Sprint 2
- AS-IS e TO-BE Água e Luz: Lara Damas, Victor Bryan, Christian Sena Gomes, Diego Chaves
- AS-IS e TO-BE Alimentos: Lara Damas, Victor Bryan, Marcela Anjos, Samuel Andrade
- Modelagem processos de negócio (github): Victor Bryan, Christian Sena Gomes, Gabriel Henrique
- Relatório : João Pedro, Diego Chaves
- Slides : João Pedro, Samuel Andrade, Gabriel Henrique


#### Sprint 3
- Figma: Lara Melo Damas, Samuel Andrade Neto, Marcela Anjos
- Userflow : Lara Melo Damas, Diego Chaves, Marcela Anjos
- Jornada Do Usuário: Lara Melo Damas, Samuel Andrade Neto, Diego Chaves , João Pedro dos Santos
- Diagrama de Classes: Christian Sena Gomes, Marcela Anjos
- Diagrama Pé de Galinha: Christian Sena Gomes, Gabriel Henrique
- Scripts Banco de Dados: Christian Sena Gomes
- Minimundo: Samuel Andrade Neto, Diego Chaves, Gabriel Henrique
- Scripts Banco de Dados: Diego Chaves
- Slide: João Pedro dos Santos, Victor Bryan, Gabriel Henrique
- Diagrama Entidade Relacionamento (Peter Chen): João Pedro dos Santos, Victor Bryan, Gabriel Henrique
- Relatório: João Pedro dos Santos, Victor Bryan


#### Sprint 4
- Tela Home: Lara Melo Damas
- Paginas de Conteúdo: Lara Melo Damas
- Pontos de Reciclgem: Diego Chaves
- Tela e API OpenStreetMap: Diego Chaves
- Tela Desperdício de Alimento: João Pedro
- Pegada Ecológica: Gabriel Henrique
- Tela Login e Cadastro: Christian Sena Gomes
- CRUD Login e Cadastro: Christian Sena Gomes
- Tela De Consumo De Agua: Samuel Andrade
- Tela De Consumo De Luz: Samuel Andrade


#### Sprint 5
- _Scrum master_: AlunaX
- Protótipos: AlunoY
- Testes: AlunoK
- Documentação: AlunaZ

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Christian Sena Gomes        | Documentação Contexto | 16/08/2024     | 08/09/2024 | ✔️    | 08/09/2024      |
| Christian Sena Gomes        | Requisitos    | 16/08/2024     | 08/09/2024 | ✔️    |  08/09/2024               |
| Christian Sena Gomes        | Casos de uso  | 16/08/2024     | 08/09/2024 | ✔️     | 08/09/2024                |
| Diego Chaves       | Documentação Contexto  |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Diego Chaves       | Requisitos  |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Diego Chaves       | Personas  |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Gabriel Henrique  | Documentação Contexto  |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Gabriel Henrique  | Casos de Uso|    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Victor Bryan  | Documentação Contexto |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Victor Bryan  | Personas |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Victor Bryan  | Caso de Uso |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Samuel Andrade  | Persona |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Samuel Andrade  | Documentação Contexto |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Samuel Andrade  | Mapa De Stakeholders |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| João Pedro dos Santos  | Documentação Contexto |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| João Pedro dos Santos  | Requisitos |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| João Pedro dos Santos  | Slide |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Lara Damas  | Documentação Contexto |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Lara Damas  | Personas |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Lara Damas  | Mapa de Stakeholders |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Marcela Anjos | Documentação Contexto |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Marcela Anjos | Casos de Uso |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |
| Marcela Anjos  | Mapa de Stakeholders |    16/08/2024        | 08/09/2024 | ✔️    |   08/09/2024    |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Lara Damas        | AS-IS e TO-BE Água e Luz   | 26/09/2024     | 30/09/2024 | ✔️    | 30/09/2024      |
| Lara Damas        | AS-IS e TO-BE Alimentos  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Victor Bryan        | AS-IS e TO-BE Água e Luz  | 26/09/2024     | 30/09/2024 | ✔️     |   30/09/2024              |
| Victor Bryan        | AS-IS e TO-BE Alimentos  |  26/09/2024    | 30/09/2024 | ✔️    |   30/09/2024    |
| Victor Bryan        | Modelagem processos de negócio (github)  |  27/09/2024    | 30/09/2024 | ✔️    |   29/09/2024    |
| João Pedro        | Relatório  |  28/09/2024    | 30/09/2024 | ✔️    |   30/09/2024    |
| João Pedro        | Slides  |  26/09/2024    | 30/09/2024 | ✔️    |   30/09/2024    |
| Victor Bryan        | Modelagem processos de negócio (github)  |  27/09/2024    | 30/09/2024 | ✔️    |   29/09/2024    |
| Marcela Anjos        | AS-IS e TO-BE Alimentos  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Samuel Andrade        | Slide  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Samuel Andrade        | TO-BE Alimentos  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Christian Sena Gomes        | AS-IS e TO-BE Água e Luz  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Christian Sena Gomes        | Modelagem processos de negócio (github)  | 27/09/2024     | 30/09/2024 | ✔️    |   29/09/2024     |
| Gabriel Henrique       | Slides  | 26/09/2024     | 30/09/2024 | ✔️    |   30/09/2024     |
| Gabriel Henrique        | Metodologia (github)  | 27/09/2024     | 30/09/2024 | ✔️    |   29/09/2024     |

#### Sprint 3

Atualizado em: 20/10/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Lara Melo Damas        | Figma   | 10/10/2024     | 20/10/2024 | ✔️    | 20/10/2024      |
| Lara Melo Damas       | Userflow   | 17/10/2024     | 20/10/2024 | ✔️    | 17/10/2024      |
| Lara Melo Damas        | Jornada Do Usuário   | 11/10/2024     | 20/10/2024 | ✔️    | 11/10/2024      |
| Christian Sena Gomes       | Diagrama de Classes  | 11/10/2024     | 20/10/2024 | ✔️    |   19/10/2024     |
| Christian Sena Gomes       | Diagrama Pé de Galinha  | 17/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Christian Sena Gomes       | Scripts Banco de Dados  | 19/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Samuel Andrade Neto       | Figma  | 10/10/2024     | 20/10/2024 | ✔️     |   20/10/2024              |
| Samuel Andrade Neto       | Jornada Do Usuario  |  11/10/2024    | 20/10/2024 | ✔️    |   11/10/2024    |
| Samuel Andrade Neto       | Minimundo  | 17/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Diego Chaves        | Scripts Banco de Dados  | 19/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Diego Chaves       | Userflow   | 17/10/2024     | 20/10/2024 | ✔️    | 17/10/2024      |
| Diego Chaves       | Minimundo  | 17/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Diego Chaves        | Jornada Do Usuário   | 11/10/2024     | 20/10/2024 | ✔️    | 11/10/2024      |
| João Pedro dos Santos       | Slide  | 18/10/2024     | 20/10/2024 | ✔️     |   20/10/2024              |
| João Pedro dos Santos         | Jornada Do Usuario  |  11/10/2024    | 20/10/2024 | ✔️    |   11/10/2024    |
| João Pedro dos Santos         | Diagrama Entidade Relacionamento (Peter Chen)  | 12/10/2024     | 20/10/2024 | ✔️    |   19/10/2024     |
| João Pedro dos Santos         | Relatório  | 19/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Victor Bryan       | Slide  | 18/10/2024     | 20/10/2024 | ✔️     |   20/10/2024              |
| Victor Bryan         | Diagrama Entidade Relacionamento (Peter Chen)  | 12/10/2024     | 20/10/2024 | ✔️    |   19/10/2024     |
| Victor Bryan        | Relatório  | 19/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Gabriel Henrique | Minimundo  | 14/10/2024     | 20/10/2024 | ✔️    |   14/10/2024     |
| Gabriel Henrique | Diagrama Pé de Galinha | 18/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Gabriel Henrique | Slide  | 01/10/2024     | 20/10/2024 | ✔️    |   20/10/2024     |
| Gabriel Henrique | Diagrama Entidade Relacionamento (Peter Chen) | 15/10/2024     | 20/10/2024 | ✔️    |   18/10/2024     |
| Marcela Anjos      | Figma   | 10/10/2024     | 20/10/2024 | ✔️    | 20/10/2024      |
| Marcela Anjos      | Userflow   | 17/10/2024     | 20/10/2024 | ✔️    | 17/10/2024      |
| Marcela Anjos      | Diagrama de Classes  | 11/10/2024     | 20/10/2024 | ✔️    |   18/10/2024     |

#### Sprint 4

Atualizado em: 21/11/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Lara Melo Damas        | Tela Home  | 10/10/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Lara Melo Damas        | Paginas de Conteúdo | 10/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Diego Chaves        | Pontos de Reciclgem  | 10/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Diego Chaves        | Tela e API OpenStreetMap  | 10/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| João Pedro      | Tela Desperdício de Alimento    | 15/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Gabriel Henrique      | Pegada Ecológica    | 13/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Christian Sena Gomes      | Tela Login e Cadastro    | 13/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Christian Sena Gomes      | CRUD Login e Cadastro    | 13/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Samuel Andrade     | Tela De Consumo De Agua   | 10/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |
| Samuel Andrade      | Tela De Consumo De Luz    | 10/11/2024     | 21/11/2024 | ✔️    | 21/11/2024      |





Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | http://....                            |
| Documentos do projeto               | GitHub                             | http://....                            |
| Projeto de interface                | Figma                              | http://....                            |
| Gerenciamento do projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | Vercel                             | http://....                            |
 
