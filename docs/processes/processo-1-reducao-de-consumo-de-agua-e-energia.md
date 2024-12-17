### 3.3.1 Processo 1 – Redução de Consumo de Água e Energia

O processo de Redução de Consumo de Água e Energia pode ser aprimorado em diversos aspectos. Algumas oportunidades de melhoria incluem: a automação da coleta de dados, maior engajamento dos alunos no monitoramento do consumo, uso de tecnologia para fornecer feedback em tempo real, e ajustes contínuos nas estratégias com base em análises mais precisas. Além disso, a integração de relatórios digitais e a implementação de um sistema de acompanhamento das metas podem garantir uma maior eficácia na redução do desperdício

 ![processo1asis](https://github.com/user-attachments/assets/272e3e68-704a-4a62-851c-8d98abd52c6e)



_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - chat entre equipe e comunidade escolar_

_* **Data** - A Coleta de dados ocorrerá mensalmente_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** -  Escolher um status de aprovação ("Aprovado", "Em Revisão", "Recusado").

_* **Arquivo** - campo de upload de documento_


_* **Tabela** -  facilitando a visualização de múltiplos dados ao mesmo tempo_


**Nome da atividade 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
 Chat entre a equipe e a comunidade | Área de texto   | Deve oferecer sugestões de redução de consumo | null          |
| Feedbacks de rejeição        | Caixa de texto | A sugestão deve ser negada       | null          |
| Combinar encontro para inspeção | Data e Hora    | A proposta de inspeção deve ser aceita | null      |
| Enviar imagens para verificação de práticas | Imagem        | Deve haver imagens de práticas atuais | null       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar mensagem      | Verificar imagens das práticas      | Mensagem   |
| Enviar feedback      | Receber feedback                    | Mensagem   |
| Agendar inspeção     | Realizar inspeção                   | Date       |
| Enviar imagens       | Verificar imagens das práticas      | Imagem     |
