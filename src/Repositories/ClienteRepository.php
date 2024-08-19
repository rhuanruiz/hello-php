<?php

namespace src\Repositories;

use PDO;

class ClienteRepository {

    private $pdo;

    public function __construct(
        PDO $pdo
    ) {
        $this->pdo = $pdo;
    }

    public function buscarClientes() {
        $query = $this->pdo->prepare(
            'SELECT * FROM clientes'
        ); 
        $query->execute();
        $resposta = $query->fetchAll(PDO::FETCH_ASSOC);
        return $resposta; 
    }

    public function buscarPorTelefone($telefone) {
        $query = $this->pdo->prepare(
            'SELECT * FROM clientes WHERE telefone = :telefone'
        );
        $query->execute([
            'telefone' => $telefone
        ]);
        $resposta = $query->fetchAll(PDO::FETCH_ASSOC); 
        return $resposta;
    }

    public function criarCliente($dados) {
        $query = $this->pdo->prepare(
            'INSERT INTO clientes (nome, telefone, data_nascimento, cpf, email) 
            VALUES (:nome, :telefone, :data_nascimento, :cpf, :email)'
        );
        $resposta = $query->execute([
            'nome' => $dados->nome,
            'telefone' => preg_replace('/\D/', '', $dados->telefone),
            'data_nascimento' => $dados->data_nascimento,
            'cpf' => preg_replace('/\D/', '', $dados->cpf),
            'email' => $dados->email
        ]);
        return $resposta;
    }

    public function excluirCliente($id) {
        $query = $this->pdo->prepare(
            'DELETE FROM clientes WHERE id = :id'
        );
        $resposta = $query->execute([
            'id' => $id
        ]);
        return $resposta;
    }
}