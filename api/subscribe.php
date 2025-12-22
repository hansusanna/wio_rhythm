<?php
declare(strict_types=1);
require __DIR__ . '/db.php';

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// POST만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["success" => false, "message" => "Method not allowed"]);
  exit;
}

// JSON body 파싱
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Invalid JSON"]);
  exit;
}

$name  = trim((string)($data['name']  ?? ''));
$email = trim((string)($data['email'] ?? ''));

if ($name === '' || $email === '') {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "name/email이 필요합니다."]);
  exit;
}

try {
  $sql = "INSERT INTO subscriptions (name, email) VALUES (:name, :email)";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ':name' => $name,
    ':email' => $email,
  ]);

  echo json_encode(["success" => true, "message" => "구독 신청 완료"]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "서버 에러"]);
}
