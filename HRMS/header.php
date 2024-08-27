<?php
require_once(ROOTPATH . "/constant.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>TryHackMe | HRMS web app (SSRF)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://kit.fontawesome.com/4f572bc49d.js" crossorigin="anonymous"></script>
    <link rel="icon" type="image/png" href="https://assets.tryhackme.com/img/favicon.png" />
    <style>
        <?php require_once(ROOTPATH . "/style/style.css"); ?>
    </style>
</head>

<body class="main-container text-black body">
    <!-- Header -->
    <header class="offical-header px-10 py-3">
        <div class="image-container">
            <img src="/assets/logo-white.png" alt="image-logo" class="w-full h-16" />
        </div>
        <div class="header-content w-full text-center text-white">
            <h1 class="text-3xl font-bold">HRMS </h1>
            <p class="text-sm">All-in-one management tool!</p>
        </div>
    </header>