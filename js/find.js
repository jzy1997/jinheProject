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

var pageNumber = 0;
var findlist = document.getElementsByClassName("findlist")[0];
$(function(){
    $.ajax({
        type: "POST",
        url: "data/find.json",
        data: "",
        success: function(dataObj){
            findlist.innerHTML = "";
            for(var i=0; i<dataObj[0].length;i++){
                findlist.innerHTML +=`
                    <li class="fg_indexlist_content_item">
                        <a href="${dataObj[0][i].link}" alt=""  target="_blank">  
                            <img src="${dataObj[0][i].img}" >      
                        </a>
                        <a class="info" href="${dataObj[0][i].link}" target="_blank">
                            <h3>${dataObj[0][i].tit}</h3>
                            <p>
                            ${dataObj[0][i].info}
                            </p>
                            <div class="findgoods_list_eyes">${dataObj[0][i].read}</div>
                        </a>
                    </li>
                `;
            }
        }
     });
});

for(var i = 0;i<$(".Recommended").length;i++){
    $(".Recommended")[i].index = i;
}
$(".Recommended").click(function(){
    var index = this.index;
    $(this).addClass("focus");
    $(this).siblings().removeClass("focus");
    $(".ft_head_item_line").css("display","block");
    $(".ft_head_item_line").eq(index).css("display","none");

    if(index != pageNumber){
        $.ajax({
            type: "POST",
            url: "data/find.json",
            data: "",
            success: function(dataObj){
                findlist.innerHTML = "";
                for(var i=0; i<dataObj[index].length;i++){
                    findlist.innerHTML +=`
                        <li class="fg_indexlist_content_item" target="_blank">
                            <a href="${dataObj[index][i].link}" alt="">  
                                <img src="${dataObj[index][i].img}" >      
                            </a>
                            <a class="info" href="${dataObj[index][i].link}" target="_blank">
                                <h3>${dataObj[index][i].tit}</h3>
                                <p>
                                ${dataObj[index][i].info}
                                </p>
                                <div class="findgoods_list_eyes">${dataObj[index][i].read}</div>
                            </a>
                        </li>
                    `;
                }
            }
        })
        pageNumber = index;
    }
    ;
});
