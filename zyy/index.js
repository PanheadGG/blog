var level = 0;
var isPlayingAnimation = false;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function $class(className) {
    return document.getElementsByClassName(className)
}

function $id(id) {
    return document.getElementById(id)
}

function openEnvelope() {
    $id("cover").style.animation = '.8s .3s forwards rollingOver';
}

function putOutLetter() {
    $id("cover").style.animation = '.8s .3s forwards outToBottom';
}

async function clickLetter() {
    if (level == 0 & isPlayingAnimation == false) {
        isPlayingAnimation = true;
        $id("cover").style.animation = '.8s .3s forwards rollingOver';
        await sleep(2000);
        level = 1;
        isPlayingAnimation = false;
        $id("letter").style.animation = '.8s .3s forwards putOutLetter';
        $id("envelope").style.animation = '.8s .3s forwards outToBottom';
        $id("letter-wrapper").style.animation = '0.1s 0.1s forwards bgOut';
        await sleep(2000);
        $id("container").style.animation = '.8s .3s forwards scale';
        await sleep(2000);
        var posi = document.querySelector('.posi').getBoundingClientRect();
        $id("iframe").style.clipPath = "circle(0px at " + posi.x + "px " + posi.y + "px)";
        // await sleep(1000);
        // $id("iframe").style.clipPath="circle(1000px at "+posi.x+"px "+posi.y+"px)";
    }
}

async function open() {
    await sleep(1000);
    $id("iframe").style.clipPath = "circle(1000px at 60px 20px)";
}


