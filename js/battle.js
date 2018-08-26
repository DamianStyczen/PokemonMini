class Battle{
    constructor(player, enemy){
    this.player = player;
    this.enemy = enemy;
    //this.getPokemonInfo();
    }
    draw(context, baseUnit){
        let pokemonid = 1;
        let pokemonSprite = document.getElementById("pokemonSpritesheet");
        let battleCircleSprite = document.getElementById("battleCircleSprite");
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*6, baseUnit*3, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*0, baseUnit*6, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(pokemonSprite, 0, 0, 64, 64, baseUnit*7, baseUnit*0, 5*64, 5*64);


    }
    getPokemonInfo(){
        $.ajax({
            url: "http://pokeapi.salestock.net/api/v2/pokemon/1"
        }).done((result)=>{
            this.enemy = result;
            console.log(this.enemy);
        })
    }

}

export {Battle};