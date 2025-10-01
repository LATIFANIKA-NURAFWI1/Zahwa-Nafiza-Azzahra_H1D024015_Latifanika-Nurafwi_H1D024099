<?php
require_once __DIR__ . '/includes/session.php';
require_once __DIR__ . '/config/database.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <h1 class="login-title">Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!</h1>
            <p class="login-subtitle">You are successfully logged in</p>
            
            <div class="user-info" style="margin:16px 0 24px;color:#4a5568;">
                <p><strong>Email:</strong> <?php echo htmlspecialchars($_SESSION['user_email']); ?></p>
                <p><strong>User ID:</strong> <?php echo (int)$_SESSION['user_id']; ?></p>
            </div>

            <a href="logout.php" class="login-btn" style="text-decoration: none; text-align: center; display: block;">Logout</a>
        </div>
    </div>
</body>
</html>
