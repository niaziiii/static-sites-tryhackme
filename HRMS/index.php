<?php
// Redirect to the /time route
require_once("constant.php");
require_once("config.php");

$request = $_SERVER['REQUEST_URI'];
/* $parts = parse_url($request);
echo json_encode($parts);
echo $request;
return; */
$viewDir = '/views/';

if($request == "" || $request == "/"){
    header("Location: copyright");
    return;
}

$_SESSION['loginError'] = false;
$authenticated = $_SESSION['authenticated'] ?? false;

if (!$authenticated) {
    
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    
    if ($requestMethod === "POST") {
        $_username = $_POST['username'] ?? "";
        $_password = $_POST['password'] ?? "";

        if ($_username === $username && $_password === $password) {
            // Authentication successful, redirect to /details page
            $_SESSION['authenticated'] = true;
            header('Location: logged-in');
            exit();
        }

        $_SESSION['loginError'] = true;
    }
    
    // Go to the login
    require __DIR__ . $viewDir . 'login.php';
    return;
}

switch ($request) {
    case '/logged-in':
        require __DIR__ . $viewDir . 'logged-in.php';
        break;

    case '/url.php':
        require __DIR__ . '/' . 'url.php';
        break;

    case '/employee.php':
        require __DIR__ . $viewDir . 'employee.php';
        break;

    case '/logout':
        require __DIR__ . '/' . 'logout.php';
        break;

    default:
        if ($authenticated) {
            require __DIR__ . $viewDir . 'details.php';
            return;
        }

        http_response_code(404);
        require __DIR__ . $viewDir . '404.php';
}
