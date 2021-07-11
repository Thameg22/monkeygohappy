var PLAY = 1; 
var END = 0;
var gameState = PLAY; 


var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime=0;
var survivalTime=Math.ceil(frameCount/frameRATE());

function preload(){
  
 
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

 
}



function setup() {
  createCanvas (700,450)
  
  
  
  monkey = createSprite (100,400, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  

 
  
  ground = createSprite(100,420,700,50);
  ground.x = ground.width /2;
ground.shapeColor="brown"
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  
  score = 0;
  
 

 
  
}
function draw() {
  background("lightgreen");
  
    
  
  if (ground.x < 0){
     ground.x = ground.width/2;
   }
   spawnObstacles();
   spawnBanana();
   if(gameState === PLAY){
    
    if(keyDown("space") && monkey.y >= 325) {
      monkey.velocityY = -13;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
 if(obstacleGroup.isTouching(monkey)){
  gameState === END;
  score=0
}

   if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
   score=score+1;
 }
 else if (gameState === END){
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  fill("black")
 textSize(20)
 text("G A M E  O V E R",350,225)
 if(keyDown("r") ) {
  gameState === PLAY;
}
  
 
 }
   }
//this is not code just for fun an to mark the halfway point
 switch(score) {
   case 10: monkey.scale = 0.22;
             break;
  case 20: monkey.scale = 0.24;
             break;
 case 30: monkey.scale = 0.26;
             break;
 case 40: monkey.scale = 0.28;
             break;
 }


 


  
 

 monkey.collide(ground); 



 
 
 
 
drawSprites();
 
 fill("white")
text("Score: "+ score, 500,50);
stroke("black")
textSize(20)
fill("black")

text("Survival Time:"+ survivalTime,200,50);


}



function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,370,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
     obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
  
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}


