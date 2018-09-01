class Player{
    constructor(name, starter){
        this.name = name;
        this.pokemon = [starter];
        this.collection = [];        
        this.pokeballs = 5;
        this.money = 0;
    }
    
}

export {Player};