<?php

session_start();

include "connect.php";


if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request");
}


$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';


if ($email === '' || $password === '') {
    die("Please enter email and password.");
}


/* =========================
   STUDENT LOGIN
   ========================= */

if ($role === "student") {

    $sql = "SELECT id, fullname, email, password, enrollment_no,
                   branch, semester
            FROM students
            WHERE email = ?";

    $stmt = $con->prepare($sql);

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();


    if ($result->num_rows === 1) {

        $user = $result->fetch_assoc();


        if (password_verify($password, $user['password'])) {

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            $_SESSION['email'] = $user['email'];

            $_SESSION['role'] = 'student';

            $_SESSION['enrollment_no'] = $user['enrollment_no'];
            $_SESSION['branch'] = $user['branch'];
            $_SESSION['semester'] = $user['semester'];


            header(
                "Location: studentdashboard.php"
            );

            exit;

        } else {

            die("Incorrect password.");

        }

    } else {

        die("Student account not found.");

    }

}


/* =========================
   FACULTY LOGIN
   ========================= */

if ($role === "faculty") {

    $sql = "SELECT id, fullname, email, password,
                   faculty_id, department
            FROM faculty
            WHERE email = ?";

    $stmt = $con->prepare($sql);

    $stmt->bind_param("s", $email);

    $stmt->execute();

    $result = $stmt->get_result();


    if ($result->num_rows === 1) {

        $user = $result->fetch_assoc();


        if (password_verify($password, $user['password'])) {

            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            $_SESSION['email'] = $user['email'];

            $_SESSION['role'] = 'faculty';

            $_SESSION['faculty_id'] = $user['faculty_id'];
            $_SESSION['department'] = $user['department'];


            header(
                "Location: facultydashboard.php"
            );

            exit;

        } else {

            die("Incorrect password.");

        }

    } else {

        die("Faculty account not found.");

    }

}


die("Invalid role.");

?>