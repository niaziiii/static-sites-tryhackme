<?php
// Unset all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Redirect to a page after logout 
header('Location: /');
exit();
