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
        this.boardFields = boardFields;
        this.encountered = false;
        this.CHARSHEET = document.getElementById("characterSpritesheet");

    }
    draw(context){
        if(this.isMoving){
            this.move();
        }
        context.drawImage(this.CHARSHEET, this.spriteX, this.spriteY, this.width, this.width, this.positionX, this.positionY, this.width, this.height);
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
            let nSX = this.nextStep[0];
            let nSY = this.nextStep[1];
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

            if(!this.boardFields[this.nextStep[1]/this.WORLDUNIT] || !this.boardFields[this.nextStep[1]/this.WORLDUNIT][this.nextStep[0]/this.WORLDUNIT]){

                console.log("Ground undefined. Can't move.");
                this.isMoving = false;
                this.nextStep[0] = nSX;
                this.nextStep[1] = nSY;
            }
            else if (this.boardFields[this.nextStep[1]/this.WORLDUNIT][this.nextStep[0]/this.WORLDUNIT] == "oak"){
                console.log("Can't walk over doctor Oak.");
                this.isMoving = false;
                this.nextStep[0] = nSX;
                this.nextStep[1] = nSY;
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
            this.checkForEncounter(this.boardFields[this.positionY/this.WORLDUNIT][this.positionX/this.WORLDUNIT]);
        }
    }
    checkForEncounter(ground){
        if(ground == "bush"){
            let dice = Math.random();
            if(dice > 0.8){
                this.encountered = true;
            }
        }
    }
    handleKeyPress(which){
        switch(which){
            case 37:
            this.rotate("left");
            this.startMoving();
            break;
            case 39:
            this.rotate("right");
            this.startMoving();
            break;
            case 38:
            this.rotate("up");
            this.startMoving();
            break;
            case 40:
            this.rotate("down");
            this.startMoving();
            break;
        }
    }
    checkForInteraction(){
        let xPos = this.positionX;
        let yPos = this.positionY;
        switch(this.direction){
            case "down":
                yPos += this.height;
                break;
            case "left":
                xPos -= this.width;
                break;
            case "right":
                xPos += this.width;
                break;
            case "up":
                yPos -= this.height;
                break;
        }
        let object = this.boardFields[yPos/this.WORLDUNIT][xPos/this.WORLDUNIT];
        console.log("Trying to interact with: ", object);
        return object;
    }

}


export {Character};