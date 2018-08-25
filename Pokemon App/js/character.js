class Character{
    constructor(positionX, positionY, baseUnit, boardFields){
        this.width = baseUnit;
        this.height = baseUnit;
        this.WORLDUNIT = baseUnit;
        this.positionX = positionX;
        this.positionY = positionY;
        this.isMoving = false;
        this.direction = "down";
        this.spriteX = 0;
        this.spriteY = 0;
        this.movementSpeed = 4;
        this.nextStep = [this.positionX, this.positionY];
        this.animationFrame = 0;
        this.boardFields = boardFields;
    }
    draw(context){
        const CHARSHEET = document.getElementById("characterSpritesheet");
        this.animationFrame ++;
        if(this.isMoving){
            this.move();
        }
        context.drawImage(CHARSHEET, this.spriteX, this.spriteY, this.width, this.width, this.positionX, this.positionY, this.width, this.height);
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
            console.log("Stepped on: ", this.boardFields[this.positionY/this.WORLDUNIT][this.positionX/this.WORLDUNIT]);
            localStorage.setItem("positionX", this.positionX);
            localStorage.setItem("positionY", this.positionY);
            localStorage.setItem("direction", this.direction);
        }
    }

}

export {Character};