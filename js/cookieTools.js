
//保存cookie
//参数：
//键，值，有效期（单位：天）
//返回值：无

function saveCookie(key,value,daycount){
	let d = new Date();
	let num = d.getDate()+daycount;
	d.setDate(num);
	document.cookie = `${key}=${value};expires=${d.toGMTString()}`;
}


//获取cookie
//参数：
//键
//返回值：值

function getCookie(key) {
	var str = document.cookie;// username=jzm; userpass=123;
	//分割成数组
	let arr = str.split("; ");//["username=jzm","userpass=123"]
	//循环数组，查找键值对（以"username="开头的键值对）
	for(let i in arr){
		if(arr[i].startsWith(key+"=")){
			// arr[i] //username=jzm;
			let [,value]=arr[i].split("=");//[username,jzm]
			return value;
		}
	}
}












