import {UserInterface} from "./userInterface";

class Battle{
    constructor(player, enemyID, context){
    this.player = player;
    this.stage = "options";
    this.stages = ["start", "options"]
    this.currentChoice = 0;
    this.UI = new UserInterface(context);
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
            case 90: // Z
            this.acceptChoice();
            break;
        }
    
    }));
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+ enemyID +"/"
    }).done((result)=>{
        this.enemy = result;
        console.log(this.enemy);
        this.enemySprite = new Image();
        this.enemySprite.src  = this.enemy.sprites.front_default;
    })
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/2/"
    }).done((result)=>{
        this.friendly = result;
        console.log(this.enemy);
        this.friendlySprite = new Image();
        this.friendlySprite.src  = this.friendly.sprites.back_default;
    })

    }
    draw(context, baseUnit){
        let battleCircleSprite = document.getElementById("battleCircleSprite");
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*6, baseUnit*3, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*0, baseUnit*6, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(this.enemySprite, 0, 0, 96, 96, baseUnit*8, baseUnit*0, 5*64, 5*64);
        context.drawImage(this.friendlySprite, 0, 0, 96, 96, baseUnit*2, baseUnit*3, 5*64, 5*64);


        // ENEMY STATS WINDOW
        context.fillStyle = "#FFF";
        context.fillRect(50, 50, 400, 120);
        context.fillStyle = "#000";
        context.font = "40px Arial";
        context.fillText(this.enemy.name, 80, 100);
        context.font = "30px Arial";
        context.fillText("HP", 150, 150);
        context.fillStyle = "#000";
        context.fillRect(200, 110, 200, 30);
        context.fillStyle = "#33cc33";
        context.fillRect(205, 115, 190, 20);

        // FRIENDLY STATS WINDOW

        context.fillStyle = "#FFF";
        context.fillRect(480, 320, 400, 120);
        context.fillStyle = "#000";
        context.font = "40px Arial";
        context.fillText(this.friendly.name, 510, 360);
        context.font = "30px Arial";
        context.fillText("HP", 580, 420);
        context.fillStyle = "#000";
        context.fillRect(630, 400, 200, 30);
        context.fillStyle = "#33cc33";
        context.fillRect(635, 405, 190, 20);

        this.UI.drawDefault();

        switch(this.stage){

            case "start":
                this.UI.drawMessage(`Wild ${this.enemy.name} appeared!`);
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
            case "options":
            this.acceptOptionsChoice();
            break;
            case "options-fight":
            this.acceptFightChoice();
            break;
        }
    }
    goBack(){

    }
    acceptOptionsChoice(){
        switch(this.currentChoice){
            case 0:
            this.stage = "options-fight";
            break;
        }
    }

}

export {Battle};