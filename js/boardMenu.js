import { UserInterface } from "./userInterface";


class BoardMenu{
    constructor(player, context){
        this.player = player;
        this.context = context;
        this.stage = "menu";
        this.currentChoice = 0;
        this.over = false;
        this.ui = new UserInterface(context);
        this.message = "Error. Something went horribly wrong";
    }

    draw(){
        switch(this.stage){
            case "menu":
            this.context.fillStyle = "#000";
            this.context.fillRect(480, 440, 480, 200);
            this.context.fillStyle = "#FFF";
            this.context.fillRect(490, 450, 460, 180);
            this.context.fillStyle = "#000";
            this.context.textAlign = "left";
            this.context.fillText("YOUR POKEMON",550, 510);
            this.context.fillText("YOUR COLLECTION",550, 600);
            this.drawChosenOption(this.currentChoice);
            break;
            case "pokemon":
            this.ui.drawPokemonMenu(this.player.pokemon, this.currentChoice);
            break;
        }
    }
    drawChosenOption(index){
        if(index == 0){
            this.context.fillRect(520, 485, 20, 20);
        }
        else{
            this.context.fillRect(520, 575, 20, 20);
        }
    }
    handleKeyPress(which){
        if(this.stage == "pokemon"){
            let max = this.player.pokemon.length - 1;
            switch(which){
                case 37: // LEFT
                this.currentChoice -= 1;
                if(this.currentChoice < 0){
                    this.currentChoice = max;
                }
                break;
                case 39: // RIGHT
                this.currentChoice += 1;
                if(this.currentChoice > max){
                    this.currentChoice = 0;
                }
                break;
                case 38: // UP
                this.currentChoice -= 3;
                if(this.currentChoice < 0){
                    this.currentChoice = max;
                }
                break;
                case 40: // DOWN
                this.currentChoice += 3;
                if(this.currentChoice > max){
                    this.currentChoice = 0;
                }
                break;
                case 90: // Z
                this.acceptChoice();
                break;
                case 88: // X
                this.stage = "menu";
                break;
            }


        }
        else {
        switch(which){
            case 38: // UP
            this.currentChoice = 0;
            break;
            case 40: // DOWN
            this.currentChoice = 1;
            break;
            case 90: // Z
            this.acceptChoice(this.currentChoice);
            break;
            case 88: // X
            this.over = true;
            break;
        }
    }
    }
    acceptChoice(index){
        switch(this.stage){
            case "menu":
            if(index == 0) this.stage = "pokemon";
            if(index == 1) this.stage = "collection";
            break;

            case "pokemon":
            let choiceName = this.player.pokemon[this.currentChoice].name;
            this.player.pokemon.sort((prev, curr) => {
                if(prev.name == choiceName){
                    console.log("Found it!", curr.name, choiceName);
                    return -1;
                }
                else if(curr.name == choiceName){
                    console.log("Found it!", curr.name, choiceName);
                    return 1;
                }
            })
            console.log("Your pokemon collection: ",this.player.pokemon);

        }
    }




}

export {BoardMenu};