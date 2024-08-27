<?php
$authenticated = $_SESSION['authenticated'] ?? false;
if (!$authenticated) {
    header('Location: /' . PATH . 'login');
}
$headerKey = "employee";
require_once(ROOTPATH . '/user-header.php');
?>

<iframe class="w-full h-[500px]" src="/employee.php"></iframe>

<div class="w-full">
    <?php require_once(ROOTPATH . '/footer.php'); ?>
</div>
</body>

</html>