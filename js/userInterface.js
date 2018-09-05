class UserInterface{

    constructor(context){
        this.context = context;
        this.menuOptions = [
            {text: "FIGHT", left: 550, top: 510},
            {text: "CATCH", left: 820, top: 510},
            {text: "POKeMON", left: 550, top: 600},
            {text: "RUN", left: 820, top: 600},
        ];
        this.fightOptions = [
            {text: "", left: 70, top: 510},
            {text: "", left: 350, top: 510},
            {text: "", left: 70, top: 600},
            {text: "", left: 350, top: 600},
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
    drawMessage(string, isShort){
        let lineCap = 25;
        if(isShort) lineCap = 15;
        if(string.length > lineCap){
            let cutIndex = string.indexOf(" ", lineCap-5);
            if(cutIndex == -1){
                cutIndex = string.length;
            }
            this.context.fillText(string.substr(0, cutIndex), 20, 510);
            this.context.fillText(string.substr(cutIndex+1, string.length-1),20, 600);
        }
        else{
            this.context.fillText(string,20, 510);
        }
    }
    drawOptionsMenu(stage, array){
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
            this.context.font = "30px Arial";
                optionsArray = this.fightOptions;
                if(array){
                    array.forEach((element, index) => {
                        optionsArray[index].text = element.name.toUpperCase();
                    })
                }

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
    drawPokemonMenu(pokemons, choice){
        const boxWidth = 200;
        const boxHeight = 200;
        const topMargin = 90;
        const margin = 80;
        const rects = [
            {left: margin, top: topMargin, width: boxWidth, height: boxHeight},
            {left: margin*2+boxWidth, top: topMargin, width: boxWidth, height: boxHeight},
            {left: margin*3+boxWidth*2, top: topMargin, width: boxWidth, height: boxHeight},
            {left: margin, top: topMargin*2+boxHeight, width: boxWidth, height: boxHeight},
            {left: margin*2+boxWidth, top: topMargin*2+boxHeight, width: boxWidth, height: boxHeight},
            {left: margin*3+boxWidth*2, top: topMargin*2+boxHeight, width: boxWidth, height: boxHeight},
        ]
        this.context.fillStyle = "#eaecef";
        this.context.fillRect(0, 0, 960, 640);
        this.context.fillStyle = "#000";


        this.context.fillRect(rects[choice].left-5, rects[choice].top-5, rects[choice].width+10, rects[choice].height+10);
        pokemons.forEach((element, i) => {
            let image = new Image();
            image.src = "https://img.pokemondb.net/sprites/black-white/normal/"+ element.name +".png"
            this.context.fillStyle = "#fff";
            this.context.fillRect(rects[i].left, rects[i].top, rects[i].width, rects[i].height)
            this.context.font = "28px Arial";
            this.context.textAlign="center";
            this.context.fillStyle = "#000";
            this.context.fillText("CHOOSE YOUR POKEMON",  960/2, topMargin/2);

            this.context.fillText(element.name.toUpperCase(), rects[i].left + rects[i].width/2, rects[i].top+30);
            if(element.currentHP > 0){
                this.context.drawImage(image, 0, 0, image.width, image.height, rects[i].left, rects[i].top + 30, boxWidth, boxWidth);
            }
            else{
                this.context.fillStyle = "#FF0000";
                this.context.fillText("FAINTED",  rects[i].left + boxWidth/2, rects[i].top + boxHeight*3/5);
            }

        })


    }



}

export {UserInterface};