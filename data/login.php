<?php
	header("Content-type:text/html;charset=utf-8");
    $conn = mysql_connect("localhost","root","root");
	mysql_select_db("jinhe");
    $txtPassWord = $_POST["txtPassWord"];
    $txtUserName = $_POST["txtUserName"];
    $result = mysql_query("select password from user where username = '$txtUserName'",$conn);
    // $rows = mysql_num_rows($result);
    // mysql_query("INSERT INTO user (username,password) VALUES ('$phoneNumber','$passWord')",$conn);
    $row = mysql_fetch_array($result);
    $returnPassword =  $row['password'];
    echo $returnPassword == $txtPassWord;
?>
