//RUNNER//
// written around 2015-16
lightIsRed = false;

function run(){
    document.getElementById("press").style.display = "none";
    var ctx = document.getElementById("canvas").getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    simulator = createCars(ctx);
    simulator.startRendering();
}

function start(){
    var rock = new Audio("music/rock.mp3");
    rock.play();
    document.getElementById("number").innerHTML = 5;
    setTimeout(function(){document.getElementById("number").innerHTML = 4;}, 1250);
    setTimeout(function(){document.getElementById("number").innerHTML = 3;}, 2500);
    setTimeout(function(){document.getElementById("number").innerHTML = 2;}, 3650);
    setTimeout(function(){document.getElementById("number").innerHTML = 1;}, 4600);
    setTimeout(function(){document.getElementById("number").style.display = "none"; run();}, 5500);
    start = function(){};
}

function createCars(ctx){
    let cars = [];
    for(let i = 0; i < 200; i++){
        let speed = (Math.random() * 30) - 15;
        let pos;
        if(speed > 0)
            pos = (Math.random() * 5000) - 5200;
        else
            pos = ((Math.random() * 5000) - 5200) * -1;
        cars[i] = new Car(pos, Math.random() * 500, speed);
    }
    let lights = new Lights();
    cars[200] = lights;
    return new Simulator(ctx, cars);
}

function randomRgb() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

class Lights {
    constructor(){
        this.isRed = false;
    }

    red(ctx){
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(300, 0, 10, 1000);
        this.isRed = true;
        lightIsRed = true;
    }

    green(ctx){
        ctx.fillStyle = "rgb(0, 200, 0)";
        ctx.fillRect(300, 0, 10, 1000);
        this.isRed = false;
        lightIsRed = false;
    }

    render(ctx){
        if(this.isRed)
            ctx.fillStyle = "rgb(100, 0, 0)";
        else
            ctx.fillStyle = "rgb(0, 100, 0)";
        ctx.fillRect(300, 0, 10, 1000);
    }

    changePos(ctx){
        let now = (new Date().getTime()) / 3000;
        if(Math.round(now % 2) == 0){
            this.red(ctx);
        }else{
            this.green(ctx);
        }
    }
}

class Simulator {
    constructor(ctx, objects){
        this.ctx = ctx;
        this.objects = objects;
    }

    startRendering(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        for( let car of this.objects ){
            car.render(this.ctx);
            car.changePos(this.ctx);
        }
        requestAnimationFrame(this.startRendering.bind(this));
    }
}

class Car {
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = randomRgb();
    }

    //RENDERER//

    render(ctx){    
        //body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 50);
        //1st wheel
        ctx.fillStyle = "rgb(255, 100, 0)";
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 50, 15, 0, 2 * Math.PI);
        ctx.fill();
        //2nd wheel
        ctx.fillStyle = "rgb(255, 100, 0)";
        ctx.beginPath();
        ctx.arc(this.x + 75, this.y + 50, 15, 0, 2 * Math.PI);
        ctx.fill();
    }

    //CHANGER//

    changePos(ctx){
        if(!lightIsRed || this.x < 200 || this.x > 300){
            this.x += this.speed;
        }
        if(this.x > 5000 && this.speed > 0){
            this.x = -200;
        }
        if(this.x < -5000 && this.speed < 0){
            this.x = 2000;
        }
    }
}
