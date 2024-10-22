# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

## Personas

**Persona 1: João, 16 anos, Estudante do Ensino Médio**
- **Objetos Físicos e Digitais:** 
  Caderno, livros escolares, smartphone, laptop;
- **Objetivos Chave:**
  Aprender sobre práticas sustentáveis para projetos escolares e aplicar em casa;
- **Por que Ele Precisa do Serviço:**
  Para obter informações acessíveis e práticas aplicáveis à sua faixa etária e vida diária;
- **Como Devemos Tratá-lo:**
  De forma empática e encorajadora, com conteúdos interativos, educativos e divertidos.

**Persona 2: Maria, 32 anos, Engenheira Ambiental**
- **Objetos Físicos e Digitais:** 
  Documentos técnicos, laptop, smartphone;
- **Objetivos Chave:** 
  Manter-se atualizada sobre novas práticas sustentáveis e aplicá-las na vida profissional e pessoal;
- **Por que Ela Precisa do Serviço:** 
  Para acessar informações técnicas e práticas no cotidiano;
- **Como Devemos Tratá-la:** 
  Com profissionalismo, fornecendo conteúdo de alta qualidade e respeitando seu nível de conhecimento.

**Persona 3: Ana, 45 anos, Dona de Casa**
- **Objetos Físicos e Digitais:** 
  Utensílios domésticos, smartphone, computador de mesa.
- **Objetivos Chave:**
  Aprender maneiras econômicas de aplicar sustentabilidade em casa.
- **Por que Ela Precisa do Serviço:** 
  Para obter dicas práticas e fáceis de incorporar à rotina diária.
- **Como Devemos Tratá-la:**
  Com empatia e praticidade, oferecendo soluções rápidas e acessíveis.

**Persona 4: Lucas Martins, 20 anos, Estudante Universitário e Jovem Ativista Ambiental**
- **Objetos Físicos e Digitais:**
  Smartphone, computador, aplicativos de redes sociais, materiais educativos sobre reciclagem e sustentabilidade,ferramentas para organização de eventos comunitários.
- **Objetivos Chave:**
  Promover ações de conscientização ambiental, expandir seu conhecimento sobre práticas sustentáveis e organizar eventos comunitários de coleta seletiva para engajar sua comunidade na reciclagem e redução de desperdício.
- **Por que Ele Precisa do Serviço:**
  Quero usar o mapa de pontos de reciclagem para organizar ações comunitárias de coleta seletiva.
- **Como Devemos Tratá-lo:**
  Ofereça recursos educativos acessíveis e interativos, como quizzes e desafios, com ênfase em temas relacionados à reciclagem e redução de desperdício. Proporcione ferramentas para o planejamento e compartilhamento de eventos comunitários, além de mapas de pontos de reciclagem que ele possa divulgar para seus seguidores e participantes.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Estudante do ensino médio  | Acessar conteúdos  educativos sobre reciclagem e práticas sustentáveis.           | Aplicar esses conhecimentos em um projeto escolar e em casa, tornando minhas ações mais conscientes e ajudando a criar um impacto positivo no meio ambiente.     |
|Engenheira ambiental       |Fazer desafios/quizzes para entender meu impacto no meio ambiente                 | Implementar essas práticas em meus projetos profissionais e compartilhar conhecimentos com meus colegas de trabalho, influenciando positivamente a comunidade. |
|Dona de casa | Acessar sugestões de como reduzir o desperdício de alimentos e usar produtos ecológicos na cozinha. | Tornar minha casa mais sustentável de maneira prática e econômica. |
| Estudante Universitário e Jovem Ativista Ambiental |  Promover ações de conscientização ambiental | Quero usar o mapa de pontos de reciclagem para organizar ações comunitárias de coleta seletiva.|

## Requisitos

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário faça login/cadastro | ALTA | 
|RF-002| Permitir que o usuário comente em publicações  | MÉDIA |
|RF-003| Permitir que o usuário jogue quizzes  | MÉDIA |
|RF-004| Permitir que o usuário gerencie o seu perfil  | BAIXA |
|RF-005| Permitir que o usuário visualize e participe de desafios   | MÉDIA |
|RF-006| Permitir que o usuário administrador gerencie os usuários  | ALTA |
|RF-007| Permitir que o usuário administrador crie publicações  | ALTA |
|RF-008| Permitir que o usuário administrador exclua publicações  | ALTA |
|RF-009| Permitir que o usuário registre consumo de água e energia | BAIXA |
|RF-010| Permitir que o usuário visualize gráficos de consumo | BAIXA |
|RF-011| Permitir que o usuário acesse o mapa de pontos de reciclagem  | MÉDIA |
|RF-012| Permitir que o usuário calcule sua pegada ecológica | ALTA |
|RF-013| Permitir que o usuário faça download de placas educativas | BAIXA |
|RF-014| Permitir que o usuário administre seus favoritos | BAIXA |
|RF-015| Permitir que o usuário receba notificações sobre novos conteúdos e desafios | BAIXA |
|RF-016| Permitir que o usuário visualize e acesse conteúdos favoritos | BAIXA |
|RF-017| Permitir que o usuário visualize relatórios personalizados sobre sua redução de desperdício | BAIXA |
|RF-018| Permitir que o usuário compartilhe conquistas nas redes sociais | BAIXA |
|RF-019| Permitir que parceiros solicitem anúncios na plataforma | ALTA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O site deve ser compatível com os sistemas operacionais Android e iOS | ALTA | 
|RNF-002| Deve ter um tempo de resposta de no máximo 2 segundos |  MÉDIA | 
|RNF-003| Deve suportar um grande número de usuários simultâneos |  MÉDIA | 
|RNF-004| Deve ser intuitivo |  BAIXA | 
|RNF-005| O sistema deve ter uma disponibilidade mínima de 99,9% |  MÉDIA | 
|RNF-006| Deve ser responsivo em dispositivos móveis e desktops |  ALTA | 
|RNF-007| Deve permitir atualizações frequentes sem interrupções significativas no serviço. |  BAIXA | 

## Restrições

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |
|003| Não podem ser subcontratados desenvolvedores       |
|004| Deve ser desenvolvido um módulo de backend       |
|005| Deve ser desenvolvido um banco de dados       |
|006| O projeto deve seguir a metodologia ágil SCRUM       |

## Diagrama de casos de uso

![Diagrama de casos de uso](./images/DiagramaCasosDeUso.svg)
