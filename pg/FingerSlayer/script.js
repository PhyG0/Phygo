var can = document.getElementById("canvas");
var c = canvas.getContext("2d");

document.body.style.margin = "0px";

var w = can.width = 330;
var h = can.height = 600;
can.style.border = "2px solid black";

var gameArea = document.getElementById("game");

var MODE = "medium";
var URL_ = "https://raw.githubusercontent.com/God-Coding/FingerSlayer/main/Finger%20Slayer/";

var bladeImg, woodBg, bloodPng, blood2Png, rus, drop, hurts, wow, scaryBg, allAudio, allImages, totalImages, totalAudio, iLoaded, aLoaded, loadedImages, loadedAudio;

var RATIO = 1;
var fingersLost = 0;

document.body.style.margin = "0px";

function dist(a, b, c, d){
    return Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

function sin(bol, cb){
    if(bol) cb();
    return false;
}

function fRandom(min, max){
    return Math.round(random(min, max));
}

//menu
class UI{
    constructor(w, h){
        this.div = document.createElement("div");
        this.div.style.width = w + "px";
        this.div.id = "divDiv";
        this.div.style.height = h + "px";
        this.div.style.position = "absolute";
        gameArea.appendChild(this.div);
    }

    hide(){
        this.div.style.display = "none";
    }

    show(){
        this.div.style.display = "block";
    }

    apped(elem){
        this.div.appendChild(elem.btn);
    }

    appedElem(elem){
        this.div.appendChild(elem);
    }

    update(a, b){
        this.div.style.width = a;
        this.div.style.height = b;
    }
}
var men = new UI();
var settingsMenu = new UI();
var preloadUi = new UI();
var howToPlayUi = new UI();
var creditsUi = new UI();
howToPlayUi.hide(); creditsUi.hide();
settingsMenu.hide();

var FINGERS = 20;

men.div.style.backgroundImage = "url(menu.jpg)";
settingsMenu.div.style.backgroundImage = "url(menu.jpg)";

//button
class Button{
    constructor(x, y, w, h, txt){
        this.btn = document.createElement("button");
        this.btn.innerHTML = txt;
        this.btn.style.position = "absolute";
        this.btn.style.width = w + "px";
        this.btn.style.height = h + "px";
        this.btn.style.left = x + "px";
        this.btn.style.top = y + "px";
        this.btn.className = "button";
        this.btn.addEventListener("click", ()=>{
            this.onclick();
        });
    }

    hide(){
        this.btn.style.display = "none";
    }

    show(){
        this.btn.style.display = "block";
    }

    update(a, b){
        this.btn.style.left = a + "px";
        this.btn.style.top = b + "px";
    }

    updateWH(w){
        this.btn.style.width = w;
    }

    onclick(){}
}

let startBtn = new Button(0, 240, men.div.style.width, 30, "START");
let settingsBtn = new Button(0, 300, 100, 30, "SETTINGS");
let howToPlayBtn = new Button(0, 360, 100, 30, "HOW TO PLAY")
let creditsBtn = new Button(0, 420, 100, 30, "CREDITS");
let pauseBtn = new Button(300, 300, 40, 40, "&#9658");
pauseBtn.btn.style.opacity = 0.5;
gameArea.appendChild(pauseBtn.btn);
pauseBtn.hide();

men.apped(startBtn);
men.apped(settingsBtn);
men.apped(howToPlayBtn);
men.apped(creditsBtn);

window.addEventListener("touchmove", (e)=>{
    e.preventDefault()
}, { passive : false });

var creditText = document.createElement("h1");
creditText.innerHTML = "Game By : <span style='color:blue'> GOD OF CODING </span><br>Images/Audios : <span style='color:red'> Non copyright stuff on internet</span> Cost : <span style='color:red'> Browising Time 🙄😉</span>";

creditsUi.appedElem(creditText);

var creBack = document.createElement("button");
creBack.innerHTML = "BACK";
creditsUi.appedElem(creBack);

creBack.onclick = () =>{
    creditsUi.hide();
}

settingsBtn.onclick = () =>{
    settingsMenu.show();
}

creditsBtn.onclick = () =>{
    creditsUi.show();
}

var hh = document.createElement("h1");
hh.innerHTML = "1) Place your finger on highlighted circle shown below on game <br> 2) Remove finger when blade come ";
howToPlayUi.appedElem(hh);

var htpBack = document.createElement("button");
htpBack.innerHTML = "BACK";
howToPlayUi.appedElem(htpBack);

htpBack.onclick = () =>{
    howToPlayUi.hide();
};

howToPlayBtn.onclick = () =>{
    howToPlayUi.show();
};

//settings
var p = document.createElement("p");
p.innerHTML = "Volume : ";
p.style.fontSize = "20px";
p.style.color = "blue";
settingsMenu.appedElem(p);
var r = document.createElement("input");
r.type = "range"; r.min = 0; r.max = 1; r.step = 0.1;
settingsMenu.appedElem(r);
var p2 = document.createElement("p");
p2.innerHTML = "Mode : ";
p2.style.fontSize = "20px";
p2.style.color = "blue";
settingsMenu.appedElem(p2);
var modeBtns = document.createElement("div");
var easy = document.createElement("button");
easy.innerHTML = "EASY";
var medium = document.createElement("button");
medium.innerHTML = "MEDIUM";
var insane = document.createElement("button");
insane.innerHTML = "INSANE";
modeBtns.appendChild(easy);
modeBtns.appendChild(medium);
modeBtns.appendChild(insane);
for(let i = 0; i < modeBtns.children.length; i++){
    modeBtns.children[i].style.margin = "10px";
} 
settingsMenu.appedElem(modeBtns);
var br = document.createElement("br");
settingsMenu.appedElem(br);
var p3 = document.createElement("p");
p3.innerHTML = "Circle Radius : ";
p3.style.fontSize = "20px";
p3.style.color = "blue";
settingsMenu.appedElem(p3);
var rr = document.createElement("input");
rr.type = "range"; rr.min = 20; rr.max = 60; rr.value = 40;
settingsMenu.appedElem(rr);
var br2 = document.createElement("br");
settingsMenu.appedElem(br2);
var back = document.createElement("button");
back.innerHTML = "BACK";
settingsMenu.appedElem(back);
//download assets button
var dab = document.createElement("button");
dab.innerHTML = "DOWNLOAD ASSETS";
preloadUi.appedElem(dab);
let fuckBr = document.createElement("br");
preloadUi.appedElem(fuckBr);
//progress bar
var pb = document.createElement("progress");
pb.value = 0;
preloadUi.appedElem(pb);

dab.onclick = () =>{
    dab.innerHTML = "Downloading assets...";
    dab.disabled = true;

    bladeImg = new Image();
    bladeImg.src = URL_ +  "blade.png";

    woodBg = new Image();
    woodBg.src = URL_ + "bg2.jpg";

    bloodPng = new Image();
    bloodPng.src = URL_ + "blood.png";

    blood2Png = new Image();
    blood2Png.src = URL_ +  "blood-1.png";

    rus = new Audio(URL_ + "scared.mp3");
    drop = new Audio("drop.wav");

    scaryBg = new Audio(URL_ + "scary.mp3");
    hurts = [new Audio(URL_ + "hurt.wav"), new Audio(URL_ + "hurt1.wav"), new Audio(URL_ + "hurt2.wav")];
    wow = new Audio(URL_ + "clap.wav");

    allImages = [bladeImg, woodBg, bloodPng, blood2Png];
    allAudio = [rus, drop, hurts[0], hurts[1], hurts[2], wow, scaryBg];

    totalImages = allImages.length - 1;
    totalAudio = allAudio.length - 1;
    loadedImages = loadedAudio = 0;
    iLoaded = aLoaded = false;

    allImages.forEach(image=>{
        image.onload = () =>{
            loadedImages++;
            if(loadedImages == totalImages){
                iLoaded = true;
            }
            pb.value = loadedAudio + loadedImages;
        }
    });
    
    allAudio.forEach(audio=>{
        audio.addEventListener("canplaythrough", ()=>{
            loadedAudio++;
            if(loadedAudio == totalAudio){
                aLoaded = true;
            }
            pb.value = loadedAudio + loadedImages;
        });
    });

    pb.max = totalAudio + totalImages;

    gb = new GameBox(0, 0, w, h);
    bf = new BloodEffects(0, 0, w, h, bloodPng, "");    

    for(let i = 0; i < 3; i++){
        let r = new Ripples(gb.fingerHolder.x, gb.fingerHolder.y, gb.fingerHolder.r, random(5, 40))
        ripples.push(r);
    }
}

var allButtons = document.getElementsByTagName("button");


for(let i = 0; i < allButtons.length; i++){
    allButtons[i].style.opacity = 0.8;
}

back.onclick = () =>{
    settingsMenu.hide();
}

pauseBtn.onclick = () =>{
    scaryBg.pause();
    pauseBtn.hide()
    startBtn.btn.innerHTML = "RESUME";
    men.show();
}

easy.style.color = "black";
easy.style.backgroundColor = "white";
medium.style.color = "white";
medium.style.backgroundColor = "black";
insane.style.color = "black";
insane.style.backgroundColor = "white";

easy.onclick = () =>{ 
    MODE = "easy";
    easy.style.color = "white";
    easy.style.backgroundColor = "black";
    medium.style.color = "black";
    medium.style.backgroundColor = "white";
    insane.style.color = "black";
    insane.style.backgroundColor = "white";
}

medium.onclick = () =>{ 
    MODE = "medium";
    medium.style.color = "white";
    medium.style.backgroundColor = "black";
    easy.style.color = "black";
    easy.style.backgroundColor = "white";
    insane.style.color = "black";
    insane.style.backgroundColor = "white";
}

insane.onclick = () =>{ 
    MODE = "insane";
    insane.style.color = "white";
    insane.style.backgroundColor = "black";
    easy.style.color = "black";
    easy.style.backgroundColor = "white";
    medium.style.color = "black";
    medium.style.backgroundColor = "white";
}

class BloodEffects{
    constructor(x, y, w, h, img, type){
        this.x = x; this.y = y; this.img = img; this.type = type; this.w = w; this.h = h;
        if(this.type == ""){
            this.opacity = 0.0;
        }else{
            this.opacity = 1.0;
        }
        this.t = 0;
    }

    update(dt){
        if(this.type == ""){
            this.opacity -= dt / 2;
            if(this.opacity < 0){
                this.opacity = 0;
            }
        }else{
            this.opacity -= dt / 40;
            if(this.opacity < 0){
                this.opacity = 0;
            }
        }
    }

    draw(c){
        c.globalAlpha = this.opacity;
        c.drawImage(this.img, this.x, this.y, this.w, this.h);
        c.globalAlpha = 1.0;
    }
}

//shshshshshshshshshss
var bf, gb;
var stains = [];

class State{
    constructor(state){
        this.self = state;
    }
}

class GameStateManager{
    constructor(states){
        this.states = states;
        this.currentState = this.states[this.states.length - 1];
        if(this.currentState == undefined) this.currentState = new State(false).self;
        this.bladeT = 0;
        this.bladeTime = random(2, 3);
        this.resetTime = true;
        this.removeFingerOneTime = true;
        this.ttext = true;
        this.t2text = true;
    }

    updateBlade(blade, states, dt, fingerActive, texts){
        if(this.states.length > 0){
            this.currentState = this.states[this.states.length - 1].self;
        }

        if(this.currentState == "removeFinger"){
            this.removeFingerOneTime = sin(this.removeFingerOneTime, ()=>{
                FINGERS -= 1;
                if(FINGERS == 10){
                    texts.push(new TextFade(w/2, h/2, "Now using Toes 😑", c, [random(200, 255), random(200, 255), random(0, 10)]));
                }
                if(FINGERS == 0){
                    texts.push(new TextFade(w/2, h/2, "All fingers and toes are gone", c, [random(200, 255), random(200, 255), random(0, 10)]));
                }
                bf.opacity = 1;
                hurts[fRandom(0, hurts.length - 1)].play();
                stains.push(new BloodEffects(0, 0, w, h, blood2Png, "some"))
                if(FINGERS > 10){
                    texts.push(new TextFade(w/2, h/2, "Remaining Fingers : " + FINGERS, c, [random(200, 255), random(200, 255), random(0, 10)]));
                }
                if(FINGERS < 10 && FINGERS !== 0){
                    texts.push(new TextFade(w/2, h/2, "Remaining Toes : " + FINGERS, c, [random(200, 255), random(200, 255), random(0, 10)]));
                }
                FINGERS = 20;
                this.states.push(new State("bladeUp"))
            });
        }

        if(this.currentState == "start"){
            this.removeFingerOneTime = true;
            this.bladeT += dt;
            if(this.bladeT > this.bladeTime){
                drop.currentTime = 0;
                drop.play();
                blade.update(dt, states);
            }else{
                if(!fingerActive){
                    //THROW TOO EARLY TEXT
                    this.ttext = sin(this.ttext, ()=>{
                        rus.play();
                        texts.push(new TextFade(w/2, h/2, "Are you scared?", c, [random(100, 255), random(100, 255), random(0, 25)]));
                        states.push(new State("bladeUp"))
                    })
                }else{
                    this.ttext = true;
                }
            }
        }
        if(this.currentState == "bladeUp"){
            blade.y -= 180 * dt;
            if(blade.y < -blade.w/4){
                blade.y = -blade.w/4;
                this.resetTime = sin(this.resetTime, ()=>{
                    if(MODE == "easy") this.bladeTime = random(2, 4);
                    if(MODE == "medium") this.bladeTime = random(1, random(4, 5));
                    if(MODE == "insane") this.bladeTime = random(0.5, random(4, 6));
                    this.bladeT = 0;
                });
                if(blade.y == -blade.w/4){
                    states.push(new State("bladeReady"));
                }
            };
        }else{
            this.resetTime = true;
        }
    }
}

class Blade{
    constructor(x, y, w, h, img){
        this.img = img;
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.ang = 0;
        this.bladeSpeed = 0.5;
    }

    update(dt, states){
        if(MODE == "easy"){
            this.y += random(800, 1000) * dt;
        }
        if(MODE == "medium"){
            this.y += random(1000, 1500) * dt;
        }
        if(MODE == "insane"){
            this.y += random(1500, 2000) * dt;
        }
        if(this.y + this.h > h){
            this.y = h - this.h;
            states.push(new State("bladeUp"));
        }
    }

    drawImage(c){
        c.save();
        c.translate(this.x + this.w/2, this.y + this.h/2);
        c.rotate(this.ang);
        c.drawImage(this.img, -this.w/2, -this.h/2, this.w, this.h);
        c.restore();
        // c.beginPath();
        // c.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, 2 * Math.PI);
        // c.stroke()
        // c.closePath();
    }
}

class FingerHolder{
    constructor(x, y, r){
        this.x = x; this.y = y; this.r = r;
        this.activated = false;
        canvas.addEventListener("touchstart", (e)=>{
            e.preventDefault()
            for(let i = 0; i < e.touches.length; i++){
                let x = e.touches[i].clientX;
                let y = e.touches[i].clientY;
                x = (x - gameArea.getBoundingClientRect().x);
                y = (y - gameArea.getBoundingClientRect().y);
                x = ( x * w )/ gameArea.getBoundingClientRect().width;
                y = ( y * h )/ gameArea.getBoundingClientRect().height;
                if(dist(x, y, this.x, this.y) < this.r) this.activated = true;
            }
        });

        canvas.addEventListener("mousedown", (e)=>{
            let x = e.clientX;
            let y = e.clientY;
            x = (x - gameArea.getBoundingClientRect().x);
            y = (y - gameArea.getBoundingClientRect().y);
            x = ( x * w )/ gameArea.getBoundingClientRect().width;
            y = ( y * h )/ gameArea.getBoundingClientRect().height;
            if(dist(x, y, this.x, this.y) < this.r) this.activated = true;
        });

        canvas.addEventListener("mouseup", ()=>{
            this.activated = false;
        });

        canvas.addEventListener("touchend", (e)=>{
            e.preventDefault()
            this.activated = false;
        });
    }

    draw(c){
        c.beginPath();
        if(this.activated){
            c.fillStyle =  "rgba(255, 0, 0, 0.5)"; 
        }else{
            c.fillStyle =  "rgba(0, 255, 0, 0.5)";
        }
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fill();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.stroke();
        c.closePath();
    }
}

class GameBox{
    constructor(x, y, w, h){
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.blade = new Blade(this.x, this.y - this.w/4, this.w, this.h / 4, bladeImg);
        this.fingerHolder = new FingerHolder(this.x + this.w / 2, this.y + this.h - 2 * 40, 40);
        this.changeState = true;
        this.impressive = true;
        this.easyMode = ["Try Medium Mode", "Nice", "Not bad", "Cool"];
        this.mediumMode = ["DAMN!!", "BRUH!!", "CLOSE!!", "AMAZING!!", "FREAKING COOL"];
        this.insaneMode = ["INHUMAN!!", "CHEATING!!", "SERIOUSLY??"];
        this.shit = true;
    }

    update(dt, states, currentState, texts){
        if(MODE == "easy"){
            this.blade.bladeSpeed = 0.3;
        }
        if(MODE == "medium"){
            this.blade.bladeSpeed = 0.5;
        }
        if(MODE == "insane"){
            this.blade.bladeSpeed = 0.7;
        }
        this.blade.ang += this.blade.bladeSpeed;
        if(this.fingerHolder.activated){
            pauseBtn.hide();
            this.impressive = true;
            if(this.blade.y == -this.blade.w/4){
                states.push(new State("start"));
                this.impressive = true;
            }
            if(dist(this.blade.x + w/2, this.blade.y + this.blade.w/4, this.fingerHolder.x, this.fingerHolder.y) < (this.blade.w/2 + this.fingerHolder.r)){
                this.changeState = sin(this.changeState, ()=>{
                    if(currentState != "bladeUp"){
                        //this.shit = true
                        states.push(new State("removeFinger"));
                    }
                });
            }else{
                this.changeState = true;
            }
        }else{
            if(men.div.style.display == "none") pauseBtn.show()
            if(this.blade.y + this.blade.h > this.fingerHolder.y - this.fingerHolder.r){
                this.impressive = sin(this.impressive, ()=>{
                    wow.play();
                    if(MODE == "easy"){
                        texts.push(new TextFade(w/2, h/2, this.easyMode[fRandom(0, this.easyMode.length - 1)], c, [random(100, 255), random(0, 255), random(0, 1)]));
                    }
                    if(MODE == "medium"){
                        texts.push(new TextFade(w/2, h/2, this.mediumMode[fRandom(0, this.mediumMode.length - 1)], c, [random(100, 255), random(0, 255), random(0, 1)]));
                    }
                    if(MODE == "insane"){
                        texts.push(new TextFade(w/2, h/2, this.insaneMode[fRandom(0, this.insaneMode.length - 1)], c, [random(100, 255), random(0, 255), random(0, 1)]));
                    }
                });
            }
        }
    }

    draw(c){
        c.lineWidth = 2;
        c.strokeStyle = "white";
        c.strokeRect(this.x, this.y, this.w, this.h);
        c.drawImage(woodBg, this.x, this.y, this.w, this.h);
        //this.blade.drawImage(c)
        //this.fingerHolder.draw(c);
    }
}

class Ripples{
    constructor(x, y, r, speed){
        this.x = x; this.y = y; this.r = r;
        this.limit = 2 * this.r;
        this.reserve = r;
        this.speed = speed;
        this.colors = [
            "rgba(255, 200, 100, 0.5)",
            "rgba(100, 233, 50, 1)",
            "rgba(150, 23, 50, 0.5)",
            "rgba(120, 123, 10, 0.1)",
            "rgba(100, 23, 200, 0.7)",
        ]
    }

    update(dt){
        this.r += dt * this.speed;
        if(this.r > this.limit){
            this.r = this.reserve;
        }
    }

    draw(c){
        c.beginPath();
        c.strokeStyle = this.colors[fRandom(0, this.colors.length - 1)];
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.stroke();
    }
}

class TextFade{
    constructor(x, y, text, c, col){
        this.x = x; this.y = y; this.text = text;
        this.opacity = 1;
        this.size = 20;
        this.col = col;
        this.tw = c.measureText(this.text).width;
    }

    reset(text){
        this.text = text;
        this.size = 20;
        this.opacity = 1;
        this.canRemove = false;
    }

    update(dt){
        this.size += dt * 10;
        this.tw = c.measureText(this.text).width;
        if(this.opacity > 0){
            this.opacity -= dt / 2;
        }
        if(this.size > 70) this.canRemove = true;
    }

    draw(c){
        c.font = `${this.size}px Verdana`;
        if(this.col){
            c.fillStyle = `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, ${this.opacity})`;
        }else{
            c.fillStyle = `rgba(200, 10, 200, ${this.opacity})`;
        }
        c.fillText(this.text, this.x - this.tw/2, this.y);
    }
}

var states = [];
var sm = new GameStateManager(states);

var ripples = [];
let texts = [];

startBtn.onclick = () =>{
    scaryBg.currentTime = 0;
    scaryBg.play();
    men.hide();
    pauseBtn.show()
    texts.push(new TextFade(w/2, h/2, "GET READY", c, [200, 200, 0]));
}

function u(e){
    if(aLoaded && iLoaded){
    preloadUi.hide();
    pauseBtn.btn.style.left = (gameArea.getBoundingClientRect().width - pauseBtn.btn.getBoundingClientRect().width) + "px";
    gb.update(e, states, sm.currentState, texts);
    sm.updateBlade(gb.blade, states, e, gb.fingerHolder.activated, texts);
    if(gb.blade.y == -gb.blade.w/4 && !gb.fingerHolder.activated){
        ripples.forEach(r=>{
            r.update(e);
        });
    }
    bf.update(e);
    stains.forEach(stain=>{
        stain.update(e);
    });
    texts.forEach(t=>{
        if(!t.canRemove){
            t.update(e);
        }
    });
    if(states.length > 50) states.splice(0, 45);
    if(gb.blade.ang > 3.14) gb.blade.ang = -Math.PI;
    startBtn.updateWH(men.div.style.width);
    settingsBtn.updateWH(men.div.style.width);
    creditsBtn.updateWH(men.div.style.width);
    howToPlayBtn.updateWH(men.div.style.width);
    if(aLoaded){
        allAudio.forEach(audio =>{
            audio.volume = r.value;
        });
    }

    gb.fingerHolder.r = Number(rr.value);
    ripples.forEach(r=>{
        r.reserve = Number(rr.value);
        r.limit = Number(rr.value) * 2;
    });
}
    dab.style.width = men.div.style.width;
    dab.style.marginTop = men.div.getBoundingClientRect().height / 2 + "px";
    pb.style.width = men.div.style.width;

}

function resizeScreen(){
    var widthToHeight = w / h;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    var newWidthToHeight = newWidth / newHeight;

    RATIO = newWidthToHeight;

    if(newWidthToHeight > widthToHeight){
        newWidth = newHeight * widthToHeight;
    }else{
        newHeight = newWidth / widthToHeight;
    }

    gameArea.style.width = newWidth + "px";
    gameArea.style.height = newHeight + "px";

    men.update(newWidth + "px", newHeight + "px");
    settingsMenu.update(newWidth + "px", newHeight + "px");
    preloadUi.update(newWidth + "px", newHeight + "px");
    howToPlayUi.update(newWidth + "px", newHeight + "px");
    creditsUi.update(newWidth + "px", newHeight + "px");


    gameArea.style.marginTop = (-newHeight / 2) + "px";
    gameArea.style.marginLeft = (-newWidth / 2) + "px";

    if(aLoaded && iLoaded){
        d();
    }
}

function d(){
    c.fillStyle = "black";
    c.fillRect(0, 0, w, h);
    gb.draw(c);
    stains.forEach(stain=>{
        stain.draw(c);
    });
    bf.draw(c);
    gb.blade.drawImage(c);
    if(gb.blade.y == -gb.blade.w/4 && !gb.fingerHolder.activated){
        ripples.forEach(r=>{
            r.draw(c);
        });
    }
    gb.fingerHolder.draw(c);
    texts.forEach(t=>{
        if(!t.canRemove){
            t.draw(c);
        }
    });
}

var t0 = performance.now();
var t1 = dt = 0;

function l(){
    t1 = performance.now();
    dt = t1 - t0;
    u(dt / 1000);
    resizeScreen();
    t0 = t1;    
    requestAnimationFrame(l)
};l();