class Board{
    constructor(boardFields, baseUnit){
        this.boardFields = boardFields;
        this.BGSHEET = document.getElementById("backgroundSpritesheet");
        this.GRASSSHEET = document.getElementById("grassSpritesheet");
        this.WORLDUNIT = baseUnit;
    }
    generateBackground(context){
        for(let i = 0; i < this.boardFields.length; i++){
            for(let j = 0; j < this.boardFields[i].length; j++){
                switch(this.boardFields[i][j]){
                    case "grass":
                    context.drawImage(this.GRASSSHEET, 0, 0, 32, 32, this.WORLDUNIT*j, this.WORLDUNIT*i, 64, 64);
                    break;
                    case "bush":
                    context.drawImage(this.BGSHEET, 64, 0, 64, 64, this.WORLDUNIT*j, this.WORLDUNIT*i, 64, 64);
                    break;
                    default:
                    context.drawImage(this.GRASSSHEET, 0, 0, 32, 32, this.WORLDUNIT*j, this.WORLDUNIT*i, 64, 64);
                    break;
                }

            }

        }
    }
}

export {Board};