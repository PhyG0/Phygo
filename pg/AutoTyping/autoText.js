class AutoText{
    constructor(text, x, y, speed, color, nextLineGap, bigAudio){
        this.text = text || "Hello world";
        this.x = x || 100;
        this.y = y || 100;
        this.bigAudio = bigAudio || false;
        this.speed = speed || 10;
        this.color = color || "undefined";
        this.font = "20px Verdana";
        this.string = this.text.split("");
        this.audioString = "Audio Loading..".split("");
        this.textWidth = 0;
        this.textSize = 20;
        this.finalText = [""];
        for(let i = 0; i < 1000; i++){
            this.finalText[i] = "";
        }
        this.furtherLines = [];
        this.time = 0;
        this.singleTime = true;
        this.currentTextUpdated = false;
        this.i = 0;
        this.lineDisappearTime = [2];
        this.lineCurrentTime = 0;
        this.adding = false;
        this.currentLine = 0;
        this.nextLineGap = nextLineGap || 1;
        this.audio = new Audio();
        this.audioLoaded = false;
        if(this.bigAudio){
        if(this.speed < 25){
            this.audio.src = "https://github.com/PhyG0/phygo/raw/main/Mechanical-Keyboard-single-button-presses-5-www%20(mp3cut.net).mp3";
        }else{
            if(this.bigAudio){
                this.audio.src = "https://github.com/PhyG0/phygo/raw/main/fast-pace-Typing-on-mechanical-keyboard-1-www%20(mp3cut.net).mp3";
            }else{
                this.audio.src = "https://github.com/PhyG0/phygo/raw/main/Mechanical-Keyboard-single-button-presses-5-www%20(mp3cut.net).mp3";
            }
        }
    }else{
        this.audioLoaded = true;
    }
        this.audio.addEventListener("canplaythrough", ()=>{ this.audioLoaded = true })
        this.audioTextRestart = true;
    }

    setFont(size, font){
        this.font = `${size}px ${font}` || "20px Verdana";
        this.textSize = size;
    }

    singleTon(bool, cb){
        if(bool){
            cb();
        }
        return false;
    }

    restart(){
        this.string = this.text.split("");
        this.textWidth = 0;
        this.textSize = 20;
        this.adding = true;
        this.finalText = [""];
        for(let i = 0; i < 1000; i++){
            this.finalText[i] = "";
        }
        this.i = 0;
    }

    update(dt, c){
        this.time += dt * this.speed;
        this.lineCurrentTime += dt * 1.7;
        if(Math.ceil(this.time) % 5 == 0){
            this.singleTime = this.singleTon(this.singleTime, ()=>{
                this.textWidth = c.measureText(this.finalText[this.currentLine]).width;
                if(this.i < this.string.length){
                    this.adding = true;
                    if(this.audioLoaded){
                        this.audioTextRestart = this.singleTon(this.audioTextRestart, ()=>{ this.restart() });
                        if(this.bigAudio){
                        this.audio.play();
                        }
                        this.finalText[this.currentLine] += this.string[this.i];

                    }else{
                        if(this.i < this.audioString.length){
                            this.finalText[this.currentLine] += this.audioString[this.i];
                        }else{
                            this.adding = false;
                        }
                    }
                    this.i += 1;
                    if(this.textWidth > c.canvas.width/1.5){
                        if(this.string[this.i] == " "){
                            this.currentLine++;
                        }
                    }
                }else{
                    this.adding = false;
                    this.audio.pause();
                }

            });
        }else{
            this.singleTime = true;
        }
        
    }

    draw(c){
        c.font = this.font;
        if(this.color == "undefined"){
            //let gradient = c.createLinearGradient(this.x, this.y, this.x + this.textWidth, this.y + ((this.currentLine + 1) * (this.nextLineGap * this.textSize)));
            let gradient = c.createLinearGradient(0, 0, c.canvas.width, c.canvas.height)
            gradient.addColorStop(0, "red");
            gradient.addColorStop(0.2, "blue");
            gradient.addColorStop(0.4, "yellow");
            gradient.addColorStop(0.6, "orange");
            c.fillStyle = gradient;

        }else{
            c.fillStyle = this.color;
        }
        for(let i = 0; i < this.finalText.length; i++){
            c.fillText(this.finalText[i], this.x, this.y + ((i + 1) * (this.nextLineGap * this.textSize)));
            c.beginPath();
            c.lineWidth = 3;
            c.moveTo(this.x + this.textWidth + this.textSize/1.5, this.y + ((this.currentLine + 1) * (this.nextLineGap * this.textSize)));
            c.lineTo(this.x + this.textWidth + this.textSize/1.5, (this.y + this.textSize + ((this.currentLine + 1) * (this.nextLineGap * this.textSize))) - (2 * this.textSize));
            c.closePath();
        }
        c.strokeStyle = "black";
        if(!this.adding){
            if(Math.ceil(this.lineCurrentTime) % this.lineDisappearTime[0] != 0){
                c.stroke();
            }
        }else{
            c.stroke();
        }
    }

}