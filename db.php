<?php
    $servername='localhost';
    $username='Admin';
    $password='Admin123';
    $dbname = "Kontakty";
    $conn=mysqli_connect($servername,$username,$password,"$dbname");
      if(!$conn){
          die('Could not Connect MySql Server:' .mysql_error());
        }
?>