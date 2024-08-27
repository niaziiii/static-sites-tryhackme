<?php
// Gather server-related information using phpinfo()
ob_start();
phpinfo(INFO_ALL);
$phpinfoOutput = ob_get_clean();

echo $phpinfoOutput;