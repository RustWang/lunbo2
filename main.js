let $pointBtns = $("#pointBtns>div");
let $slides = $("#slides");
let current = 0;
let $imgs = $slides.children("img");

makeFakeImg();
$slides.css({transform:"translateX(-400px)",})
binEvent();


$("#prevBtn").on("click",function () {
    goToslides(current-1);
})
$("#nextBtn").on("click",function () {
    goToslides(current+1);
})


let timer = setInterval(function () {
    goToslides(current+1);
},1000)
$(".container").on("mouseenter",function () {
    window.clearInterval(timer);
})
$(".container").on("mouseleave",function () {
    timer = setInterval(function () {
        goToslides(current+1);
    },1000)
})


$(".window").on("mouseenter",function () {
    $(".barBtn").addClass("active");
})
$(".window").on("mouseleave",function () {
    $(".barBtn").removeClass("active");
})



function binEvent() {
    $pointBtns.on("click",function (e) {
        let index = $(this).index();
        goToslides(index);
    })
}
function makeFakeImg(){
    
    let $firstImg = $imgs.eq(0).clone(true);
    let $lastImg = $imgs.eq($imgs.length-1).clone(true);
    

    $slides.append($firstImg);
    $slides.prepend($lastImg);
}

function goToslides(index) {

    
    if (index > $imgs.length-1){
        index = 0;
    } else if (index < 0){
        index = $imgs.length - 1;
    }

    
    $pointBtns.eq(index).addClass("active").siblings().removeClass("active");

    if (current ===($imgs.length-1) && index===0){
        $slides.css({
            transform:`translateX(-${($imgs.length+1)*400}px)`,
        }).one("transitionend",function () {
            $slides.hide().offset();
            $slides.css({
                transform:`translateX(-400px)`,
            }).show()
        })
    }else if (current ===0 && index===($imgs.length-1)) {
        $slides.css({
            transform:`translateX(0px)`,
        }).one("transitionend",function () {
            $slides.hide().offset();
            $slides.css({
                transform:`translateX(-${($imgs.length)*400}px)`,
            }).show()
        })
    }else {
        $slides.css({
            transform:`translateX(-${(index+1)*400}px)`,
        });
    }
    current=index;
}