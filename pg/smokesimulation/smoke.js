class Force{
    constructor(force, damping = 1){
        this.force = force;
        this.damping = damping;
    }
}

class Particle{
    constructor(vector, params = {}){
        this.vector = () =>{};
        this.backUp = params;
        this._InitVector(vector);
        this.angle = params.angle || 0;
        this.mass = params.mass || 1;
        this.inertia = params.inertia || 1;
        this.opacity = params.opacity || 1;
        this.position = params.position || this.vector(0, 0);
        this.velocity = params.velocity || this.vector(0, 0);
        this.angularVelocity = params.angularVelocity || 0;
        this.forces = params.forces || [];
        this.angularForces = params.angularForces || [];
        this.dead = false;
        this.lifeTime = params.lifeTime || 3;
        this.currentTime = 0;
        this._aWidth = 50;
        this._aHeight = 50;
        this.opacityRate = -params.opacityRate || -0.1;
        this.sizeRate = params.sizeRate || 10;
        this.delay = params.delay || 0;
        this.img = new Image();
        this.img.src = "https://raw.githubusercontent.com/PhyG0/SmokeSimulation/main/smoke.png";
        this.img.onload = () =>{
            this.Init();
        }
    }   

    Init(){
        this.ready = true;
    }

    Reset(info){
        this.dead = false;
        this.currentTime = 0;
        this.opacity = info.opacity || 1;
        this.position = info.position;
        this._aWidth = 100;
        this._aHeight = 100;
        this.angle = 0;
        this.delay = info.delay;
        this.velocity = info.velocity || this.vector(0, 0);
        this.detor = this.vector(0, 0);
        this.angularVelocity = info.angularVelocity || this.vector(0, 0);
    }

    AfterDeath(){
    }

    _InitVector(vec){
        this.vector = vec;
    }

    Update(dt){
        if(this.ready){
        this.currentTime += dt;
        if(!this.dead && this.currentTime >= this.delay){
            this.opacity += this.opacityRate * dt;
            if(this.opacity <= 0){
                this.opacity = 0;
            }
            this._aWidth += this.sizeRate * dt;
            this._aHeight += this.sizeRate * dt;
            this.position = this.position.AddScaled(this.velocity, dt);
            this.angle += this.angularVelocity;
            this.velocity = this.velocity.AddScaled(this.detor, dt);
            this.velocity = this.velocity.Scale(0.96);
            for(let i = 0; i < this.forces.length; i++){
                this.velocity = this.velocity.AddScaled(this.forces[i].force / this.mass, dt); 
                this.forces[i].force = this.forces[i].force.Scale(this.forces[i].damping);
            }
            for(let i = 0; i < this.angularForces.length; i++){
                this.angularVelocity += (this.angularForces[i].force / this.inertia) * dt;
                this.angularForces[i].force *= this.angularForces[i].damping;
            }
        }
        if(this.currentTime >= this.lifeTime + this.delay){
            this.dead = true;
            this.AfterDeath();
        }else{
            this.dead = false;
        }
    }
    }

    Draw(c){
        if(this.ready){
            if(!this.dead && this.currentTime >= this.delay){
                c.save();
                c.fillStyle = "white";
                c.globalAlpha = this.opacity;
                c.translate(this.position.x + this._aWidth/2, this.position.y + this._aHeight/2);
                c.rotate(this.angle);
                //c.fillRect(-this._aWidth/2, -this._aHeight/2, this._aWidth, this._aHeight);
                c.drawImage(this.img, -this._aWidth/2, -this._aHeight/2, this._aWidth, this._aHeight);
                c.globalAlpha = 1;
                c.restore();
            }
        }else{
            c.fillStyle = "white";
            c.font = "25px Verdana";
            c.fillText("Loading Texture...", 0, 700/2);
        }
    }
}

function degToRad(deg) {
    return  deg / 57.2957;
}

class ParticleSystem{
    constructor(params = {}, pg){
        this.particles = [];
        this.count = params.count || 5;
        this.delay = params.delay || 0.3;
        this.range = params.range || [-45, 45];
        this.speedRange = params.speedRange || [100, 150];
        this.position = params.position || pg.Vector(100, 300);
        this.velocity = params.velocity;
        this.detor = params.detor || pg.Vector(0, 0);
        this.angry = params.angry || 0.01;
        this.opacityRate = params.opacityRate || 0.7;
        this.sizeRate = params.sizeRate || 100;
        this.lifeTime = params.lifeTime || 1.5;
        this.Init(this.count);
    }

    Init(n){
        this.particles = [];
        for(let i = 0; i < n; i++){
            let ang = pg.Random(degToRad(this.range[0]), degToRad(this.range[1]));
            let info = {
                position : this.position,
                velocity : this.velocity || pg.Vector(pg.Random(this.speedRange[0], this.speedRange[1]) * Math.cos(ang), pg.Random(this.speedRange[0], this.speedRange[1]) * Math.sin(ang)),
                angularVelocity : this.angry,
                opacityRate : this.opacityRate,
                sizeRate : this.sizeRate,
                lifeTime : this.lifeTime || 2.7,
                delay : i * this.delay,
            }
            this.regenerate = true;
            let p = new Particle(pg.Vector, info);
            p.detor = this.detor;
            p.angle = pg.Random(0, 2 * Math.PI);
            p.AfterDeath = () =>{
                if(this.regenerate){
                    let ang2 = pg.Random(degToRad(this.range[0]), degToRad(this.range[1]));
                    p.dead = false;
                    p.currentTime = 0;
                    p.position = this.position;
                    p.velocity = this.velocity || pg.Vector(pg.Random(this.speedRange[0], this.speedRange[1]) * Math.cos(ang2), pg.Random(this.speedRange[0], this.speedRange[1]) * Math.sin(ang2));
                    p.opacity = 1;
                    p._aWidth = 30;
                    p._aHeight = 30; 
                    p.angularVelocity = this.angry;
                    p.opacityRate = -this.opacityRate;
                    p.sizeRate = this.sizeRate;
                    p.angle = pg.Random(0, 2 * Math.PI);
                }
            };
            this.particles.push(p);
        }
    }

    Update(dt){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].Update(dt);
        }
    }

    Draw(c){
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].Draw(c);
        }
    }

}










