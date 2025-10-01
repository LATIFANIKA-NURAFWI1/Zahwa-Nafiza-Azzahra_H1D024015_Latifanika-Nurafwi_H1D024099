<?php
echo "<h1>PHP Test</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Current Time: " . date('Y-m-d H:i:s') . "</p>";
echo "<p>Server: " . $_SERVER['SERVER_NAME'] . "</p>";

// Test MySQL extension
if (extension_loaded('pdo_mysql')) {
    echo "<p style='color:green'>✓ PDO MySQL: Available</p>";
} else {
    echo "<p style='color:red'>✗ PDO MySQL: Not Available</p>";
}

echo "<hr>";
echo "<a href='login-system/'>Go to Login System</a>";
?>
