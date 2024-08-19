<?php

namespace src\Controllers;

use src\Services\ClienteService;

class ClienteController {

    private $clienteService;

    public function __construct(
        ClienteService $clienteService
    ) {
        $this->clienteService = $clienteService;
    }

    public function buscarClientes() {
        return $this->clienteService->buscarClientes();
    }

    public function criarCliente($dados) {
        return $this->clienteService->criarCliente($dados);
    }

    public function excluirCliente($id) {
        return $this->clienteService->excluirCliente($id);
    }
}