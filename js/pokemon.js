class Pokemon{

    constructor(id, level){
        this.id = id;
        this.name;
        this.level = level;
        this.spriteFront = new Image();
        this.spriteFront.src = "https://img.pokemondb.net/sprites/black-white/normal/"+this.name+".png";
        this.spriteBack = new Image();
        this.spriteBack.src = "https://img.pokemondb.net/sprites/black-white/back-normal/"+this.name+".png";
        this.stats = [];
        this.allMoves = [];
        this.learnedMoves = [];
        this.loaded = false;
        this.currentHP = 0;
        this.APIurl = "http://pokeapi.salestock.net/api/v2/";
        //this.APIurl = "https://pokeapi.co/api/v2/" // POKEAPI.CO

        fetch( this.APIurl + "pokemon/"+ this.id +"/").then(data => data.json()).then((result) =>{
            this.name = result.name;
            //this.spriteFront.src = result.sprites.front_default; //POKEAPI.CO
            // this.spriteFront.src = "https://img.pokemondb.net/sprites/black-white/normal/"+this.name+".png";
            // this.spriteBack.src = result.sprites.back_default; // POKEAPI.CO
            // this.spriteBack.src = "https://img.pokemondb.net/sprites/black-white/back-normal/"+this.name+".png";
            result.stats.forEach((element)=>{
                this.stats.push({name: element.stat.name, value: element.base_stat});
            });
            this.loaded = true;
            this.currentHP = this.stats.find(element => {return element.name == "hp"}).value;
            result.moves.forEach(element => {
                element.version_group_details.forEach(version =>{
                    if(version.version_group.name == "firered-leafgreen" && version.level_learned_at != 0){
                    this.allMoves.push({name: element.move.name, learnedAt: version.level_learned_at, url: element.move.url});
                    
                }
                })
            });
            this.allMoves.sort((a, b) => a.learnedAt - b.learnedAt);
            this.getLearnedMoves();
        })
    }

    getLearnedMoves(){
        const availableMoves = [];
        this.allMoves.forEach(element => {
            if(element.learnedAt <= this.level){
                availableMoves.push(element);
            }
            while(availableMoves.length > 4){
                availableMoves.splice(Math.floor(Math.random()*availableMoves.length),1);
            }
            this.learnedMoves = availableMoves;
        })
        console.log("Learned moves:",this.learnedMoves);

    }

}

export {Pokemon};