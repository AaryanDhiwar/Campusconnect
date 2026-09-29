<?php

include "connect.php";

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = $_POST['password'];
$faculty_id = $_POST['faculty_id'];
$department = $_POST['department'];

$hashed_password = password_hash(
    $password,
    PASSWORD_DEFAULT
);

$sql = "INSERT INTO faculty
        (fullname, email, password, faculty_id, department)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $con->prepare($sql);

$stmt->bind_param(
    "sssss",
    $fullname,
    $email,
    $hashed_password,
    $faculty_id,
    $department
);

if ($stmt->execute()) {

    echo "
        <script>
            alert('Faculty registration successful!');
            window.location.href='login.html';
        </script>
    ";

} else {

    echo "Error: " . $stmt->error;

}

$stmt->close();
$con->close();

?>