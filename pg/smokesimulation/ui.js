class Button{
    constructor(x, y, w, h, text){
        this.x = x; this.y = y;
        this.w = w; this.h = h;
        this.text = text;
        this.elem = document.createElement("button");
        this.elem.style.left = "calc(" + (this.x * 100) + "% - " + (this.w / 2) + "px)";
        this.elem.style.top = "calc(" + (this.y * 100) + "% - " + (this.h / 2) + "px)";
        this.elem.style.width = this.w + "px";
        this.elem.style.height = this.h + "px";
        this.elem.style.position = "absolute";
        this.first = true;
        this.count = 0; 
        this.elem.innerHTML = this.text;
        this.elem.onclick = () =>{
            this.count++;
            this.first = false;
            this.onclick();
        }
        this.elem.classList.add("button1");
    }

    show(){
        this.elem.style.display = "block";
    }

    hide(){
        this.elem.style.display = "none";
    }

    onclick(){}

    append(parent){
        parent.appendChild(this.elem);
    }
}


class TextField{
    constructor(x, y, w, h, text){
        this.x = x; this.y = y;
        this.text = text;
        this.w = w; this.h =h;
        this.elem = document.createElement("div");
        this.elem.style.background = "transparent";
        this.elem.style.border = "2px solid blue";
        this.field = document.createElement("input");
        this.field.type = "number";
        this.field.style.position = "relative";
        this.field2 = document.createElement("input");
        this.field2.type = "number";
        this.field2.style.position = "relative";
        this.field3 = document.createElement("input");
        this.field3.type = "number";
        this.field3.style.position = "relative";
        this.heading = document.createElement("h3");
        this.heading.style.color = "pink"
        this.heading.style.position = "relative";
        this.heading.innerHTML = this.text;
        this.heading2 = document.createElement("h3");
        this.heading2.style.color = "pink"
        this.heading2.style.position = "relative";
        this.heading2.innerHTML = this.text;
        this.heading3 = document.createElement("h3");
        this.heading3.style.color = "pink"
        this.heading3.style.position = "relative";
        this.heading3.innerHTML = this.text;
        this.elem.style.left = "calc(" + (this.x * 100) + "% - " + (this.w / 2) + "px)";
        this.elem.style.top = "calc(" + (this.y * 100) + "% - " + (this.h / 2) + "px)";
        this.elem.style.width = this.w + "px";
        this.elem.style.height = this.h + "px";
        this.elem.style.overflow = "hidden";
        this.elem.style.position = "absolute";
        this.addBtn = document.createElement("button");
        this.addBtn.style.margin = "10px";
        this.addBtn.innerHTML = "ADD";
        this.elem.appendChild(this.heading);
        this.elem.appendChild(this.field);
        this.elem.appendChild(this.heading2);
        this.elem.appendChild(this.field2);
        this.elem.appendChild(this.heading3);
        this.elem.appendChild(this.field3);
        this.elem.appendChild(this.addBtn);
        this.first = true;
        this.count = 0; 
        this.elem.onclick = () =>{
            this.count++;
            this.first = false;
            this.onclick();
        }
        this.elem.classList.add("textfield1");
    }

    show(){
        this.elem.style.display = "block";
    }

    hide(){
        this.elem.style.display = "none";
    }

    onclick(){}

    append(parent){
        parent.appendChild(this.elem);
    }
}


class Range{
    constructor(x, y, w, h, min, max, text){
        this.x = x; this.y = y;
        this.text = text;
        this.w = w; this.h =h;
        this.elem = document.createElement("div");
        this.range = document.createElement("input");
        this.heading = document.createElement("h3");
        this.heading.innerHTML = this.text;
        this.elem.style.background = "transparent";
        this.elem.style.border = "2px solid blue";
        this.range.type = "range";
        this.range.step = "0.01";
        this.heading.style.color = "pink";
        this.range.min = min;
        this.range.max = max;
        this.range.value = 1;
        this.elem.style.left = "calc(" + (this.x * 100) + "% - " + (this.w / 2) + "px)";
        this.elem.style.top = "calc(" + (this.y * 100) + "% - " + (this.h / 2) + "px)";
        this.elem.style.width = this.w + "px";
        this.elem.style.height = this.h + "px";
        this.elem.style.overflow = "hidden";
        this.elem.style.position = "absolute";
        this.range.style.position = "relative";
        this.heading.style.position = "relative";
        this.elem.appendChild(this.heading);
        this.elem.appendChild(this.range);
        this.first = true;
        this.count = 0; 
        this.elem.onclick = () =>{
            this.count++;
            this.first = false;
            this.onclick();
        }
        this.elem.classList.add("range1");
    }

    show(){
        this.elem.style.display = "block";
    }

    hide(){
        this.elem.style.display = "none";
    }

    onclick(){}

    append(parent){
        parent.appendChild(this.elem);
    }
}

class Menu{
    constructor(buttons, pause, x = 0.9, y = 0.2, t = "⚙️"){
        this.buttons = buttons;
        this.x = x;
        this.y = y;
        this.pause = pause;
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.style.width = "100%";
        this.div.style.height = "100%";
        this.div.style.left = "0";
        this.div.style.top = "0";
        this.div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.div.style.backdropFilter = "blur(1.7px)";
        for(let i = 0; i < this.buttons.length; i++){
            this.div.appendChild(this.buttons[i].elem);
        }
        this.p = new Button(x, y, 50, 50, t);
        this.p.elem.style.background = "purple";
        this.p.elem.style.fontSize = "20px";
        this.p.elem.style.outline = "none";
        this.p.hide();
        this.p.onclick = () =>{
            this.show();
            this.p.hide();
        }
    }
    show(){
        this.div.style.display = "block";
    }

    hide(){
        this.div.style.display = "none";
        if(this.pause){
            this.p.show();
        }
    }


    addTo(parent){
        parent.appendChild(this.div);
        parent.appendChild(this.p.elem);
    }
}