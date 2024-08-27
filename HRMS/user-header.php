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
    <?php if (!($hideHeader ?? false)) { ?>
        <header class="offical-header px-10 py-3">
        <div class="image-container">
            <img src="/assets/logo-white.png" alt="image-logo" class="w-full h-16" />
        </div>
        <div class="header-content w-full flex items-center justify-end gap-10">
            <h3 class="text-xl text-white font-semibold cursor-pointer <?= $headerKey === 'employee' ? 'active-text' : '' ?>" id="tab-header">
                <a href="/<?= PATH ?>details">Employees</a>
            </h3>
            <h3 class="text-xl text-white font-semibold cursor-pointer <?= $headerKey === 'training' ? 'active-text' : '' ?>" id="tab-header">
                <a href="/<?= PATH ?>url.php?id=localhost/trainingbanner.jpg">Training</a>
            </h3>
            <h3 class="text-xl text-white font-semibold cursor-pointer <?= $headerKey === 'profile' ? 'active-text' : '' ?>" id="tab-header">
                <a href="/<?= PATH ?>profile.php?url=localhost/myserver.php">Profile</a>
            </h3>
            <h3 class="text-xl text-white font-semibold cursor-pointer tooltip" id="tab-header" data-tooltip="logout">
                <a href="/<?= PATH ?>logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </a>
            </h3>
        </div>
    </header>
    <?php } ?>