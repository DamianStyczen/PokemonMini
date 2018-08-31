import {UserInterface} from "./userInterface";
import {Pokemon} from "./pokemon";

class Battle{
    constructor(playerID, enemyID, context){
    // this.player = player;
    this.stage = "loading";
    this.currentChoice = 0;
    this.UI = new UserInterface(context);

    this.enemy = new Pokemon(enemyID, 1);
    this.friendly = new Pokemon(playerID, 1);


    window.addEventListener('keyup', (()=>{
        event.preventDefault();
        switch(event.which){
            case 37: // LEFT
            this.currentChoice -= 1;
            if(this.currentChoice < 0){
                this.currentChoice = 4 + this.currentChoice;
            }
            break;
            case 39: // RIGHT
            this.currentChoice += 1;
            if(this.currentChoice > 3){
                this.currentChoice = this.currentChoice - 4;
            }
            break;
            case 38: // UP
            this.currentChoice -= 2;
            if(this.currentChoice < 0){
                this.currentChoice = 4 + this.currentChoice;
            }
            break;
            case 40: // DOWN
            this.currentChoice += 2;
            if(this.currentChoice > 3){
                this.currentChoice = this.currentChoice - 4;
            }
            break;
            case 90: // Z
            this.acceptChoice();
            break;
            case 90: // X
            this.goBack();
            break;
        }

    }));
    }
    draw(context, baseUnit){
        this.UI.drawBattleCircles(baseUnit);

        if(this.stage != "loading"){
            context.drawImage(this.friendly.spriteBack, 0, 0, 96, 96, baseUnit*2, baseUnit*3, 5*64, 5*64);
            context.drawImage(this.enemy.spriteFront, 0, 0, 96, 96, baseUnit*8, baseUnit*0, 5*64, 5*64);

            this.UI.drawEnemyStatsWindow(this.enemy);
            this.UI.drawFriendlyStatsWindow(this.friendly);
        }

        this.UI.drawDefault();

        switch(this.stage){
            case "loading":
            this.UI.drawMessage("Loading...");
            if(this.enemy.loaded && this.friendly.loaded){
                console.log(this.friendly, this.enemy);
                this.stage = "start";
            }
            break;
            case "start":
                this.UI.drawMessage(`Wild ${this.enemy.name.toUpperCase()} appeared!`);
                break;

            case "options":
                this.UI.drawMessage(`What will ${this.friendly.name.toUpperCase()} do?`);
                this.UI.drawOptionsMenu(this.stage);
                this.UI.drawChosenOption(this.currentChoice, this.stage);
                break;
            case "options-fight":
                this.UI.drawOptionsMenu(this.stage);
                this.UI.drawChosenOption(this.currentChoice, this.stage);
                break;
        }
    }
    acceptChoice(){
        switch(this.stage){
            case "start":
            this.stage = "options";
            break;
            case "options":
            this.acceptOptionsChoice();
            break;
            case "options-fight":
            this.acceptFightChoice();
            break;

        }
    }
    goBack(){
        switch(this.stage){
            case "options-fight":
             this.stage = "options";
            break;
        }
    }
    acceptOptionsChoice(){
        switch(this.currentChoice){
            case 0:
            this.stage = "options-fight";
            break;
        }
    }
    acceptFightChoice(){
        this.stage = "fight";
    }

}

export {Battle};