<?php
	header("Content-type:text/html;charset=utf-8");
    $conn = mysql_connect("localhost","root","root");
	mysql_select_db("jinhe");
    $phoneNumber = $_POST["phoneNumber"];
    $result = mysql_query("select * from user where username = '$phoneNumber'",$conn);
    $rows = mysql_num_rows($result);
	if($rows == 1){
		echo 0;
	}else{
		echo 1;
	}

?>
