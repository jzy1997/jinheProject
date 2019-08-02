var txtPassWord = document.getElementById("txtPassWord");
txtPassWord.onfocus = function(){
    this.parentNode.style.cssText += `
        box-shadow: 0 0 3px #e06c63;
        transition: all 1s;
    `;
    $("#info").css("display","none");

}
txtPassWord.onblur = function(){
    this.parentNode.style.boxShadow = `0 0 0px #fff`;
}
var txtUserName = document.getElementById("txtUserName");
txtUserName.onfocus = function(){
    this.parentNode.style.cssText += `
        box-shadow: 0 0 3px #e06c63;
        transition: all 1s;
    `;
    $("#info").css("display","none");
}
txtUserName.onblur = function(){
    this.parentNode.style.boxShadow = `0 0 0px #fff`;
}
if(getCookie("username")){
    txtUserName.value = getCookie("username");
}
$(".submit").click(()=>{
    var txtUserName = document.getElementById("txtUserName").value;
    var txtPassWord = document.getElementById("txtPassWord").value;
    
    if(txtPassWord == '' && txtUserName == ''){
        alert("请输入用户名和密码");
    }else if(txtUserName == ''){
        alert("请输入用户名");
    }else if(txtPassWord == ''){
        alert("请输入密码");
    }else{
        $.ajax({
            type:"POST",
            url:"data/login.php",
            data:{
                txtPassWord:txtPassWord,
                txtUserName:txtUserName
            },
            success: function(msg){
                if(msg == 1){
                    if(document.getElementById("chkReMember").checked){
                        console.log(txtUserName);
                        saveCookie("username",txtUserName,7);
                    }
                    window.location.href="index.html"; 
                }else{
                    console.log("账号密码错误");
                    $("#info").css("display","block");
                }
            },
            error:function(){
                console.log("错误");
            }
        })
    }
    


});
