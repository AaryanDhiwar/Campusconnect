<?php

include "connect.php";

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = $_POST['password'];
$enrollment_no = $_POST['enrollment_no'];
$branch = $_POST['branch'];
$semester = $_POST['semester'];


/*
    Never store normal passwords directly.
    password_hash() encrypts them safely.
*/

$hashed_password = password_hash(
    $password,
    PASSWORD_DEFAULT
);


$sql = "INSERT INTO students
        (fullname, email, password, enrollment_no, branch, semester)
        VALUES (?, ?, ?, ?, ?, ?)";


$stmt = $con->prepare($sql);

$stmt->bind_param(
    "ssssss",
    $fullname,
    $email,
    $hashed_password,
    $enrollment_no,
    $branch,
    $semester
);


if ($stmt->execute()) {

    echo "
        <script>
            alert('Registration successful!');
            window.location.href='login.html';
        </script>
    ";

} else {

    echo "Error: " . $stmt->error;

}


$stmt->close();
$con->close();

?>