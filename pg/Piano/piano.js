class Key{
    constructor(x, y, w, h, letter){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = "white";
        this.letter = letter || "A";
    }

    draw(c){
        c.save();
        c.fillStyle = this.col;
        c.fillRect(this.x, this.y, this.w, this.h);
        c.strokeStyle = "black";
        c.strokeRect(this.x, this.y, this.w, this.h);
        c.font = "20px verdana";
        c.fillStyle = "black";
        c.fillText(this.letter, this.x + this.w/2 - 10, this.y + 0.86 * this.h);
        c.restore();
    }

}

class BlackKey{
    constructor(sk, w, h, letter){
        this.startKey = sk;
        this.w = w;
        this.h = h;
        this.x = (this.startKey.x + this.startKey.w) - this.w/2;
        this.y = this.startKey.y;
        this.col = "lightgray";
    }

    draw(c){
        c.save();
        c.fillStyle = this.col;
        c.fillRect((this.startKey.x + this.startKey.w) - this.w/2, this.startKey.y, this.w, this.h/2);
        c.fillStyle = "gray";
        c.fillRect((this.startKey.x + this.startKey.w) - this.w/2, this.startKey.y + this.h/2, this.w, this.h/2);
        c.strokeStyle = "black";
        c.lineWidth = 4;
        c.strokeRect((this.startKey.x + this.startKey.w) - this.w/2, this.startKey.y, this.w, this.h);
        c.restore();
    }

}