class Pokemon{
    
    constructor(id, level){
        this.id = id;
        this.name;
        this.level = level;
        this.spriteFront = new Image();
        this.spriteBack = new Image();
        this.stats = [];
        this.loaded = false;
        this.currentHP = 0;
        
        

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+ this.id +"/"
        }).done((result)=>{
            this.name = result.name;
            //this.spriteFront.src = result.sprites.front_default; //POKEAPI
            this.spriteFront.src = "https://img.pokemondb.net/sprites/black-white/normal/"+this.name+".png";
            // this.spriteBack.src = result.sprites.back_default; // POKEAPI
            this.spriteBack.src = "https://img.pokemondb.net/sprites/black-white/back-normal/"+this.name+".png";
            result.stats.forEach((element)=>{
                this.stats.push({name: element.stat.name, value: element.base_stat});                
            });
            this.loaded = true;
            this.currentHP = this.stats.find(element => {return element.name == "hp"}).value;
        })
    }
}

export {Pokemon};