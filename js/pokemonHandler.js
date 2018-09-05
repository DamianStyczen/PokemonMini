class PokemonHandler{
    tryToCatch(player, pokemon){
        let hpPercentage = pokemon.currentHP / pokemon.stats.find(element => {return element.name == "hp"}).value;
        let chance = 1 - hpPercentage;
        console.log("Trying to catch pokemon with " + hpPercentage*100 + "% hp.");
        let dice = Math.random();
        console.log("Dice: ", dice);
        if(dice < chance){
            console.log("Pokemon caught.");
            if(player.pokemon.length >= 6){
                player.collection.push(pokemon);
                return true;
            }
            else{
                player.pokemon.push(pokemon);
            }
            return true;
        }
        else{
            console.log("Failed to catch.");
            return false;
        }
    }
}

export {PokemonHandler};