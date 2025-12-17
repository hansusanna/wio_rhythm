<?php
declare(strict_types=1);

require __DIR__ . '/db.php';

$placement = $_GET['placement'] ?? '';
$now = date('Y-m-d H:i:s');

$sql = "
SELECT
  id, title, subtitle, image, badge_image AS badgeImage,
  cta_label AS ctaLabel, href, variant, placement,
  is_active AS isActive, sort_order AS sortOrder
FROM banners
WHERE is_active = 1
  AND (start_at IS NULL OR start_at <= :now)
  AND (end_at IS NULL OR end_at >= :now)
";

$params = [':now' => $now];

if ($placement !== '') {
  $sql .= " AND placement = :placement";
  $params[':placement'] = $placement;
}

$sql .= " ORDER BY sort_order ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode([
  'ok' => true,
  'items' => $stmt->fetchAll(),
], JSON_UNESCAPED_UNICODE);
