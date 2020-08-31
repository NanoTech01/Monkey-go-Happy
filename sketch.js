var monkey, monkey_running;
var invisibleGround;
var obstacleGroups,obstacle_img;
var bananaGroups,banana_img
var score = 0;
var jungle,jungle_img;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  jungle_img = loadImage("jungle.jpg");
  
  obstacle_img = loadImage("stone.png");
  
  banana_img = loadImage("banana.png");
  
}

function setup() {
  createCanvas(500, 500);
  
  jungle = createSprite(600,200,20,20);
  jungle.addImage(jungle_img);
  jungle.x = jungle.width/2;
  jungle.velocityX = -2;
  
  monkey = createSprite(80,400,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  invisibleGround = createSprite(200,450,400,10);
  invisibleGround.visible = false;
  
  bananaGroups = new Group();
  obstacleGroups = new Group();
  
}

function draw() {
  background(0);
    
  if(keyDown("space") && monkey.y >= 370) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  
  if(monkey.isTouching(bananaGroups))
  {
    score = score + 1;
    bananaGroups.destroyEach();
  }
  
  switch(score)
  {
    case 10: monkey.scale = 0.10;
    break;
    case 20: monkey.scale = 0.19;
    break;
    case 30: monkey.scale = 0.28;
    break;
    case 40: monkey.scale = 0.37;
    break;
    case 50: monkey.scale = 0.46;
    break;
  }
  
  if(monkey.isTouching(obstacleGroups))
  {
    score = 0;
  }
  
  spawnObstacles();
  
  spawnBananas();

  textSize = 40;
  fill("white");
  
  monkey.collide(invisibleGround);
  drawSprites();
  
  text("Score: " + score,100,30);
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(500,120,40,10);
    banana.y = Math.round (random(330,400));
    banana.addImage(banana_img);
    banana.scale = 0.1;
    banana.velocityX = -6;
    
     //assign lifetime to the variable
    banana.lifetime = 83;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroups.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(500,430,10,40);
    obstacle.addImage(obstacle_img);
    obstacle.velocityX = -5;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obstacleGroups.add(obstacle);
  }
}