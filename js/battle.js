import {UserInterface} from "./userInterface";
import {Pokemon} from "./pokemon";
import {Turn} from "./turn";
import {PokemonHandler} from "./pokemonHandler";

class Battle{
    constructor(player, enemy, context){
    this.stage = "loading";
    this.over = false;
    this.currentChoice = 0;
    this.UI = new UserInterface(context);
    this.player = player;
    this.enemy = enemy;
    this.lastModifier = 1;
    this.errorMessage = "Error. Can't do that.";
    this.friendly = player.pokemon.find((element)=> element.currentHP > 0);
    this.friendly.spriteBack = new Image();
    this.friendly.spriteBack.src = "https://img.pokemondb.net/sprites/black-white/back-normal/"+this.friendly.name+".png";
    this.turn;
    this.pokemonHandler = new PokemonHandler();
    this.caught = false;

    }
    loadFriendly(index){
    this.friendly = this.player.pokemon[index];
    this.friendly.spriteBack = new Image();
    this.friendly.spriteBack.src = "https://img.pokemondb.net/sprites/black-white/back-normal/"+this.friendly.name+".png";
    }
    handleKeyPress(which){
        if(this.stage == "options-pokemon"){
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
                this.goBack();
                break;
            }


        }
        else{
            switch(which){

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
                case 88: // X
                this.goBack();
                break;
            }
        }
    }

    draw(context, baseUnit){
        context.textAlign="left";
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
                this.UI.drawMessage(`What will ${this.friendly.name.toUpperCase()} do?`, true);
                this.UI.drawOptionsMenu(this.stage);
                this.UI.drawChosenOption(this.currentChoice, this.stage);
                break;

                case "options-pokemon":
                this.UI.drawPokemonMenu(this.player.pokemon, this.currentChoice);
                break;
            case "options-fight":
                this.UI.drawOptionsMenu(this.stage, this.friendly.learnedMoves);
                this.UI.drawChosenOption(this.currentChoice, this.stage);
                break;
            case "fight1-name":
                this.UI.drawMessage(this.turn.getMoveMessage(0));
                break;
            case "fight2-name":
                this.UI.drawMessage(this.turn.getMoveMessage(1));
                break;
            case "fight1-attack":
            this.UI.drawMessage(this.turn.getHitMessage(0));
            break;
            case "fight2-attack":
            this.UI.drawMessage(this.turn.getHitMessage(1));
            break;
            case "fainted":
            this.UI.drawMessage("Pokemon has fainted!");
            break;
            case "error":
            this.UI.drawMessage(this.errorMessage);
            break;
            case "catching":
            this.UI.drawMessage("Trying to catch pokemon...   ");
            break;
            case "catching-result":
            if(this.caught){
                this.UI.drawMessage("Success! You have caught a pokemon!");
            }
            else{
                this.UI.drawMessage("It failed!");
            }
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
            this.turn = new Turn(this.friendly, this.enemy, this.currentChoice);
            this.stage = "fight1-name";
            break;
            case "fight1-name":
            this.turn.executeAttack(0);
            this.stage = "fight1-attack";
            break;
            case "fight1-attack":
            if(this.turn.checkForFainted()){
                this.stage = "fainted";
            }
            else this.stage = "fight2-name";
            break;
            case "fight2-name":
            this.turn.executeAttack(1);
            this.stage = "fight2-attack";
            break;
            case "fight2-attack":
            if(this.turn.checkForFainted()){
                this.stage = "fainted";
            }
            else this.stage = "options";
            this.currentChoice = 0;
            break;
            case "fainted":
            if(this.friendly.currentHP <= 0 &&
                this.player.pokemon.reduce((a, b) => {
                return a + b.currentHP;
            }, 0) > 0){

                this.stage = "options-pokemon";
            }
            else this.over = true;
            break;
            case "error":
            this.stage = "options";
            this.errorMessage = "Error. Can't do that.";
            break;
            case "catching":
            this.caught = this.pokemonHandler.tryToCatch(this.player, this.enemy);
            this.stage = "catching-result";
            break;
            case "catching-result":
            if(this.caught){
                this.over = true;
            }
            else{
                this.stage = "options";
            }
            break;
            case "options-pokemon":
                if(this.player.pokemon[this.currentChoice].currentHP > 0){
                    this.loadFriendly(this.currentChoice);
                    this.currentChoice = 0;
                    this.stage = "options";
                }
            break;

        }
    }
    goBack(){
        switch(this.stage){
            case "options-fight":
             this.stage = "options";
            break;

            case "options-pokemon":
             this.stage = "options";
            break;
        }
    }
    acceptOptionsChoice(){
        switch(this.currentChoice){
            case 0:
            this.stage = "options-fight";
            break;

            case 1:
            if(this.player.pokeballs > 0){
                this.player.pokeballs -= 1;
                this.stage = "catching";
            }
            else{
                this.errorMessage = "Not enough pokeballs."
                this.stage = "error";
            }
            break;

            case 2:
            this.stage = "options-pokemon";
            this.currentChoice = 0;
            break;

            case 3:
            this.over = true;
            break;
        }
    }
    acceptFightChoice(){
        console.log("chosen move:", this.friendly.learnedMoves[this.currentChoice].details);
        this.stage = "fight1-name";
    }
    calculateDamage(attackingPokemon, defendingPokemon, chosenMove){
        let attack = attackingPokemon.stats.find(element => {return element.name == "attack"}).value;
        let defense = defendingPokemon.stats.find(element => {return element.name == "defense"}).value;

        let damage;
        damage = (2*(attackingPokemon.level)/5 + 2);
        damage *= chosenMove.power;
        damage *= attack/defense;
        damage = damage/50+2;
        damage = damage * this.calculateTypeModifier(chosenMove.type.name, defendingPokemon.types);
        damage = Math.floor(damage);
        console.log("Calculated damage: ", damage);
        return damage;
    }

    calculateTypeModifier(attackType, defenseTypes){
        let modifier = 1;
        const types = ["bug", "dragon", "electric", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "water"];

        const matrixOfTypes = [
            [1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 2, 2, 1, 1],
            [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0.5, 0.5, 1, 1, 2, 1, 0.5, 0, 1,1, 1, 1, 1, 2],
            [0.5, 1, 1, 1, 1, 0.5, 0, 1, 1, 2, 2, 0.5, 0.5, 2, 1],
            [2, 0.5, 1, 1, 0.5, 1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5],
            [2, 1, 0.5, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1,0.5, 1],
            [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1],
            [0.5, 0.5, 1, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 2],
            [0.5, 1, 2, 1, 2, 0, 1, 0.5, 1, 1, 1, 2, 1, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 2, 2, 0.5, 1, 1, 1, 1, 0.5],
            [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0.5, 1],
            [2, 1, 1, 1, 1, 1, 0.5, 2, 0.5, 1, 1, 0.5, 1, 0.5, 1],
            [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1],
            [2, 1, 1, 0.5, 2, 2, 1, 1, 0.5, 2, 1, 1, 1, 1, 1],
            [1, 0.5, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 1, 2, 0.5]
        ];



            defenseTypes.forEach(element => {

                modifier = modifier * (matrixOfTypes[types.indexOf(attackType)][types.indexOf(element)]);

            })
            if(!modifier){
                console.log("Error. Modifier changed to 1.", "Attack type:", attackType, "Defense types:");
                modifier = 1;
            }
            console.log("Attack type:", attackType, "Defense types:", defenseTypes, "Modifier:", modifier);
            this.lastModifier = modifier;
            return modifier;

    }




}

export {Battle};