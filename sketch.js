var backGround;
var rick, rickImg, shootRick;


function preload(){
    backGround = loadImage("./assets/bg.jpeg");
    rickImg = loadAnimation("./assets/shooter_2.png", "./assets/shooter_2.png",  "./assets/shooter_2.png", "./assets/shooter_1.png" );
    shootRick = loadImage("./assets/shooter_3.png");


}

function setup() {
    createCanvas(1280, 933);

    rick = createSprite(240, 630);
    rickImg.frameDelay = 20;
    rick.addAnimation("piscando", rickImg);
    rick.addImage("atirando", shootRick);
    rick.scale = 0.8;


    

}

function draw() {
    background("black");
    image(backGround, 0, 0, 1280, 933);
    console.log(rick.y);
    
    drawSprites();

    atirar();
    movimente();

}

function atirar(){
    if(keyWentDown ("space")){
        rick.changeAnimation("atirando");
        rick.scale = 0.9;
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
}