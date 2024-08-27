<?php
session_start();
$dir = realpath(dirname(__FILE__) . '/.');
define('ROOTPATH', $dir);

$prefix = "";
define("PATH", $prefix);
