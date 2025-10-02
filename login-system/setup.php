<?php
echo "<h2>Database Setup</h2>";

try {
    // Connect to MySQL server (without database)
    $pdo = new PDO("mysql:host=localhost;charset=utf8mb4", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS user_auth");
    echo "<p style='color:green'>✓ Database 'user_auth' created</p>";
    
    // Use the database
    $pdo->exec("USE user_auth");
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "<p style='color:green'>✓ Table 'users' created</p>";
    
    // Create test user
    $email = 'admin@test.com';
    $password = password_hash('123456', PASSWORD_DEFAULT);
    $name = 'Admin User';
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO users (email, password, full_name) VALUES (?, ?, ?)");
    $stmt->execute([$email, $password, $name]);
    
    echo "<p style='color:green'>✓ Test user created</p>";
    echo "<p><strong>Login credentials:</strong></p>";
    echo "<p>Email: admin@test.com</p>";
    echo "<p>Password: 123456</p>";
    
    echo "<hr>";
    echo "<a href='index.php'>Go to Login Page</a>";
    
} catch (PDOException $e) {
    echo "<p style='color:red'>Error: " . $e->getMessage() . "</p>";
}
?>
