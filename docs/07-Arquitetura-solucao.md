# Arquitetura da solução

![diagramaImplantacao](https://github.com/user-attachments/assets/f0c225cd-5711-4b56-aec5-c23ee7ed47ea)


## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

> **Links úteis**:
> - [Diagramas de classes - documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.7.0?topic=diagrams-class)
> - [O que é um diagrama de classe UML?](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

##  Modelo de dados

![Modelo de dados](https://github.com/user-attachments/assets/70f87b58-db57-4ba5-9626-908a4c2e52aa)



### Modelo ER

O Modelo ER representa, por meio de um diagrama, como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

> **Links úteis**:
> - [Como fazer um diagrama entidade relacionamento](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

### Esquema relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 

![Exemplo de um modelo relacional](images/modelo_relacional.png "Exemplo de modelo relacional.")
---

> **Links úteis**:
> - [Criando um modelo relacional - documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/12.0.0?topic=designer-creating-relational-model)

### Modelo físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:
<!--
```sql
-- Criação da tabela Medico
CREATE TABLE Medico (
    MedCodigo INTEGER PRIMARY KEY,
    MedNome VARCHAR(100)
);

-- Criação da tabela Paciente
CREATE TABLE Paciente (
    PacCodigo INTEGER PRIMARY KEY,
    PacNome VARCHAR(100)
);

-- Criação da tabela Consulta
CREATE TABLE Consulta (
    ConCodigo INTEGER PRIMARY KEY,
    MedCodigo INTEGER,
    PacCodigo INTEGER,
    Data DATE,
    FOREIGN KEY (MedCodigo) REFERENCES Medico(MedCodigo),
    FOREIGN KEY (PacCodigo) REFERENCES Paciente(PacCodigo)
);

-- Criação da tabela Medicamento
CREATE TABLE Medicamento (
    MdcCodigo INTEGER PRIMARY KEY,
    MdcNome VARCHAR(100)
);

-- Criação da tabela Prescricao
CREATE TABLE Prescricao (
    ConCodigo INTEGER,
    MdcCodigo INTEGER,
    Posologia VARCHAR(200),
    PRIMARY KEY (ConCodigo, MdcCodigo),
    FOREIGN KEY (ConCodigo) REFERENCES Consulta(ConCodigo),
    FOREIGN KEY (MdcCodigo) REFERENCES Medicamento(MdcCodigo)
);
```
-->
```sql
-- Criação da tabela Usuário
CREATE TABLE Usuario (
    idUsuario INTEGER NOT NULL PRIMARY KEY,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL,
    data_cadastro DATE NOT NULL
);
-- Criação da tabela Anúncio
CREATE TABLE Anuncio (
    id_anuncio INTEGER NOT NULL PRIMARY KEY,
    titulo VARCHAR(50),
    data_publicacao DATE NOT NULL,
    descricao VARCHAR(100),
    link VARCHAR(256),
    imagem BLOB NOT NULL,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Conteúdo Educativo
CREATE TABLE ConteudoEducativo (
    id_conteudo INTEGER NOT NULL PRIMARY KEY,
    descricao VARCHAR(2048) NOT NULL,
    titulo VARCHAR(90) NOT NULL,
    categoria VARCHAR(45),
    data_publicacao DATE,
    tipo VARCHAR(45),
    arquivo BLOB,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Comentários
CREATE TABLE Comentarios (
    conteudo VARCHAR(180) NOT NULL,
    id_conteudoEducativo INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY (id_conteudoEducativo, id_usuario),
    FOREIGN KEY (id_conteudoEducativo) REFERENCES ConteudoEducativo(id_conteudo),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Desafio
CREATE TABLE Desafio (
    id_desafio INTEGER NOT NULL PRIMARY KEY,
    categoria VARCHAR(45),
    data_inicio DATE,
    data_fim DATE,
    titulo VARCHAR(90) NOT NULL,
    descricao VARCHAR(180),
    status VARCHAR(45),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Desperdícios Alimentares
CREATE TABLE DesperdiciosAlimentares (
    id_reducao INTEGER NOT NULL,
    data_registro DATE,
    quantidade_evitada DECIMAL NOT NULL,
    tipo_alimento VARCHAR(45),
    local_descarte VARCHAR(45),
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY (id_reducao, id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Consumo
CREATE TABLE Consumo (
    id_consumo INTEGER NOT NULL,
    tipo_consumo VARCHAR(45),
    quantidade_consumida DECIMAL NOT NULL,
    data_registro DATE,
    id_usuario INTEGER NOT NULL,
    PRIMARY KEY (id_consumo, id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
-- Criação da tabela Resultados Desafio
CREATE TABLE ResultadosDesafio (
    data_conclusao DATE,
    id_usuario INTEGER NOT NULL,
    id_desafio INTEGER NOT NULL,
    PRIMARY KEY (id_usuario, id_desafio),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (id_desafio) REFERENCES Desafio(id_desafio)
);
-- Criação da tabela Ponto de Reciclagem
CREATE TABLE PontoDeReciclagem (
    id_ponto_de_reciclagem INTEGER NOT NULL PRIMARY KEY,
    horario_funcionamento DATETIME,
    tipo_material VARCHAR(45),
    endereco VARCHAR(240),
    nome VARCHAR(100),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);
```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

Descreva qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.


| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end      | HTML + CSS + JS + React |
| Back-end       | Node.js         |
| SGBD           | MySQL           |
| Deploy         | Vercel          |


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

Conceituar qualidade é uma tarefa complexa, mas ela pode ser vista como um método gerencial que, por meio de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto do desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem atendidas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, esse nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software. Com base nessas características e nas respectivas subcaracterísticas, identifique as subcaracterísticas que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software, considerando alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão à equipe avaliar os objetos de interesse.

> **Links úteis**:
> - [ISO/IEC 25010:2011 - Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — System and Software Quality Models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de software - Engenharia de Software](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209)
