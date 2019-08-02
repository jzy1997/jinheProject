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


// 轮播图
(function(){
    var currentIndex;
    var lis;
    var liWidth;
    var len;
    var timer;
    var colorArr = ["#fff59c","#cdeffb","#edf3f1","#e1e1e1"];
    init();
    function init(){
        currentIndex = 1;
        lis = document.getElementsByClassName("items");
        len = lis.length;
        liWidth = lis[0].offsetWidth + 1;
        auto();
        var list = document.getElementsByClassName("slider")[0];
        document.getElementById("next").onclick = slideNext;
        document.getElementById("prev").onclick = slidePrev;
        var buts = document.getElementsByClassName("but");
        for(var i = 0;i<buts.length;i++){
            buts[i].index = i;
            buts[i].onclick = function(){
                currentIndex = this.index;
                slideTo(currentIndex+1);
            }
        }
        var carousel = document.getElementsByClassName("carousel-wrap")[0];
        carousel.onmouseover = stop;
        carousel.onmouseout = auto;
        for(var i = 0;i<lis.length;i++){
            lis[i].style.display = "none";
        }
        lis[0].style.display = "block";
        carousel.style.backgroundColor = colorArr[0];
    }
    function slideNext(){
        currentIndex++;
        slideTo(currentIndex);
        
    }
    function slidePrev(){
        currentIndex--;
        slideTo(currentIndex);
    }
    function slideTo(index){
        var buts = document.getElementsByClassName("but");
        var list = document.getElementsByClassName("slider")[0];
        var focusIndex;
        if(index == len+2){
            currentIndex = index = 2;
        }
        if(index == -1){
            currentIndex = index = len - 1;
        }

        if(index === 0){
            focusIndex = buts.length - 1;
        }else if(index === len + 1 ){
            focusIndex = 0;
        }else{
            focusIndex = index - 1;
        }
        document.querySelector(".focus").className = "but";
        buts[focusIndex].className = "but focus";
        lis = document.getElementsByClassName("items");
        var carousel = document.getElementsByClassName("carousel-wrap")[0];
        for(var i = 0;i<lis.length;i++){
            lis[i].style.display = "none";
        }
        lis[focusIndex].style.display = "block";
        carousel.style.backgroundColor = colorArr[focusIndex];
    }
    function auto(){
        clearInterval(timer);
        timer = setInterval(function(){
            slideNext();
        },2000);
    }
    function stop(){
        clearInterval(timer);
    }

})();

// 菜单列表

var navTit = document.getElementById("navTit");
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
        position:fixed;
        top:60px;
        left:75px;
        z-index:1000;
    `;
}
navPanel.onmouseleave = function(){
    navPanel.style.cssText += `
        position:absolute;
        top:0px;
        left:0px;
    `;
    $(".manuBlock").remove();
}

// 回到顶部
var timer = null;
var flag = true;
var bt = document.getElementsByClassName("backtop")[0];
var sideNav = document.getElementsByClassName("side-nav")[0];
var sideNav02 = document.getElementsByClassName("side-nav02")[0];
var sideNav02Lis = sideNav02.getElementsByTagName("li");
var fixTop = document.getElementsByClassName("fix-top")[0];
var backTop = document.getElementById("backTop");
var searchDropDown = document.getElementById("searchDropDown");
var switchBtn = document.getElementById("switch-btn");
var fixTopInner = document.getElementsByClassName("fix-top-inner")[0];
var navPanelClone =  navPanel.cloneNode(true);
backTop.onclick = function(){
    bt.onclick();
}
sideNav.style.display = "none";
backTop.parentElement.style.display = "none";
window.onscroll = function(){
    if(fixTopTimer){
        clearInterval(fixTopTimer);
    }
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrolltop >= 800){
        bt.style.display = "block";
        sideNav.style.display = "block";
        backTop.parentElement.style.display = "block";
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
        backTop.parentElement.style.display = "none";
        var fixTopTimer = setInterval(function(){
            var top = fixTop.offsetTop;
            top--;
            fixTop.style.top = top + "px";
            if(top <= -60){
                fixTop.style.top = "-60px";
                clearInterval(fixTopTimer);
            }
        },1000/60);
            navPanel.style.cssText += `
            position:absolute;
            top:0px;
            left:0px;
        `;
        navPanelClone.remove();
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

var swiperSlide = document.getElementsByClassName("swiper-slide");
$.ajax({
    type: "get",
    url: "data/indexSlide.json",
    data: "",
    success: function(dataObj){

        for(var i=0; i<dataObj.length;i++){
            swiperSlide[i].innerHTML = "";
            for(var j = 0;j<dataObj[i].length;j++){
                swiperSlide[i].innerHTML+=`
                <li>
                    <a href="${dataObj[i][j].link}">
                        <img src="${dataObj[i][j].img}" alt="">
                    </a>
                    <h3>
                        <span>本周</span>
                        <b>${dataObj[i][j].num}</b>
                    </h3>
                </li> 
                `;
            }
        }
    }
});
var jhcol = document.getElementsByClassName("jhCol");
$.ajax({
    type: "get",
    url: "data/jhcol.json",
    data: "",
    success: function(dataObj){
        for(var i=0; i<dataObj.length;i++){
            jhcol[i].innerHTML = "";
            for(var j = 0;j<dataObj[i].length;j++){
                jhcol[i].innerHTML+=`
                <li>
                    <a href="${dataObj[i][j].link}">
                        <h3>${dataObj[i][j].h}</h3>
                        <p>${dataObj[i][j].p}</p>
                        <div class="foodPic">
                            <img src="${dataObj[i][j].img}" alt="">
                        </div>
                    </a>
                </li>
                `;
            }
        }
    }
});