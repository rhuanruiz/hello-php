<?php

namespace src\Services;

use src\Repositories\ClienteRepository;

class ClienteService {

    private $clienteRepository;

    public function __construct(
        ClienteRepository $clienteRepository
    ) {
        $this->clienteRepository = $clienteRepository;
    }

    public function buscarClientes() {
        return $this->clienteRepository->buscarClientes();
    }

    public function criarCliente($dados) {
        if (
            empty(trim($dados->nome)) ||
            empty(trim($dados->telefone)) ||
            empty(trim($dados->data_nascimento)) ||
            strlen(trim($dados->nome)) < 3
        ){
            return http_response_code(400);
        }

        $telefone = $this->clienteRepository->buscarPorTelefone($dados->telefone);
        if (!empty($telefone) && isset($telefone[0])) {
            return http_response_code(403);
        }
        
        return $this->clienteRepository->criarCliente($dados);   
    }

    public function excluirCliente($id) {
        return $this->clienteRepository->excluirCliente($id);
    }
}