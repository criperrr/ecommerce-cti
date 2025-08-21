<?php
    include "util/util.php";

    $conn = conectar();
    $email = $_GET['email'];
    $pass = $_GET['password'];
    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        $query = "SELECT * FROM usuarios WHERE email = :email OR senha = :senha";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $pass);
        $stmt->execute();

        if($row = $stmt->fetch()){
            echo $row;
        }
    }


?>