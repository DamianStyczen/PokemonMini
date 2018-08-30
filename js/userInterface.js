class UserInterface{

    constructor(context){
        this.context = context;
        this.menuOptions = [
            {text: "FIGHT", left: 550, top: 510},
            {text: "BAG", left: 820, top: 510},
            {text: "POKeMON", left: 550, top: 600},
            {text: "RUN", left: 820, top: 600},
        ];
        this.fightOptions = [
            {text: "MOVE1", left: 70, top: 510},
            {text: "MOVE2", left: 400, top: 510},
            {text: "MOVE3", left: 70, top: 600},
            {text: "MOVE4", left: 400, top: 600},
        ];
    }
    drawDefault(){
        this.context.fillStyle = "#3a4e70";
        this.context.fillRect(0, 440, 960, 200);
        this.context.fillStyle = "#FFF";
        this.context.font = "40px Arial";
    }
    drawBattleCircles(baseUnit){
        let battleCircleSprite = document.getElementById("battleCircleSprite");
        this.context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*6, baseUnit*3, battleCircleSprite.width, battleCircleSprite.height);
        this.context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*0, baseUnit*6, battleCircleSprite.width, battleCircleSprite.height);
        
    }
    drawEnemyStatsWindow(enemy){
        if(enemy != undefined){
            const maxHP = enemy.stats.find(element => {return element.name == "hp"}).value;  
            const healthbarMaxWidth = 190;
            let healthbarCurrentWidth = (enemy.currentHP/maxHP) * healthbarMaxWidth;
            this.context.fillStyle = "#FFF";
            this.context.fillRect(50, 50, 400, 120);
            this.context.fillStyle = "#000";
            this.context.font = "40px Arial";
            this.context.fillText(enemy.name.toUpperCase(), 80, 100);
            this.context.font = "30px Arial";
            this.context.fillText("HP", 150, 135);
            this.context.fillStyle = "#000";
            this.context.fillRect(200, 110, 200, 30);
            this.context.fillStyle = "#33cc33";
            this.context.fillRect(205, 115, healthbarCurrentWidth, 20);
        }
    }
    drawFriendlyStatsWindow(friendly){
        if(friendly != undefined){
            const maxHP = friendly.stats.find(element => {return element.name == "hp"}).value;  
            const healthbarMaxWidth = 190;
            let healthbarCurrentWidth = (friendly.currentHP/maxHP) * healthbarMaxWidth;
            this.context.fillStyle = "#FFF";
            this.context.fillRect(480, 320, 400, 120);
            this.context.fillStyle = "#000";
            this.context.font = "40px Arial";
            this.context.fillText(friendly.name.toUpperCase(), 510, 360);
            this.context.font = "30px Arial";
            this.context.fillText("HP", 580, 425);
            this.context.fillStyle = "#000";
            this.context.fillRect(630, 400, 200, 30);
            this.context.fillStyle = "#33cc33";
            this.context.fillRect(635, 405, healthbarCurrentWidth, 20);
            

        }
    }
    drawMessage(string){
        if(string.length > 25){
            let cutIndex = string.indexOf(" ", 20);
            this.context.fillText(string.substr(0, cutIndex),20, 510);
            this.context.fillText(string.substr(cutIndex+1, string.length-1),20, 600);
        }
        else{
            this.context.fillText(string,20, 510);
        }
    }
    drawOptionsMenu(stage){
        let optionsArray;
        switch(stage){
            case "options":
                optionsArray = this.menuOptions;
                this.context.fillStyle = "#000";
                this.context.fillRect(480, 440, 480, 200);
                this.context.fillStyle = "#FFF";
                this.context.fillRect(490, 450, 460, 180);
            break;
            case "options-fight":
                optionsArray = this.fightOptions;
                this.context.fillStyle = "#000";
                this.context.fillRect(0, 440, 580, 200);
                this.context.fillStyle = "#FFF";
                this.context.fillRect(10, 450, 560, 180);
                this.context.fillStyle = "#000";
                break;
        }

        this.context.fillStyle = "#000";
        this.context.fillText(optionsArray[0].text,optionsArray[0].left, optionsArray[0].top);
        this.context.fillText(optionsArray[1].text,optionsArray[1].left, optionsArray[1].top);
        this.context.fillText(optionsArray[2].text,optionsArray[2].left, optionsArray[2].top);
        this.context.fillText(optionsArray[3].text,optionsArray[3].left, optionsArray[3].top);
    }
    drawChosenOption(number, stage){
        let optionsArray;
        switch(stage){
            case "options":
            optionsArray = this.menuOptions;
            break;
            case "options-fight":
            optionsArray = this.fightOptions;
            break;
        }
        this.context.fillRect(optionsArray[number].left - 40, optionsArray[number].top - 25, 20, 20);
    }
}

export {UserInterface};