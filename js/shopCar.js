//判断登录
(function(){
    if(getCookie("username")){
        console.log(getCookie("username"));
        var login = document.getElementsByClassName("login");
        // login[0].style.display = "none";
        // login[1].innerHTML = `欢迎 ${getCookie("username")}！`;
        // login[2].style.fontSize = "12px";
        login[0].innerHTML = `hi ${getCookie("username")}！`;
        login[0].href = "javascript:;";
        if($(".checkCar")){
            $(".checkCar").css("display","none");
        }
    }
})();