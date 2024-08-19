-- Adicione suas migrações aqui
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(11),
    email VARCHAR(45)
);
