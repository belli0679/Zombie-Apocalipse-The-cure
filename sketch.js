var backGround, theEnd;
var rick, rickImg, shootRick;
var zombie, zombieImg, zombieGroup;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var tiroSound, perdeuSound, ganhouSound;
var life = 3;
var bullets = 20;
var bullet, bulletGroup;
var gameState = "playing";
var score = 0;

function preload(){
    backGround = loadImage("./assets/bg.jpeg");

    theEnd = loadImage("./assets/casa.png");

    rickImg = loadAnimation("./assets/shooter_2.png", "./assets/shooter_2.png",  "./assets/shooter_2.png", "./assets/shooter_1.png" );
    shootRick = loadImage("./assets/shooter_3.png");

    zombieImg = loadImage("./assets/zombie.png");

    heart1Img = loadImage("./assets/heart_1.png");
    heart2Img = loadImage("./assets/heart_2.png");
    heart3Img = loadImage("./assets/heart_3.png");

    tiroSound = loadSound("./assets/explosion.mp3");
    perdeuSound = loadSound("./assets/lose.mp3");
    ganhouSound = loadSound("./assets/win.mp3");

}

function setup() {
    createCanvas(1280, 933);

    rick = createSprite(240, 630);
    rickImg.frameDelay = 20;
    rick.addAnimation("piscando", rickImg);
    rick.addImage("atirando", shootRick);
    rick.scale = 0.8;

    rick.debug = false;
    rick.setCollider("rectangle", 0, 0, 200, 550);

    zombieGroup = new Group();
    bulletGroup = new Group();

    heart1 = createSprite(1130, 40);
    heart1.addImage("coracao1",heart1Img);
    heart1.scale = 0.4; 
    heart1.visible = false;

    heart2 = createSprite(1090, 40);
    heart2.addImage("coracao2",heart2Img);
    heart2.scale = 0.4; 
    heart2.visible = false;

    heart3 = createSprite(1050, 40);
    heart3.addImage("coracao3",heart3Img);
    heart3.scale = 0.4; 


}

function draw() {
    background("black");
    image(backGround, 0, 0, 1280, 933);
    console.log(mouseX);
    
    drawSprites();

    fill("yellow");
    textSize(25);
    text("Number of bullets: " + bullets, 930, 100);
    text("Score: " + score, 1000, 130);


    if(gameState === "playing"){
        atirar();
        movimente();
        randomZombies();

        if(life === 3){
            heart3.visible = true;
            heart2.visible = false;
            heart1.visible = false;
        }
        if(life === 2){
            heart3.visible = false;
            heart2.visible = true;
            heart1.visible = false;
        }
        if(life === 1){
            heart3.visible = false;
            heart2.visible = false;
            heart1.visible = true;
        }
    
        if(zombieGroup.isTouching(rick)){
            for(var i = 0; i < zombieGroup.length; i++){
                if(zombieGroup[i].isTouching(rick)){
                    zombieGroup[i].destroy();
                   life--;

                }
            }
        }
    
        if(zombieGroup.isTouching(bulletGroup)){
            for(var i = 0; i < bulletGroup.length; i++){
                if(zombieGroup[i].isTouching(bulletGroup)){
                    zombieGroup[i].destroy();
                    bulletGroup.destroyEach();
                    score++;
                }
            }
        }
        
        if(bullets === 0){
            gameState = "noBalas";
            perdeuSound.play();
        }

        if(score === 10){
            gameState = "yesGanhou";
            ganhouSound.play();
        }

        if(life === 0){
            gameState = "noVidas";
            heart1.visible = false;
            perdeuSound.play();
        }
    }
    
    if(gameState === "noBalas"){
        fill("yellow");
        stroke("black");
        strokeWeight(5);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Você é uma decepção, acabaram suas balas.", width/2, height/2);

        zombieGroup.destroyEach();
        rick.destroy();

    }

    if(gameState === "noVidas"){
        fill("yellow");
        stroke("black");
        strokeWeight(5);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Você é uma decepção, e morreu.", width/2, height/2);

        zombieGroup.destroyEach();
        rick.destroy();

    }

    if(gameState === "yesGanhou"){
        image(theEnd, 0, 0, 1280, 933);
        fill("yellow");
        stroke("black");
        strokeWeight(5);
        stroke(20);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Parabéns, você não é uma decepção e salvou o dia e o mundo", width/2, height/2);

        
    
        zombieGroup.destroyEach();

    }

}

function atirar(){
    if(keyWentDown ("space")){
        rick.changeAnimation("atirando");
        rick.scale = 0.9;

        bullet = createSprite(rick.x + 70, rick.y - 75, 20, 10);
        bullet.velocityX = 10;
        bulletGroup.add(bullet);
        bullets--;

        tiroSound.play();
        
    }

    if(keyWentUp ("space")){
        rick.changeAnimation("piscando");
        rick.scale = 0.8;
    }

}

function movimente(){
    if(keyDown ("UP_ARROW") && rick.y >= 360){
        rick.y -= 10;
        
    }

    if(keyDown ("DOWN_ARROW") && rick.y <= 750){
        rick.y += 10;
    }

    if(keyDown ("LEFT_ARROW") && rick.x >= 0){
        rick.x -= 10;
    }

    if(keyDown ("RIGHT_ARROW") && rick.x <= 640){
        rick.x += 10;
    }
}

function randomZombies(){
    if(frameCount % 60 === 0){
        zombie = createSprite(random(1090, 1280), random(360, 750));
        zombie.velocityX = -3-(frameCount / 10);
        zombie.addImage("zumbi", zombieImg);
        zombie.scale = 0.35;
        zombie.debug = false;
        zombie.setCollider("rectangle", 0, 0, 250, 950)

        zombie.lifetime = 450; 
        zombieGroup.add(zombie);

    }

}