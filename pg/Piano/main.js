let pg = Phygo.Init();

var game = pg.Game({
    width : 1200/2,
    height : 857/2,
    relexationCount : 1,
    Mainscene : {
        camera_options:{
            lock : true,
            zoom : 1,
            worldWidth : 1200/2,
            worldHeight : 857/2,
        },
    }
});

game.Start();
game.Scene.Camera.LookAt(game.Scene.CENTER);

const keys = [];
const tones = [];
const letters = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B"];
const blackKeys = [];
const blackTones = [];
const WHITE_TILE_WIDTH = 40;
const WHITE_TILE_HEIGHT = 230;

for(let i = 1; i < 15; i++){
    keys.push(new Key((i-0.5) * WHITE_TILE_WIDTH, 100, WHITE_TILE_WIDTH, WHITE_TILE_HEIGHT, letters[i-1]));
    if(i < 10){
        tones.push(new Audio(`keys/key${i+10}.mp3`));
    }else{
        tones.push(new Audio(`keys/key${i+10}.mp3`));
    }
}

for(let i = 1; i < 11; i++){
    if(i != 10){
        blackTones.push(new Audio(`keys/key0${i}.mp3`));
    }else{
        blackTones.push(new Audio(`keys/key${i}.mp3`));
    }
}

blackKeys.push(new BlackKey(keys[0], 20, 150));
blackKeys.push(new BlackKey(keys[1], 20, 150));
blackKeys.push(new BlackKey(keys[3], 20, 150));
blackKeys.push(new BlackKey(keys[4], 20, 150));
blackKeys.push(new BlackKey(keys[5], 20, 150));
blackKeys.push(new BlackKey(keys[7], 20, 150));
blackKeys.push(new BlackKey(keys[8], 20, 150));
blackKeys.push(new BlackKey(keys[10], 20, 150));
blackKeys.push(new BlackKey(keys[11], 20, 150));
blackKeys.push(new BlackKey(keys[12], 20, 150));


window.addEventListener("mousedown", (e)=>{
    let key = e.key;
        let x = e.clientX;
        let y = e.clientY;
        x = (x - game.Screen.div.getBoundingClientRect().x);
        y = (y - game.Screen.div.getBoundingClientRect().y);
        x = ( x * game.Scene.Camera.worldWidth )/ game.Screen.div.getBoundingClientRect().width;
        y = ( y * game.Scene.Camera.worldHeight )/ game.Screen.div.getBoundingClientRect().height;
        let blackPressed = false;
        blackKeys.forEach((akey, i)=>{
            if(x > akey.x && x < akey.x + akey.w && y > akey.y && y < akey.y + akey.h){
                let aud = new Audio(blackTones[i].src);
                aud.play();
                blackPressed = true;
            }
        });
        if(!blackPressed){
            keys.forEach((akey, i)=>{
                if(x > akey.x && x < akey.x + akey.w && y > akey.y && y < akey.y + akey.h){
                    akey.col = "rgba(255, 255, 255, 0.5)";
                    let aud = new Audio(tones[i].src);
                    aud.play();
                }
            });
        }
});

window.addEventListener("touchstart", (e)=>{
    let key = e.key;
    for(let i = 0; i < e.touches.length; i++){
        let x = e.touches[i].clientX;
        let y = e.touches[i].clientY;
        x = (x - game.Screen.div.getBoundingClientRect().x);
        y = (y - game.Screen.div.getBoundingClientRect().y);
        x = ( x * game.Scene.Camera.worldWidth )/ game.Screen.div.getBoundingClientRect().width;
        y = ( y * game.Scene.Camera.worldHeight )/ game.Screen.div.getBoundingClientRect().height;
        let blackPressed = false;
        blackKeys.forEach((akey, i)=>{
            if(x > akey.x && x < akey.x + akey.w && y > akey.y && y < akey.y + akey.h){
                let aud = new Audio(blackTones[i].src);
                aud.play();
                blackPressed = true;
            }
        });
        if(!blackPressed){
            keys.forEach((akey, i)=>{
                if(x > akey.x && x < akey.x + akey.w && y > akey.y && y < akey.y + akey.h){
                    akey.col = "rgba(255, 255, 255, 0.5)";
                    let aud = new Audio(tones[i].src);
                    aud.play();
                }
            });
        }
    }
});

window.addEventListener("touchend", ()=>{
    keys.forEach(key=>{
        key.col = "white";
    });
}); 

window.addEventListener("mouseup", ()=>{
    keys.forEach(key=>{
        key.col = "white";
    });
}); 


game.Update = (dt) =>{
  
}

game.Draw = (c) =>{
    c.save();
    c.fillStyle = "rgba(0, 0, 0, 0.4)";
    c.fillRect(0, 0, game.Scene.Camera.worldWidth, game.Scene.Camera.worldHeight);
    c.restore();
    keys.forEach(key=>{
        key.draw(c);
    });
    blackKeys.forEach(key=>{
        key.draw(c);
    }); 
}













