<?php
class Login {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function loginUser($email, $password) {
        if (empty($email) || empty($password)) {
            return "Please fill in all fields";
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format";
        }

        $query = "SELECT id, email, password, full_name FROM users WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        try {
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_name'] = $user['full_name'] ?: $user['email'];
                $_SESSION['logged_in'] = true;
                return "success";
            }
            return "Invalid email or password";
        } catch (PDOException $e) {
            return "Database error: " . $e->getMessage();
        }
    }
}
?>
