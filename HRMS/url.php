<?php
require_once "constant.php";

function ensureProtocol($url) {
    // Check if the URL starts with "http://" or "https://"
    if (strpos($url, 'http://') !== 0 && strpos($url, 'https://') !== 0) {
        // If not, add "http://" as the default protocol
        $url = 'http://' . $url;
    }

    return $url;
}


$uri = rtrim($_SERVER['REQUEST_URI'], "/");
// Get the query string from the URL
$queryString = parse_url($uri, PHP_URL_QUERY);

// Parse the query string into an associative array
parse_str($queryString, $queryParams);

$imageUrl = ensureProtocol($queryParams["id"]);

// Read the image from the URL
$imageData = file_get_contents($imageUrl);

if ($imageData !== false) {
    
    // Get the file size in bytes
    $fileSize = strlen($imageData);

    // Convert bytes to kilobytes (KB) for a more human-readable size
    $imageSize = round($fileSize / 1024, 2);

    if ($imageSize > 100) {
        echo 'Error: Image size exceeds 100KB. Memory Outage: Flag THM_{$$rF_bL1nD}';
        return;
    } else {
        // Output the image if it's within the size limit
        header("Content-Type: image/jpg");
        echo $imageData;
    }
} else {
    echo "Error: Unable to load the image from the specified URL.";
}
?>