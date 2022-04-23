<?php
include_once 'db.php';
if(isset($_POST['submit']))
{    
     $name = $_POST['imie'];
     $email = $_POST['email'];
     $komentarz = $_POST['komentarz'];
     $sql = "INSERT INTO users (imie,email,komentarz)
     VALUES ('$name','$email','$komentarz')";
     if (mysqli_query($conn, $sql)) {
        echo "New record has been added successfully !";
     } else {
        echo "Error: " . $sql . ":-" . mysqli_error($conn);
     }
     mysqli_close($conn);
}
?>