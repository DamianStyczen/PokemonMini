import {Pokemon} from "./pokemon";
class Turn{
    constructor (friendly, enemy, choice){
        this.friendly = friendly;
        this.friendlyChoice = choice;
        this.enemy = enemy;
        this.lastModifier = 1;
        this.queque = this.calculateQueque(this.friendly, this.enemy);
        this.choices = this.getChoices();
    }

    calculateQueque(friendly, enemy){
        let friendlySpeed = friendly.stats.find(element => {return element.name == "speed"}).value;
        let enemySpeed = enemy.stats.find(element => {return element.name == "speed"}).value;
        if(friendlySpeed >= enemySpeed){
            return [friendly, enemy];
        }
        else{
            return [enemy, friendly]
        }
    }
    calculateTypeModifier(attackType, defenseTypes){
        console.log("Getting type...");
        let modifier = 1;
        if(attackType == "steel" || attackType == "dark" || attackType == "fairy") attackType = "normal";
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
    calculateDamage(attackingPokemon, defendingPokemon, chosenMove){
        console.log("Chosen move:", chosenMove);
        console.log("Calculate damage", attackingPokemon, defendingPokemon);
        let attack = attackingPokemon.stats.find(element => {return element.name == "attack"}).value;
        let defense = defendingPokemon.stats.find(element => {return element.name == "defense"}).value;
        console.log("Stats fetched or something");
        let damage;
        damage = (2*(attackingPokemon.level)/5 + 2);
        console.log("TUTEJ", chosenMove.details.power);
        damage *= chosenMove.details.power;
        damage *= attack/defense;
        damage = damage/50+2;
        console.log("Get type name: ", chosenMove.details.type.name);
        let modifier = this.calculateTypeModifier(chosenMove.details.type.name, defendingPokemon.types);
        console.log("DMG:", damage, "Modif:", modifier);
        damage = damage * modifier;

        damage = Math.floor(damage);
        console.log("Calculated damage: ", damage);
        return damage;
    }
    getChoices(){
        let resultArray;
        let otherChoice
        if(this.queque[0] == this.friendly){
            otherChoice = Math.floor(Math.random()*this.queque[1].learnedMoves.length);
            resultArray = [this.friendlyChoice, otherChoice];
        }
        else{
            otherChoice = Math.floor(Math.random()*this.queque[0].learnedMoves.length);
            resultArray = [otherChoice, this.friendlyChoice]
        }
        console.log("Friendly's choice number:", this.friendlyChoice);
        console.log("Enemy's choice number:", otherChoice);
        return resultArray;
    }
    getMoveMessage(index){
        return `${this.queque[index].name} uses ${this.queque[index].learnedMoves[this.choices[index]].name}`;
    }
    executeAttack(index){
        let otherIndex;
        if(index == 0) otherIndex = 1;
        else otherIndex = 0;
        console.log("Attacking", this.queque[index], "Defending:", this.queque[otherIndex]);
        this.queque[otherIndex].currentHP -= this.calculateDamage(this.queque[index], this.queque[otherIndex], this.queque[index].learnedMoves[this.choices[index]]);
        if(this.queque[otherIndex].currentHP < 0) this.queque[otherIndex].currentHP = 0;
    }
    getHitMessage(index){
        if(this.lastModifier > 1){
            return (`It's super effective!`);
        }
        else if(this.lastModifier == 0){
            return (`It doesn't do anything...`);
        }
        else if(this.lastModifier < 1){
            return (`It's not very effective...'`);
        }
        else{
            return (`It's normal.'`);
        }
    }
    checkForFainted(){
        let fainted = false;
        this.queque.forEach(element => {
            console.log(element.currentHP);
            if(element.currentHP <= 0){
                if(!fainted){
                    fainted = true;
                }
            }
        });
        return fainted;
    }



}
export {Turn};