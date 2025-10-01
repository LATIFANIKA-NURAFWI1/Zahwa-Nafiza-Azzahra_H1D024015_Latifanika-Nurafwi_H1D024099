<?php
// Debug mode - hapus setelah berhasil
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "PHP is working!<br>";
echo "Current directory: " . __DIR__ . "<br>";

// Redirect ke folder modern-login
header('Location: modern-login/index.php');
exit();
?>
