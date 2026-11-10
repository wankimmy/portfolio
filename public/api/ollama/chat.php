<?php
/**
 * Shared-hosting proxy for Ollama Cloud chat.
 * Browser calls /api/ollama/chat; Apache rewrites to this script.
 * Set OLLAMA_API_KEY in a .env file next to index.html (site root).
 */

declare(strict_types=1);

const MAX_BODY_BYTES = 65536;

function loadEnvFile(string $path): void
{
    if (!is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        $name = trim($parts[0]);
        $value = trim($parts[1], " \t\"'");
        if ($name !== '') {
            putenv($name . '=' . $value);
            $_ENV[$name] = $value;
        }
    }
}

$siteRoot = dirname(__DIR__, 2);
loadEnvFile($siteRoot . '/.env');

$apiKey = getenv('OLLAMA_API_KEY') ?: ($_ENV['OLLAMA_API_KEY'] ?? '');
if ($apiKey === '') {
    http_response_code(503);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Chat service not configured. Set OLLAMA_API_KEY in .env on the server.']);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = file_get_contents('php://input');
if ($body === false || strlen($body) > MAX_BODY_BYTES) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Invalid request body']);
    exit;
}

if (!function_exists('curl_init')) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'cURL extension is required on the server']);
    exit;
}

header('Content-Type: application/x-ndjson; charset=utf-8');
header('Cache-Control: no-cache, no-store');
header('X-Accel-Buffering: no');

if (function_exists('apache_setenv')) {
    @apache_setenv('no-gzip', '1');
}

@ini_set('zlib.output_compression', '0');
@ini_set('output_buffering', 'off');
@ini_set('implicit_flush', '1');
while (ob_get_level() > 0) {
    ob_end_flush();
}

$ch = curl_init('https://ollama.com/api/chat');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Accept: application/x-ndjson',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_HEADER => false,
    CURLOPT_TIMEOUT => 120,
    CURLOPT_CONNECTTIMEOUT => 15,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_WRITEFUNCTION => static function ($curl, string $data): int {
        echo $data;
        flush();
        return strlen($data);
    },
]);

$ok = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($ok === false) {
    if (!headers_sent()) {
        http_response_code(502);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(['error' => $curlError !== '' ? $curlError : 'Upstream chat request failed']);
    exit;
}

if ($status >= 400 && !headers_sent()) {
    http_response_code($status);
}
