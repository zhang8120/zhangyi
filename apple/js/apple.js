$(function(){
    var cw = $(window).height();
    var ch = $(window).width();
    $(".xla").click(function(){
        var cw = $(window).height();
        var ch = $(window).width();
        if($(".xla>a").html()=="="){
            $(".xla>a").html("×");
        }else{
            $(".xla>a").html("=");
        }
        $(".xla>.son").css("height",cw+"px").slideToggle(200);
    });

    $(".contact >.row >div >h3").click(function(){
        var cw = $(window).height();
        var ch = $(window).width();
        if(ch<=720){
            $(this).next("ul").slideToggle(200);
        }else{
            $(this).next("ul").show();
        }
    });

    var banner = $(".imgbox");
    var currentNum = 0;
    var nextNum = 0;
    var currentTime = 0;
    var flag = true;
    function move(){
        nextNum++;
        if(nextNum == 3){
            nextNum = 0;
            flag = false;
        }
        // console.log(banner[currentNum]);
        // $(banner[currentNum]).animate({width:"80%",height:"80%"}).css("zIndex",0);
        $(banner[currentNum]).children(".imagebox").css("transform","scale(0.8,0.8)");
        $(banner[nextNum]).animate({left:0},function(){
            // $(banner[currentNum]).css({left:"100%",width:"100%",height:"100%"});
            $(banner[currentNum]).css({left:"100%"}).children(".imagebox").css("transform","scale(1,1)");
            currentNum = nextNum;
            currentTime = 0;
            flag = true;
        }).css("zIndex",1);
    }

    function move1(){
        currentTime+=50;
        var bili = currentTime/3000;
        if(bili > 1){
            bili = 1;
            // $(".progress").css("width","0");
        }
        $(".progress").eq(currentNum).css({width:bili*100+"%"});
        if(flag == false){
            $(".progress").css("width",0);
        }
    }

    var t1 = setInterval(move,3000);
    var t2 = setInterval(move1,50);

    $(window).focus(function(){
        t1 = setInterval(move,3000);
        t2 = setInterval(move1,50);
    });
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    });

    $(".btns>li").click(function(){
        nextNum = $(this).index(".btns>li");
        if(nextNum > currentNum){
            stop("left");
        }else{
            stop("right")
        }
    });


    $(".lefts").click(function(){
        nextNum--;
        if(nextNum == -1){
            nextNum = 2;
        }
        stop("left");
    });
    $(".rights").click(function(){
        nextNum++;
        if(nextNum == 3){
            nextNum = 0;
        }
        stop("right");
    });


    function stop(type){
        clearInterval(t1);
        clearInterval(t2);
        $(".btns>li").find(".progress").css("width",0);
        $(".btns>li").eq(nextNum).find(".progress").css("width","100%");

        var types = type || "left";
        if(types == "left"){
            // $(".imgbox:eq("+currentNum+")").animate({width:"80%",height:"80%"}).css("zIndex",0);
            $(".imgbox:eq("+currentNum+")").children(".imagebox").css({"transform":"scale(0.8,0.8)","zIndex":0});

            $(".imgbox:eq("+nextNum+")").animate({left:0},function(){
                // $(".imgbox:eq("+currentNum+")").css({
                //     left:"100%",width:"100%",height:"100%"
                // });
                $(".imgbox:eq("+currentNum+")").css({left:"100%"}).children(".imagebox").css("transform","scale(1,1)");

                currentNum=nextNum;

            }).css("zIndex",1);
        }else if(types == "right"){
            $(".imgbox").eq(nextNum).css({left:0,zIndex:0}).children(".imagebox").css("transform","scale(0.8,0.8)");
            $(".imgbox:eq("+currentNum+")").css({"zIndex":1}).animate({left:"100%"},function(){
                $(".imgbox").eq(nextNum).children(".imagebox").css({transform:"scale(1,1)"});
                currentNum=nextNum;
            });
            // $(".imgbox").eq(nextNum).css({left:"0"}).children(".imagebox").css("transform","scale(0.8,0.8)");
        }
    }

});