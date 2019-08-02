var inps = document.getElementsByName("txtPhoneWord");
var prompt = document.getElementsByClassName("prompt");
var agree = document.getElementById("agree");
var submit = document.getElementById("submit");
var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;
var flag5 = false;
for(let i = 0;i<inps.length;i++){
    inps[i].onfocus = function(){
        this.parentNode.style.cssText += `
        box-shadow: 0 0 3px #c09e79;
        transition: all .5s;
    `;
    switch (this.id) {
        case "txtPhoneWord":
            prompt[i].getElementsByClassName("info")[0].style.color = "#bd864d";
            prompt[i].getElementsByClassName("info")[0].innerHTML = "请输入手机号 ";
            break;
        case "txtPassWord":
            prompt[i].getElementsByClassName("info")[0].style.color = "#bd864d";
            prompt[i].getElementsByClassName("info")[0].innerHTML = "密码不能为空 ";
            break;
        case "txtSecPassWord":
            prompt[i].getElementsByClassName("info")[0].style.color = "#bd864d";
            prompt[i].getElementsByClassName("info")[0].innerHTML = "密码不能为空 ";
            break;  
        case "verificationCode":
            prompt[i].getElementsByClassName("info")[0].style.color = "#bd864d";
            prompt[i].getElementsByClassName("info")[0].innerHTML = "请输入图形验证码 ";
            break;  
        case "mobilePhoneVerificationCode":
            prompt[i].getElementsByClassName("info")[0].style.color = "#bd864d";
            prompt[i].getElementsByClassName("info")[0].innerHTML = "请输入手机验证码 ";
            break;  
        default:
            break;
    }
    prompt[i].style.display = "block";

    }
    inps[i].onblur = function(){
        this.parentNode.style.cssText += `
        box-shadow: 0 0 3px #fff;
    `;
        switch (this.id) {
            case "txtPhoneWord":
                if(this.value == ""){
                    flag1 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "手机号不可为空";
                    return;
                }
                if(!(/^1[3456789]\d{9}$/.test(this.value))){
                    flag1 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "手机号码格式不正确";
                    return;
                }
                // 通过
                if((/^1[3456789]\d{9}$/.test(this.value))){
                    // flag1 = true;
                    // prompt[i].getElementsByClassName("info")[0].style.color = "green";
                    // prompt[i].getElementsByClassName("info")[0].innerHTML = "手机号符合条件";
                    $.ajax({
                        type: "POST",
                        url: "data/isPhoneOk.php",
                        data: {
                            phoneNumber:document.getElementById("txtPhoneWord").value
                        },
                        success: function(msg){
                            if(msg == 1){
                                flag1 = true;
                                prompt[i].getElementsByClassName("info")[0].style.color = "green";
                                prompt[i].getElementsByClassName("info")[0].innerHTML = "手机号符合条件";
                            }else{
                                flag1 = false;
                                prompt[i].getElementsByClassName("info")[0].style.color = "red";
                                prompt[i].getElementsByClassName("info")[0].innerHTML = "手机号已注册过";
                            }
                        },
                        error:function(){
                            console.log("错误");
                        }
                    });
                    return;
                }
                break;
            case "txtPassWord":
                if(/^\w{6,20}$/.test(this.value)){
                    flag2 = true;
                    prompt[i].getElementsByClassName("info")[0].style.color = "green";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码符合条件";
                    return;
                }else if(this.value == ""){
                    flag2 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码不能为空";
                    return;
                }else{
                    flag2 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码格式不正确";
                    return;
                }
                break;
            case "txtSecPassWord":
                if(/^\w{6,20}$/.test(this.value) && this.value == document.getElementById("txtPassWord").value){
                    flag3 = true;
                    prompt[i].getElementsByClassName("info")[0].style.color = "green";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码匹配";
                    return;
                }else if(this.value == ""){
                    flag3 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码不能为空";
                    return;
                }else{
                    flag3 = false;
                    prompt[i].getElementsByClassName("info")[0].style.color = "red";
                    prompt[i].getElementsByClassName("info")[0].innerHTML = "密码不匹配";
                    return;
                }
                break;  
            case "verificationCode":
                if(this.value != ""){
                    prompt[i].style.display = "none";
                }
                break;  
            case "mobilePhoneVerificationCode":
                if(this.value != ""){
                    prompt[i].style.display = "none";
                }
                break;  
            default:
                break;
        }
    }
}
submit.onclick = function(){
    if(agree.checked && flag1 && flag2 && flag3){
        alert("允许注册");
        let phoneNumber = document.getElementById("txtPhoneWord").value;
        let passWord = document.getElementById("txtPassWord").value;
        console.log(phoneNumber,passWord);
        $.ajax({
            type: "POST",
            url: "data/registration.php",
            data: {
                phoneNumber:phoneNumber,
                passWord:passWord
            },
            success: function(msg){
                if(msg == 1){
                    alert("注册成功");
                    window.location.href="login.html"; 
                }
            },
            error:function(){
                console.log("错误");
            }
        });
    }else{
        alert("按要求注册瓜皮");
    }
}