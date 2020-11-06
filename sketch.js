const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var blockP, friend1,friend2;
var backgroundImg,platform;
var me, slingshot;

var gameState = "onSling";
var bg = "bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    blockP = new Block1(700,320,70,70);
    blockQ = new Block1(920,320,70,70);
    friend1 = new Friends(810, 350);
    blockA = new Block2(810,260,300, PI/2);

    blockX = new Block1(700,240,70,70);
    blockY = new Block1(920,240,70,70);
    friend2 = new Friends(810, 220); 

    blockB =  new Block2(810,180,300, PI/2);

    blockZ = new Block1(810,160,70,70);
    blockC = new Block2(760,120,150, PI/7);
    blockD = new Block2(870,120,150, -PI/7);

    me = new Me(200,50);

    slingshot = new SlingShot(me.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);

    blockP.display();
    blockQ.display();
    ground.display();
    friend1.display();
    friend1.score();
    blockA.display();

    blockX.display();
    blockY.display();
    friend2.display();
    friend2.score();
    blockB.display();

    blockZ.display();
    blockC.display();
    blockD.display();

    me.display();
    platform.display();

    slingshot.display();    
}

function mouseDragged(){
        Matter.Body.setPosition(me.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && me.body.speed<1){
        me.trajectory = [];
        Matter.Body.setPosition(me.body, {x:200 ,y:50});
       slingshot.attach(me.body);
   
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "bg1.png";
    }
    else{
        bg = "bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}
if(keyPressed("s")){
   me.img=(spike.png);
}