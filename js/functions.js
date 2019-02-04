var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function () {
    $loveHeart = $("#loveHeart");
    var a = $loveHeart.width() / 2;
    var b = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    $("#content").css("width", $loveHeart.width() + $("#code").width());
    $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));
    setInterval(function () {
        garden.render()
    }, Garden.options.growSpeed)
});
$(window).resize(function () {
    var b = $(window).width();
    var a = $(window).height();
    if (b != clientWidth && a != clientHeight) {
        location.replace(location)
    }
});

function getHeartPoint(c) {
    var b = c / Math.PI;
    var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
    var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
    return new Array(offsetX + a, offsetY + d -15)
    //return new Array( a,  d)
}

function startHeartAnimation() {
    var c = 300;
    var d = 10;
    var b = new Array();
    var moonid = 1;
    var a = setInterval(function () {
        var h = getHeartPoint(d);
        var canvas = document.getElementById("garden");
        var ctx = canvas.getContext("2d");

        //创建新的图片对象
        var img = new Image();
        //指定图片的URL
        img.src = "moons/images/"+moonid.toString()+'.png';
        img.style.width='20px'
        //浏览器加载图片完毕后再绘制图片
        img.onload = function(){

            //以Canvas画布上的坐标(10,10)为起始点，绘制图像
            ctx.drawImage(img, h[0], h[1], 38 ,38);
        };
        moonid +=1;
        // var e = true;
        // for (var f = 0; f < b.length; f++) {
        //     var g = b[f];
        //     var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
        //     if (j < Garden.options.bloomRadius.max * 1.3) {
        //         e = false;
        //         break
        //     }
        // }

        // if (e) {
        //     b.push(h);
        //     garden.createRandomBloom(h[0], h[1])
        // }
        if (d >= 30) {
            clearInterval(a);
            showMessages()
        } else {
            d += 1.0827;
            if(moonid==2)
                d+=0.4;
            else if(moonid==3)
                d-=0.2;
            else if (moonid==4)
                d-=0.2
            else if(moonid==18)
                d-=0.2;
            else if(moonid==17)
                d-=0.2;
            else if(moonid==9)
                d-=0.3;
            else if(moonid==10)
                d+=0.3;
            else if(moonid==11)
                d+=0.3;
            else if(moonid==12)
                d-=0.3;
        }
         if (moonid>18)
        {
            clearInterval(a);
            showMessages()
        }
    }, c)
}

function fadeIn(context,imageData,h0, h1, steps,mmillisecondsPerStep){
    var frame = 0;

    //将离屏的图像全部透明度降为0
    for(var i =3 ;i<imageData.data.length;i+=4){
        imageData.data[i] = 0 ;
    };

    interval = setInterval(function(){
        frame++;
        if(frame>steps){
            clearInterval(interval);
        }else{
            increaseTransperency(imageData,steps);
            context.putImageData(imageData,h0, h1);
        }
    },mmillisecondsPerStep);
}

//渐增透明度
function increaseTransperency(imageData,steps){
    var alpha;
    var currentAlpha;
    var alphaStep;
    var length = imageData.data.length;

    for(var i =3 ;i<length;i+=4){
        alpha = imageDataOffscreen.data[i];
        if(alpha>0){
            currentAlpha = imageData.data[i];
            alphaStep = Math.ceil(alpha/steps);

            if(currentAlpha +alphaStep<=alpha){
                imageData.data[i] +=alphaStep;
            }else{
                imageData.data[i] =alpha;
            }
        }
    }
}

(function (a) {
    a.fn.typewriter = function () {
        this.each(function () {
            var d = a(this), c = d.html(), b = 0;
            d.html("");
            var e = setInterval(function () {
                var f = c.substr(b, 1);
                if (f == "<") {
                    b = c.indexOf(">", b) + 1
                } else {
                    b++
                }
                d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
                if (b >= c.length) {
                    clearInterval(e)
                }
            }, 200)
        });
        return this
    }
})(jQuery);
    //淡入函数

function timeElapse(c) {
    var e = Date();
    var f = (Date.parse(e) - Date.parse(c)) / 1000;
    var g = Math.floor(f / (3600 * 24));
    f = f % (3600 * 24);
    var b = Math.floor(f / 3600);
    if (b < 10) {
        b = "0" + b
    }
    f = f % 3600;
    var d = Math.floor(f / 60);
    if (d < 10) {
        d = "0" + d
    }
    f = f % 60;
    if (f < 10) {
        f = "0" + f
    }
    var a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
    $("#elapseClock").html(a)
}

function showMessages() {
    adjustWordsPosition();
    $("#messages").fadeIn(5000, function () {
        showLoveU()
    })
}

function adjustWordsPosition() {
    $("#words").css("position", "absolute");
    $("#words").css("top", $("#garden").position().top + 195);
    $("#words").css("left", $("#garden").position().left + 70)
}

function adjustCodePosition() {
    $("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
}

function showLoveU() {
    $("#loveu").fadeIn(3000)
};