import {UserInterface} from "./userInterface";

class Battle{
    constructor(player, enemyID, context){
    this.player = player;
    this.stage = "options-fight";
    this.currentChoice = "";
    this.UI = new UserInterface(context);
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

        // DEFAULT MENU BACKGROUND AND FONT
        // context.fillStyle = "#3a4e70";
        // context.fillRect(0, 440, 960, 200);
        // context.fillStyle = "#FFF";
        // context.font = "40px Arial";
        this.UI.drawDefault();

        switch(this.stage){

            case "start":
                this.UI.drawMessage(`Wild ${this.enemy.name} appeared!`);
                break;

            case "options":
                this.UI.drawOptionsMenu(this.stage);
                this.UI.drawChosenOption(2, this.stage);
                // context.fillStyle = "#000";
                // context.fillRect(480, 440, 480, 200);
                // context.fillStyle = "#FFF";
                // context.fillRect(490, 450, 460, 180);

                // context.fillText(`What will`,20, 510);
                // context.fillText(`${this.friendly.name} do?`,20, 600);


                // context.fillStyle = "#000";
                // context.fillText(`FIGHT`,550, 510);
                // context.fillText(`POKeMON`,550, 600);
                // context.fillText(`BAG`,820, 510);
                // context.fillText(`RUN`,820, 600);

                // context.fillRect(510, 575, 20, 20);
                break;

            case "options-fight":
                this.UI.drawOptionsMenu(this.stage);
                this.UI.drawChosenOption(3, this.stage);
                // context.fillStyle = "#000";
                // context.fillRect(0, 440, 580, 200);
                // context.fillStyle = "#FFF";
                // context.fillRect(10, 450, 560, 180);
                // context.fillStyle = "#000";
                // context.fillText(`GROWL`,70, 510);
                // context.fillText(`SCRATCH`,70, 600);
                // context.fillText(`EMBER`,400, 510);
                // context.fillText(`RUN`,400, 600);
                // context.fillRect(30, 485, 20, 20);
            break;
        }
    }
}

export {Battle};