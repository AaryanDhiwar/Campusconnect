<?php

session_start();

if (!isset($_SESSION['user_id']) ||
    $_SESSION['role'] !== 'student') {

    header("Location: studentregistration.html");

    exit;
}

?>

<!DOCTYPE html>

<html>

<head>

    <title>Student Dashboard</title>

</head>

<body>

    <h1>
        Welcome, <?php echo htmlspecialchars($_SESSION['fullname']); ?>
    </h1>

    <p>
        Email:
        <?php echo htmlspecialchars($_SESSION['email']); ?>
    </p>

    <p>
        Role:
        Student
    </p>

    <a href="logout.php">
        Logout
    </a>

</body>

</html>