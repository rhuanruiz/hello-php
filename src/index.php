<?php
require_once __DIR__ . '/Repositories/ClienteRepository.php';
require_once __DIR__ . '/Services/ClienteService.php';
require_once __DIR__ . '/Controllers/ClienteController.php';

use src\Repositories\ClienteRepository;
use src\Services\ClienteService;
use src\Controllers\ClienteController;

// Configuração de acesso ao banco usando PDO
$host = 'postgresql';
$port = '5432';
$dbname = 'visu_clientes';
$user = 'root';
$password = 'root';
$dsn = "pgsql:host=$host;port=$port;dbname=$dbname";

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Instanciamento dos objetos
$repository = new ClienteRepository($pdo);
$service = new ClienteService($repository);
$controller = new ClienteController($service);

// Configuração do CORS, cabeçalhos, urls de requisição e tipo dos métodos HTTP
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$req = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); 
    exit();
}

// Roteamento
switch(true) {
    case $url === '/clientes' && $req === 'GET':
        $resposta = $controller->buscarClientes();
        echo json_encode($resposta);
        break;
    case $url === '/clientes/criar' && $req = 'POST':
        if ($req === 'POST') {
            $json = file_get_contents('php://input');
            $dados = json_decode($json);
            $controller->criarCliente($dados);  
        }
        break;
    case preg_match('/^\/clientes\/excluir\/(\d+)$/', $url, $matches) === 1:
        if ($req === 'DELETE') {
            $id = $matches[1];
            $controller->excluirCliente($id);
        }
}


