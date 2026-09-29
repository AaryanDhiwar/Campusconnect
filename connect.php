<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "campusconnect";
    $con=mysqli_connect($servername,$username,$password,$database);

    if(!$con){
        die("error detected".mysqli_connect_error());
    }
    
?>