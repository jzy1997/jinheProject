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
        top:40px;
        left:-5px;
        z-index:1000;
        display:block;
    `;
}
navPanel.onmouseleave = function(){
    navPanel.style.cssText += `
        position:absolute;
        top:0px;
        left:0px;
        display:none;
    `;
}

var timer = null;
var flag = true;
var bt = document.getElementsByClassName("backtop")[0];
var sideNav = document.getElementsByClassName("side-nav")[0];
var sideNav02 = document.getElementsByClassName("side-nav02")[0];
var fixTop = document.getElementsByClassName("fix-top")[0];
var backTop = document.getElementById("backTop");
sideNav.style.display = "none";
window.onscroll = function(){
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrolltop >= 100){
        bt.style.display = "block";
        sideNav.style.display = "block";
    }else{
        bt.style.display = "none";
        sideNav.style.display = "none";
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



class Mf{
    constructor(){
        this.small = document.getElementById("small");
        this.big = document.getElementById("big");
        this.mask = document.getElementById("mask");
    }
    onmouseover(){
        let that = this;
        that.small.onmouseover = function(){
            that.big.style.display = "block";
            that.mask.style.display = "block";
        }
    }
    onmouseout(){
        let that = this;
        that.small.onmouseout = function(){
            that.big.style.display = "none";
            that.mask.style.display = "none";
        }
    }
    onmousemove(){
        let that = this;
        that.small.onmousemove = function(evt){
            let e = evt || event;
            let left = e.pageX - that.small.offsetLeft - that.mask.offsetWidth/2 - 75;
            let top = e.pageY - that.small.offsetTop - that.mask.offsetHeight/2 - 250;

            if(left <= 0){
                left = 0;
            }
            if(left > that.small.offsetWidth-that.mask.offsetWidth){
                left = that.small.offsetWidth - that.mask.offsetWidth;
            }
            if(top<0){
                top = 0;
                }
            if(top>that.small.offsetHeight-that.mask.offsetHeight){
                top = that.small.offsetHeight-that.mask.offsetHeight;
                }

            
            that.mask.style.left = left + "px";
            that.mask.style.top = top + "px";
            let x =  that.big.offsetWidth*left/that.mask.offsetWidth;
            let y =  that.big.offsetHeight*top/that.mask.offsetHeight;
            that.big.style.backgroundPositionX = -x + "px";
            that.big.style.backgroundPositionY = -y + "px";
        }
    }
}
var mf = new Mf();
mf.onmouseover();
mf.onmousemove();
mf.onmouseout();


var toLeft = document.getElementsByClassName("toLeft")[0];
var toRight = document.getElementsByClassName("toRight")[0];
var specUl = document.getElementsByClassName("lh")[0];
var timer = null;
specUl.onmousemove = function(e){
    var e = e || event;
    var target = e.target  || e.srcElement;
    if(target.tagName == "LI"){
        var xiaotu = target.firstElementChild.src.slice(0,target.firstElementChild.src.indexOf(".jpg"))+ ".jpg";
        mf.small.style.backgroundImage = "url(" + xiaotu + ")";
        var datu = target.firstElementChild.src.slice(0,target.firstElementChild.src.indexOf(".jpg"))+ ".jpg"
        mf.big.style.backgroundImage = "url(" + datu + ")";
    }
}
toLeft.onclick = function(){
    clearInterval(timer);
    if(specUl.offsetLeft >= 0){
        clearInterval(timer);
    }else{
        timer = setInterval(function(){
            l = 1;
            specUl.style.left = specUl.offsetLeft + l + "px";
            if(specUl.offsetLeft >= 0){
                specUl.style.left = 0 + "px";
                clearInterval(timer);
            }
            specUl.style.left = specUl.offsetLeft+ l + "px";
        },1000/60);
    } 
}
toRight.onclick = function(){
    clearInterval(timer);
    if(specUl.offsetLeft == -(specUl.offsetWidth - specUl.parentNode.offsetWidth)){
        clearInterval(timer);

    }else{
        timer = setInterval(function(){
            l = 1;
            specUl.style.left = specUl.offsetLeft - l + "px";
            if(-specUl.offsetLeft >= (specUl.offsetWidth - specUl.parentNode.offsetWidth)){
                specUl.style.left = -specUl.offsetWidth + specUl.parentNode.offsetWidth + "px";
                clearInterval(timer);
            }
            specUl.style.left = specUl.offsetLeft- l + "px";
        },1000/60);
    }
}

// inner
var itemInner = document.querySelectorAll(".item >.inner");
var lines = document.getElementsByClassName("line");
for(let i = 0;i<itemInner.length;i++){
    itemInner[i].onmouseover = function(){
        lines[i].style.display = "block";
    }
    itemInner[i].onmouseout = function(){
        lines[i].style.display = "none";
    }
}

var btnReduce = document.getElementsByClassName("btn-reduce")[0];
var btnAdd = document.getElementsByClassName("btn-add")[0];
var buyNum = document.getElementsByClassName("buy-num")[0];
btnReduce.onclick = function(){
    buyNum.value = parseInt(buyNum.value) - 1;
    if(buyNum.value <= 1){
        // if(this.className.indexOf(" disabled") == -1)
        this.className += " disabled";
        buyNum.value = 1;
    }
}

btnAdd.onclick = function(){
    btnReduce.className = btnReduce.className.replace(/ disabled/ig,"");
    buyNum.value = parseInt(buyNum.value) + 1;
}

var extra = document.getElementsByClassName("extra")[0];
var extraUl = extra.getElementsByTagName("ul")[0];

var btnup = document.getElementsByClassName("btnup")[0];
var currentIndex = 1;
var liHeight = extra.offsetHeight;
var len = 3;
btnup.onclick = function(){
    currentIndex--;
    slideTo(currentIndex);
    
}
var btndown = document.getElementsByClassName("btndown")[0];
btndown.onclick = function(){
    currentIndex++;
    slideTo(currentIndex);
}

function slideTo(index){
    if(index == len + 1){
        extraUl.style.top = -liHeight + "px";
        currentIndex = index = 1;
    }else if(index == 0){
        extraUl.style.top = -len*liHeight + "px";
        currentIndex = index = len;
    }
    var top = -(index-1) * liHeight;
    animation(extraUl,{top:top},);
}

function getStyle(el,property){
    if(getComputedStyle){
        return getComputedStyle(el)[property];
    }else{
        return el.currentStyle[property];
    }
}

function animation(el,propertis){
    clearInterval(el.timer);
    el.timer = setInterval(function(){

        for (const property in propertis) {
            if (propertis.hasOwnProperty(property)) {
                let current = null;
                let target = propertis[property];

                if(property === "opacity"){
                    current = parseFloat(getStyle(el,property)) * 100;
                }else{
                    current = parseInt(getStyle(el,property));
                }

                let speed = (target - current) / 10;
                speed = speed>0 ? Math.ceil(speed):Math.floor(speed);

                if(property === "opacity"){
                    el.style[property] = (current + speed)/100;
                }else{
                    el.style[property] = current + speed + "px";
                }
            }
        }
    },1000/60);
}
var detailInnersBtn = document.getElementsByClassName("detailTit")[0].getElementsByTagName("span");
var detailInners = document.getElementsByClassName("detailInner");
document.getElementsByClassName("detailInnerBox")[0].style.height = detailInners[0].offsetHeight + "px";
for(let i = 0;i < detailInnersBtn.length;i++){
    detailInnersBtn[i].onclick = function(){
        for(var j = 0;j<detailInnersBtn.length;j++){
            detailInnersBtn[j].className = "notActive";
            detailInners[j].style.display = "none";
        }
        this.className = "active";
        detailInners[i].style.display="block";
        document.getElementsByClassName("detailInnerBox")[0].style.height = detailInners[i].offsetHeight + "px";
    }
}

var expand = document.getElementsByTagName("dt");
for(var i = 0;i<expand.length;i++){
    expand[i].onclick = function(){
        if(this.parentNode.className){
            this.parentNode.className = "";
        }else{
            this.parentNode.className = "open";
        }
    }
}
var goodsLi = document.getElementById("goodsLi");
for(var i = 0;i<15;i++){
    var cloneGoodsLi = goodsLi.cloneNode(true);
    goodsLi.parentNode.appendChild(cloneGoodsLi);
}
var otherGoodsUl = $("#otherGoods")[0];
$.ajax({
    type: "POST",
    url: "data/find.json",
    data: "",
    success: function(dataObj){
        otherGoodsUl.innerHTML = "";
        for(var i=0; i<dataObj[0].length;i++){
            otherGoodsUl.innerHTML +=`
                <li id="goodsLi">
                <div class="pro-wrap">
                    <div class="p-img">
                        <a href="#" >
                            <img src="${dataObj[0][i].img}" height="220" width="220">
                        </a>                        
                    </div>                        
                    <div class="p-name">                           
                        <a href="#">
                            bebe8耐克Air Jordan 1 MID AJ1 OG乔1 鸳鸯 黑红芝加哥休闲篮球鞋 皇家白蓝男555088-401 45
                        </a>                        
                    </div>                        
                    <div class="p-price"> 
                        <a href="#none">
                            <span class="iconfont icon-wode-"></span>
                            <em class="text">关注</em>
                        </a>                            
                        <strong class="price">
                            <span class="J-p-45167005676">￥${dataObj[0][i].read}0.00</span>
                        </strong>                        
                    </div>                        
                    <div class="p-comment">                            
                        <div class="inner" title=""></div>
                    </div>                    
                </div>
            </li>
            `;
        }
    }
 });

 var sidebanner = document.getElementsByClassName("sidebanner");
 $.ajax({
    type: "POST",
    url: "data/find.json",
    data: "",
    success: function(dataObj){
        for(var i = 0;i<sidebanner.length;i++){
            sidebanner[i].innerHTML = "";
            for(var j = 0;j<3;j++){
                sidebanner[i].innerHTML +=`
                <div class="item">
                    <a href="${dataObj[i][j].link}">
                        <img src="${dataObj[i][j].img}" alt="" style="width:150px;height:150px;">
                        <div>${dataObj[i][j].info}</div>
                        <p class="pirce">￥${dataObj[i][j].read}.00</p>
                    </a>
                </div>
                `;
            }
        }
    }
 });
 var recommendItem = $(".recommendItem");
 $.ajax({
    type: "POST",
    url: "data/find.json",
    data: "",
    success: function(dataObj){
        recommendItem.html("");
        for(var j = 0;j<6;j++){
            recommendItem.html(recommendItem.html()+`
            <li>
                <img src="${dataObj[2][j].img}" alt="" style="width:150px;height:150px;">
                <div>${dataObj[2][j].info}</div>
                <p class="pirce"> <a href="">￥${dataObj[2][j].read}.00</a></p>
            </li>
            `);
            
        }
    }
 });
 var shopRecommendationBox = $(".shopRecommendationBox");
 $.ajax({
    type: "POST",
    url: "data/find.json",
    data: "",
    success: function(dataObj){
        shopRecommendationBox.html("");
        for(var j = 0;j<6;j++){
            shopRecommendationBox.html(shopRecommendationBox.html()+`
            <div class="shopRecommendationItem">
                <a href="${dataObj[1][j].link}">
                <div class="imgbox">
                    <img src="${dataObj[1][j].img}" alt="" style="width:100%;height:100%;">
                    <p>${dataObj[1][j].info}</p>
                </div>
                </a>
                <h2>
                    <em>热销<i>${dataObj[1][j].read}</i>件</em>
                    <strong>￥${dataObj[1][j].read}.00</strong>
                    <p>${j+1}</p>
                </h2>
            </div>
            `);
            
        }
    }
 });
 var otherGoods = $("#otherGoods");
 console.log(otherGoods);