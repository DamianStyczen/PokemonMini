import { UserInterface } from "./userInterface";

class Oak{
    constructor(player, context){
        this.player = player;
        this.ui = new UserInterface(context);
        this.messages = [`Hello ${this.player.name}! How can I help you?`, "Your pokemon have been healed.", "You have bought a pokeball."];
        this.stage = "hello";
        this.context = context;
        this.over = false;
        this.currentChoice = 0;
    }
    draw(){
        switch(this.stage){
            case "hello":
            this.context.textAlign = "left";
            this.ui.drawDefault();
            this.ui.drawMessage(this.messages[0], true);
            this.drawOakOptions();
            this.drawChosenOption(this.currentChoice);
            break;

            case "healed":
            this.ui.drawDefault();
            this.ui.drawMessage(this.messages[1]);
            break;

            case "bought":
            this.ui.drawDefault();
            this.ui.drawMessage(this.messages[2]);
            break;
        }
    }
    handleKeyPress(which){
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
    drawOakOptions(){

        this.context.fillStyle = "#000";
        this.context.fillRect(480, 440, 480, 200);
        this.context.fillStyle = "#FFF";
        this.context.fillRect(490, 450, 460, 180);



        this.context.fillStyle = "#000";
        this.context.fillText("HEAL POKEMON",550, 510);
        this.context.fillText("BUY POKEBALL",550, 600);

    }
    drawChosenOption(index){
        if(index == 0){
            this.context.fillRect(520, 485, 20, 20);
        }
        else{
            this.context.fillRect(520, 575, 20, 20);
        }
    }
    acceptChoice(index){
        switch(this.stage){
            case "hello":
            if(index == 0){
                this.player.pokemon.forEach(element => element.currentHP = element.stats.find(stat => {return stat.name == "hp"}).value);
                this.stage = "healed";
            }
            else if(index == 1){
                this.player.pokeballs += 1;
                this.stage = "bought";
            }
            break;
            case "healed":
            case "bought":
            this.over = true;
            break;
        }
    }
}
export {Oak};