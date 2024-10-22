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
    endereco VARCHAR(240) NOT NULL,
    nome VARCHAR(100),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(idUsuario)
);