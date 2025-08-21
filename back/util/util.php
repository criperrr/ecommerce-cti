<?php


    function conectar( $param = "pgsql:host=localhost;port=5432;dbname=produtos;user=postgres;password=postgres")
    {
        try {
            $conexao = new PDO($param);
            return $conexao;
        } catch (PDOException $e) {
            echo "Erro: " . $e->getMessage();
            exit;
        }
    }

    


?>