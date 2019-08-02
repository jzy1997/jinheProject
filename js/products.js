if(getCookie("username")){
    console.log(getCookie("username"));
    var login = document.getElementsByClassName("login");
    login[0].style.display = "none";
    login[1].innerHTML = `欢迎 ${getCookie("username")}！`;
    login[2].style.fontSize = "12px";
    login[2].innerHTML = `hi ${getCookie("username")}！`;
    login[2].href = "javascript:;";
    if($(".checkCar")){
        $(".checkCar").css("display","none");
    }
    
}
// 菜单列表
// 菜单列表
var navTit = document.getElementsByClassName("navTit")[0];
var navPanel = document.getElementsByClassName("navPanel")[0];
var manuUl = document.getElementsByClassName("navPanel")[0]
var manuList1 = manuUl.getElementsByTagName("li")[0];
manuList1.style.cssText += `
    box-sizing:border-box;
    border-left:1px solid rgb(192, 158, 121);
`;
$.ajax({
    type: "POST",
        url: "data/navPanel.json",
        data: "",
        success: function(dataObj){
            var manuulHtml = '';
            for(var i = 0;i<dataObj.length;i++){
                var strHtml =  "";
                for(var key1 in dataObj[i].info){
                    strHtml += `
                        <a href="${dataObj[i].info[key1]}">${key1}</a>
                    `;
                }
                var liHtml = `
                <li index=${i}>
                    <a href="#">${dataObj[i].id}</a>
                    <div class="navPanel-link">
                        ${strHtml}
                    </div>
                </li>`;
                manuulHtml += liHtml;
            }
            manuUl.innerHTML = manuulHtml;
            $(".navPanel").delegate("li","mouseenter",function(){
                var manuBlock = createLis(dataObj,$(this).attr("index"));
                this.appendChild(manuBlock);
            });
    }
});

function createLis(dataObj,index){
    var manuBlock = document.createElement("div");
    manuBlock.className = "manuBlock";
    var manuBlockLeft = document.createElement("div");
    manuBlockLeft.className = "manuBlockLeft";
    for(var key in dataObj[index].inner[0]){
        var manuBlockLeftDl = document.createElement("dl");
        var strHtml = `
                <dt><a href="#" target="_blank">${key}</a></dt>
                <dd>
            `;
        for(var key1 in dataObj[index].inner[0][key]){
            strHtml += `
                <em><a href="${dataObj[index].inner[0][key][key1]}" target="_blank">${key1}</a></em>
            `;
        }
        strHtml += `</dd>`;
        manuBlockLeftDl.innerHTML = strHtml;
        manuBlockLeft.appendChild(manuBlockLeftDl);
    }
    var manuBlockRight = document.createElement("div");
    manuBlockRight.className = "manuBlockRight";

    for(var i = 0;i<dataObj[index].img.length;i++){
        var manuBlockRightImgs = document.createElement("a");
        manuBlockRightImgs.className = "manuBlockRightImgs";
        manuBlockRightImgs.style.cssText  += `background-image:url(${dataObj[index].img[i]});`;
        manuBlockRight.appendChild(manuBlockRightImgs);
    }

    manuBlock.appendChild(manuBlockLeft);
    manuBlock.appendChild(manuBlockRight);

    return manuBlock;
}

navTit.onmouseenter = function(){
    navPanel.style.cssText += `
        position:absolute;
        top:38px;
        left:0px;
        z-index:1000;
        display:block;
    `;
}
navPanel.onmouseleave = function(){
    navPanel.style.cssText += `
        display:block;
    `;
    $(".manuBlock").remove();
}
navPanel.onmouseleave = function(){
    console.log(1);
    this.style.display = "none";
}



// 回到顶部
var timer = null;
var flag = true;
var bt = document.getElementsByClassName("backtop")[0];
var sideNav = document.getElementsByClassName("side-nav")[0];
var sideNav02 = document.getElementsByClassName("side-nav02")[0];
// var sideNav02Lis = sideNav02.getElementsByTagName("li");
var fixTop = document.getElementsByClassName("fix-top")[0];
var navTitTop = document.getElementById("navTit");
var backTop = document.getElementById("backTop");
var searchDropDown = document.getElementById("searchDropDown");
var switchBtn = document.getElementById("switch-btn");
var navPanel = document.getElementsByClassName("navPanel")[0];
var fixTopInner = document.getElementsByClassName("fix-top-inner")[0];
sideNav.style.display = "none";
window.onscroll = function(){
    if(fixTopTimer){
        clearInterval(fixTopTimer);
    }
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrolltop >= 800){
        bt.style.display = "block";
        sideNav.style.display = "block";
        navPanel.style.display = "block";
        // backTop.parentElement.style.display = "block";
        var fixTopTimer = setInterval(function(){
            var top = fixTop.offsetTop;
            top++;
            fixTop.style.top = top + "px";
            if(top >= 0){
                fixTop.style.top = "0px";
                clearInterval(fixTopTimer);
            }
        },1000/60);
    }else{
        bt.style.display = "none";
        sideNav.style.display = "none";
        navPanel.style.display = "none";
        // backTop.parentElement.style.display = "none";
        var fixTopTimer = setInterval(function(){
            var top = fixTop.offsetTop;
            top--;
            fixTop.style.top = top + "px";
            if(top <= -60){
                fixTop.style.top = "-60px";
                clearInterval(fixTopTimer);
            }
        },1000/60);
    }
    if(!flag){
        clearInterval(timer);
    }
    flag = false;
}

bt.onclick = function(){
    if(timer){
        clearInterval(timer);
    }
    timer = setInterval(function(){
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        var speed = scrolltop / 5;
        // scrolltop -= 10;
        document.documentElement.scrollTop = document.body.scrollTop = scrolltop - speed;
        if(scrolltop == 0){
            clearInterval(timer);
        }
        flag = true;
    },1000/60);
}
switchBtn.onclick = function(){
    searchDropDown.style.display = searchDropDown.style.display == "block" ? "none" : "block";
    this.style.borderBottom = "0";
    searchDropDown.style.borderTop = searchDropDown.style.display == "block" ? "0" : "2px solid #c09e79";
}
$(function(){
    var products = $(".products")[0];
    $.ajax({
        type: "POST",
        url: "data/products.json",
        data: "",
        success: function(dataObj){
            products.innerHTML = "";
            for(var i=0; i<dataObj[0].length;i++){
                products.innerHTML +=`
                    <div class="goods">
                    <a href="${dataObj[0][i].link}" class="linkImg">
                        <img src="${dataObj[0][i].img}" alt="">
                    </a>
                    <a href="#" class="item-detail">
                        ${dataObj[0][i].info}
                    </a>
                    <div class="item-a">
                        <div class="info">
                            <a href="${dataObj[0][i].link}">今合价</a>
                            <b>￥</b>
                            <span class="pirce">${dataObj[0][i].read}</span>
                        </div>
                        <div class="sales">
                            销量
                            <span>${dataObj[0][i].read}</span>
                        </div>
                    </div>
                    <div class="hide-info">
                        <p>
                            <a href="#">益智玩具</a>
                            <h5>
                                网点编号
                                <span>${dataObj[0][i].read}</span>
                            </h5>
                        </p>
                        <a href="${dataObj[0][i].link}" class="buy">
                            立即购买
                        </a>
                    </div>
                    <div class="collection">
                        <span class="iconfont icon-weishoucang-"></span>
                        关注
                    </div>
                </div>
                `;
            }
        }
     });
});
console.log(1);
