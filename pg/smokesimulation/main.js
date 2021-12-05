let pg = Phygo.Init();

var game = pg.Game({
    width : 500,
    height : 700,
    relexationCount : 1,
    Mainscene : {
        camera_options:{
            lock : true,
            zoom : 1,
            worldWidth : 500,
            worldHeight : 700,
        },
    }
});

game.Start();
game.Scene.Camera.LookAt(game.Scene.CENTER);

var ps = new ParticleSystem({
    count : 500,
    delay : 0.01 / 2,
    opacityRate : 1,
    sizeRate : 100,
    lifeTime : 1,
    range : [0, 360],
    speedRange : [200, 250],
    position : pg.Vector(500/2 - 40, 700/2 - 40)
}, pg);


//Done button to hide UI
var doneBtn = new Button(0.5, 0.1, 170, 60, "Done");
doneBtn.onclick = () =>{
    menu.hide();
}

//Controllers
var windXR =  new Range(0.5, 0.3, 170, 100, -4000, 4000, "Wind-X : <br>[ -4k to 4k ] ");
windXR.range.step = "10";
var windYR =  new Range(0.5, 0.6, 170, 100, -4000, 4000, "Wind-Y : <br>[ -4k to 4k ] ");
windYR.range.step = "10";

var speedR = new Range(0.5, 0.9, 170, 100, 10, 300, "Min-Speed : <br>[ 10 to 300 ]");
speedR.range.value = "200";
var speedMR = new Range(0.5, 1.2, 170, 100, 300, 600, "Max-Speed :<br>[ MinSpeed to 600 ] ");
speedMR.range.value = "250";

var angryNess = new Range(0.5, 1.5, 170, 100, -2, 2, "Texture-Spin :<br>[ -2 to 2 ] ");
angryNess.range.step = "0.01";
angryNess.range.value = "0.01";

var noOfPart = new TextField(0.5, 3.0, 170, 120, "Particle Count : ");
noOfPart.field.type = "number";
noOfPart.addBtn.onclick = () =>{
    if(Number(noOfPart.field.value) < 0){
        noOfPart.field.value = "";
        noOfPart.field.placeholder = "No negative count!";
    }
    if(Number(noOfPart.field.value) > 1500){
        noOfPart.field.placeholder = "1500";
    }

    ps.Init(Number(noOfPart.field.value));
}

var resPawn = new Button(0.5, 1.8, 120, 50, "Respawn : True");
resPawn.state = true;
resPawn.elem.style.color = "green";
resPawn.elem.onclick = () =>{
    if(resPawn.state){
        resPawn.state = false;
        resPawn.elem.innerHTML = "Respawn : False";
        resPawn.elem.style.color = "red";
        ps.regenerate = false;
    }else{
        resPawn.state = true;
        resPawn.elem.innerHTML = "Respawn : True";
        resPawn.elem.style.color = "green";
        ps.regenerate = true;
    }
}

var angleOfejec = new Range(0.5, 2.1, 170, 100, 0, 360, "Ejection-Angle : <br> [ 0 to 360 ]");
angleOfejec.range.step = "0.01";
angleOfejec.range.value = "360";

var opacityR = new Range(0.5, 2.4, 200, 100, 0.1, 5, "Opacity-Decrease-Rate : <br> [ 0.1 to 5 ]");
opacityR.range.step = "0.01";
opacityR.range.value = "1";

var sizeR = new Range(0.5, 2.7, 200, 100, 10, 400, "Size-Increase-Rate : <br> [ 10 to 400 ]");
sizeR.range.step = "0.1";
sizeR.range.value = "100";

var menu = new Menu([doneBtn, windXR, windYR, speedR, speedMR, angryNess, resPawn, angleOfejec, opacityR, sizeR, noOfPart], true);
menu.addTo(game.Screen.div);
menu.hide();
menu.div.style.overflow = "scroll";

window.addEventListener("touchmove", (e)=>{
    if(menu.div.style.display == "none"){
        e.preventDefault();
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        x = (x - game.Screen.div.getBoundingClientRect().x);
        y = (y - game.Screen.div.getBoundingClientRect().y);
        x = ( x * 500 )/ game.Screen.div.getBoundingClientRect().width;
        y = ( y * 700 )/ game.Screen.div.getBoundingClientRect().height;
        ps.position.x = x;
        ps.position.y = y;
    }
}, { passive : false });

window.addEventListener("mousemove", (e)=>{
    if(menu.div.style.display == "none"){
        e.preventDefault();
        let x = e.clientX;
        let y = e.clientY;
        x = (x - game.Screen.div.getBoundingClientRect().x);
        y = (y - game.Screen.div.getBoundingClientRect().y);
        x = ( x * 500 )/ game.Screen.div.getBoundingClientRect().width;
        y = ( y * 700 )/ game.Screen.div.getBoundingClientRect().height;
        ps.position.x = x;
        ps.position.y = y;
    }
}, { passive : false });

game.Update = (dt) =>{  
    ps.Update(dt, pg.Random);
    speedMR.range.min = speedR.range.value;
    ps.detor.x = Number(windXR.range.value);
    ps.detor.y = Number(windYR.range.value);
    ps.speedRange[0] = Number(speedR.range.value);
    ps.speedRange[1] = Number(speedMR.range.value);
    ps.angry = Number(angryNess.range.value);
    ps.range[1] = Number(angleOfejec.range.value);
    ps.opacityRate = Number(opacityR.range.value);
    ps.sizeRate = Number(sizeR.range.value);
}

game.Draw = (c) =>{
    c.fillStyle = "black";
    c.fillRect(0, 0, 500, 700);
    ps.Draw(c);
}