
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage,gameoverImage;
var FoodGroup, obstacleGroup;
var survivaltime;
var PLAY = 1;
var END = 0;                 
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover.png")
}



function setup() {
  
  monkey = createSprite(50,315,20,90);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,400,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  survivaltime = 0;
  
  gameover = createSprite(200,150,50,50)
  gameover.addImage("gameover1",gameoverImage);
  gameover.scale = 0.5;
}


function draw() {
  background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount/getFrameRate());
  text("Survival Time : " + survivaltime,120,30);
  
  
  
  console.log(gameState);
  
  
  
  
  if(gameState === PLAY){
    gameover.visible = false;
    
    if(ground.x < 0){
    ground.x = ground.width/2;
  }
    
    if(keyDown("space") && monkey.y >=100){ 
    monkey.velocityY = -10;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
    
    if(FoodGroup.isTouching(monkey)){
       FoodGroup.destroyEach();
       }
    
     food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
       }
     }
    else if(gameState === END){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      monkey.collide(ground);
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.visible = false;
      ground.visible = false;
      gameover.visible = true;
    }    
     
     
  
  
  
  
  
  drawSprites();
  
}

function food(){
  if(frameCount % 80 === 0){
   var banana = createSprite(400,Math.round(random(120,200)),50,20);
   banana.addImage("banana1",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 200;
    FoodGroup.add(banana);
     } 
}

function obstacles(){
  if(frameCount % 100 === 0){
     var obstacle = createSprite(300,306,40,40);
    obstacle.addImage("obstacle1",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime =200;
    obstacleGroup.add(obstacle);
     }
  
}


