class Battle{
    constructor(player, enemyID){
    this.player = player;
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+ enemyID +"/"
    }).done((result)=>{
        this.enemy = result;
        console.log(this.enemy);
        this.enemySprite = new Image();
        this.enemySprite.src  = this.enemy.sprites.front_default;
    })
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/151/"
    }).done((result)=>{
        this.friendly = result;
        console.log(this.enemy);
        this.friendlySprite = new Image();
        this.friendlySprite.src  = this.friendly.sprites.back_default;
    })

        this.friendlySprite = new Image();
        this.friendlySprite.src  = "this.friendly.sprites.back_default";

    }
    draw(context, baseUnit){
        let battleCircleSprite = document.getElementById("battleCircleSprite");
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*6, baseUnit*3, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(battleCircleSprite, 0, 0, battleCircleSprite.width, battleCircleSprite.height, baseUnit*0, baseUnit*6, battleCircleSprite.width, battleCircleSprite.height);
        context.drawImage(this.enemySprite, 0, 0, 96, 96, baseUnit*8, baseUnit*0, 5*64, 5*64);
        context.drawImage(this.friendlySprite, 0, 0, 96, 96, baseUnit*2, baseUnit*3, 5*64, 5*64);


    }


}

export {Battle};