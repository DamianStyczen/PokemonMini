const CHARSHEET = document.getElementById("characterSpritesheet");
const BGSHEET = document.getElementById("backgroundSpritesheet");
const GRASSSHEET = document.getElementById("grassSpritesheet");
const WORLDUNIT = 64;
let red;

if(localStorage.getItem("test")){
    console.log(localStorage.getItem("test"));
}
const board = document.getElementById("board");
const bCtx = board.getContext('2d');
// bCtx.drawImage(CHARSHEET, 64, 0, CHARSIZE, CHARSIZE, 64, 64, CHARSIZE, CHARSIZE);

let boardFields = [
    ["grass","grass", "grass", "grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "bush", "bush", "bush", "bush", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "bush", "bush", "bush", "bush", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "bush", "bush", "bush", "bush", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "bush", "bush", "bush", "bush", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
];
const generateBackground = ()=>{
    for(let i = 0; i < boardFields.length; i++){
        for(let j = 0; j < boardFields[i].length; j++){
            switch(boardFields[i][j]){
                case "grass":
                bCtx.drawImage(GRASSSHEET, 0, 0, 32, 32, WORLDUNIT*j, WORLDUNIT*i, 64, 64);
                break;
                case "bush":
                bCtx.drawImage(BGSHEET, 64, 0, 64, 64, WORLDUNIT*j, WORLDUNIT*i, 64, 64);
                break;
                default:
                bCtx.drawImage(GRASSSHEET, 0, 0, 32, 32, WORLDUNIT*j, WORLDUNIT*i, 64, 64);
                break;
            }
                       
        }

    }
}


const update = ()=>{

    bCtx.clearRect(0,0,board.width,board.height);
    generateBackground();
    red.draw();
}

class Character{
    constructor(positionX, positionY, spriteSheet){
        this.width = WORLDUNIT;
        this.height = WORLDUNIT;
        this.positionX = positionX;        
        this.positionY = positionY;
        this.spriteSheet = spriteSheet;
        this.isMoving = false;
        this.direction = "down";
        this.spriteX = 0;
        this.spriteY = 0;
        this.movementSpeed = 4;
        this.nextStep = [this.positionX, this.positionY];
        this.animationFrame = 0;
    }
    draw(){
        this.animationFrame ++;
        if(this.isMoving){            
            this.move();
        }
        bCtx.drawImage(this.spriteSheet, this.spriteX, this.spriteY, this.width, this.width, this.positionX, this.positionY, this.width, this.height);
    }
    rotate(newDirection){
        if(!this.isMoving){
            this.direction = newDirection;
            switch(this.direction){
                case "down":
                    this.spriteY = 0*this.width;
                    break;
                case "left":
                    this.spriteY = 1*this.width;
                    break;
                case "right":
                    this.spriteY = 2*this.width;
                    break;
                case "up":
                    this.spriteY = 3*this.width;
                    break;
            }
        }
    }
    startMoving(){
        if(!this.isMoving){
            this.isMoving = true;
            switch(this.direction){
                case "down":
                    this.nextStep[1] += this.height;
                    break;
                case "left":
                    this.nextStep[0] -= this.width;
                    break;
                case "right":
                    this.nextStep[0] += this.width;
                    break;
                case "up":
                    this.nextStep[1] -= this.height;
                    break;
            }
        }
    }
    move(){
        switch(this.direction){
            case "down":
                this.positionY += this.movementSpeed;
                break;
            case "left":
                this.positionX -= this.movementSpeed;
                break;
            case "right":
                this.positionX += this.movementSpeed;
                break;
            case "up":
                this.positionY -= this.movementSpeed;
                break;
        }
        if(this.positionX == this.nextStep[0] && this.positionY == this.nextStep[1]){
            this.isMoving = false;
            console.log("Stepped on: ", boardFields[this.positionY/WORLDUNIT][this.positionX/WORLDUNIT]);
            localStorage.setItem("positionX", this.positionX);
            localStorage.setItem("positionY", this.positionY);
            localStorage.setItem("direction", this.direction);
        }
    }

}
// console.log(localStorage.getItem("positionX"));
// if(localStorage.getItem("positionX") != null){ 
//     console.log("its not null");
//     red = new Character(localStorage.getItem("positionX"), localStorage.getItem("positionY"), CHARSHEET);
//     red.direction = localStorage.getItem("direction");
// }
// else{
    red = new Character(7*WORLDUNIT, 4*WORLDUNIT, CHARSHEET);
// }
window.addEventListener('keydown', function(event){
    switch(event.which){
        case 37:
        red.rotate("left");
        red.startMoving();
        break;
        case 39:
        red.rotate("right");
        red.startMoving();
        break;
        case 38:
        red.rotate("up");
        red.startMoving();
        break;
        case 40:
        red.rotate("down");
        red.startMoving();
        break;
    }
    
});

let gameInterval = setInterval(()=>{
    update();
}, 33.33);