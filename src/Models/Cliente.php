<?php

namespace src\Models;

class Cliente {
    
    private $nome;
    private $telefone;
    private $data_nascimento;
    private $email;
    private $cpf;

    public function __construct(
        $nome, 
        $telefone, 
        $data_nascimento, 
        $email, 
        $cpf
    ) {
        $this->nome = $nome;
        $this->telefone = $telefone;
        $this->data_nascimento = $data_nascimento;
        $this->email = $email;
        $this->cpf = $cpf;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getTelefone() {
        return $this->telefone;
    }
    public function setTelefone($telefone) {
        $this->telefone = $telefone;
    }

    public function getDataNascimento() {
        return $this->data_nascimento;
    }
    public function setDataNascimento($data_nascimento) {
        $this->data_nascimento = $data_nascimento;
    }

    public function getEmail() {
        return $this->email;
    }
    public function setEmail($email) {
        $this->email = $email;
    }

    public function getCpf() {
        return $this->cpf;
    }
    public function setCpf($cpf) {
        $this->cpf = $cpf;
    }
}
