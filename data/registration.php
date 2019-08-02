<?php
	header("Content-type:text/html;charset=utf-8");
    $conn = mysql_connect("localhost","root","root");
	mysql_select_db("jinhe");
    $phoneNumber = $_POST["phoneNumber"];
    $passWord = $_POST["passWord"];
    // $result = mysql_query("select * from user where username = '$phoneNumber'",$conn);
    // $rows = mysql_num_rows($result);
    mysql_query("INSERT INTO user (username,password) VALUES ('$phoneNumber','$passWord')",$conn);
	echo 1;
?>
