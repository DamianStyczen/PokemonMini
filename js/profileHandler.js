import {Player} from "./player";
import {Pokemon} from "./pokemon";
class ProfileHandler{
    constructor(){
        let localProfiles = JSON.parse(localStorage.getItem("profiles"));
        if(localProfiles){
            this.profiles = localProfiles;            
        }
        else{
            this.profiles = [];
        }
        console.log("Profiles", this.profiles);
        this.defaultImage = new Image();
        this.defaultImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
        this.selected = 0;
        this.chosen;
        this.stage = "choose";
        this.nameProvided = "";
        this.nameString = "";
        this.starters = ["bulbasaur", "charmander", "squirtle"];
    }
    handleKeyPress(which){
    if(this.stage == "choose" || this.stage == "choose_starter")
        switch(which){
            case 37: // LEFT
            if(this.selected == 0) this.selected = 1;            
            else if(this.selected == 2) this.selected = 0;            
            break;

            case 39: // RIGHT
            if(this.selected == 1) this.selected = 0;            
            else if(this.selected == 0) this.selected = 2;   
            break;
            case 90: // Z
            this.acceptChoice();
            break;
            case 88: // X
            this.goBack();
            break;
        }
        else if(this.stage == "choose_name")
        switch(which){
            case 37: // LEFT
            this.selected = 0;           
            break;    
            case 39: // RIGHT
            this.selected = 1;   
            break;
            case 38: // UP
            this.selected = 1;            
            break;
            case 40: // DOWN
            this.selected = 2;
            case 90: // Z
            if(this.selected ==0) this.nameString+="Z";
            else this.acceptChoice();
            break;
            case 88: // X
            if(this.selected ==0) this.nameString+="X";
            else this.goBack();
            break;
            case 8: // DELETE
            if(this.selected ==0) this.nameString = this.nameString.substring(0, this.nameString.length-1);
            else this.goBack();
            break;            
            default:
            if(this.selected == 0) this.nameString+=String.fromCharCode(which);
            break;

        }
    }

    draw(context){

        /// PROFILE BOXES        
        const boxWidth = 200;
        const boxHeight = 300;
        const margin = 90
        const rects = [
            {left: margin*2+boxWidth, top: 170, width: boxWidth, height: boxHeight},
            {left: margin, top: 170, width: boxWidth, height: boxHeight},
            {left: margin*3+boxWidth*2, top: 170, width: boxWidth, height: boxHeight},
        ]
        rects.forEach((element,index) =>{
            if(this.selected == index && this.stage != "choose_name"){
                context.fillStyle = "#000";
                context.fillRect(element.left-5, element.top-5, element.width+10, element.height+10);
            }
            context.fillStyle = "#fff";
            context.fillRect(element.left, element.top, element.width, element.height);
            
        })
        switch(this.stage){
            case "choose":
            this.drawProfileChoice(context, rects, boxWidth, boxHeight);
            break;
            case "choose_name":
            this.drawNameChoice(context, rects, boxWidth, boxHeight);
            break;
            case "choose_starter":
            this.drawStarterChoice(context, rects, boxWidth, boxHeight);
            break;
        }
    }
    drawProfileChoice(context, rects, boxWidth, boxHeight){
        context.font = "30px Arial";
        context.textAlign="center"; 
        context.fillStyle = "#000";
        context.fillText("CHOOSE PROFILE",  rects[0].left + rects[0].width/2, rects[0].top/2);
        for(let i = 0; i < 3; i++){
            if(this.profiles[i]){                
                context.fillText(this.profiles[i].name.toUpperCase(), rects[i].left + rects[i].width/2, rects[i].top+50);
                let image = new Image();
                image.src = "https://img.pokemondb.net/sprites/black-white/normal/"+ this.profiles[i].pokemon[0].name +".png"
                context.drawImage(image, 0, 0, image.width, image.height, rects[i].left, rects[i].top + 50, boxWidth, boxWidth);

            }
            else{
                context.fillText("NEW", rects[i].left + rects[i].width/2, rects[i].top+50);
                context.drawImage(this.defaultImage, 0, 0, this.defaultImage.width, this.defaultImage.height, rects[i].left + boxWidth/4, rects[i].top + 100, boxWidth/2, boxWidth/2);
            }

        }
    }

    drawStarterChoice(context, rects, boxWidth, boxHeight){
        
        context.font = "28px Arial";
        context.textAlign="center"; 
        context.fillStyle = "#000";
        context.fillText("CHOOSE YOUR POKEMON",  rects[0].left + rects[0].width/2, rects[0].top/2);
        for(let i = 0; i < 3; i++){
            if(i == this.selected){                
                context.fillText(this.starters[i].toUpperCase(), rects[i].left + rects[i].width/2, rects[i].top+50);
                let image = new Image();
                image.src = "https://img.pokemondb.net/sprites/black-white/normal/" + this.starters[i] + ".png"
                context.drawImage(image, 0, 0, image.width, image.height, rects[i].left, rects[i].top + 50, boxWidth, boxWidth);            
            }
            else{
                context.drawImage(this.defaultImage, 0, 0, this.defaultImage.width, this.defaultImage.height, rects[i].left + boxWidth/4, rects[i].top + 100, boxWidth/2, boxWidth/2);
            }
        }
    }
    drawNameChoice(context, rects, boxWidth, boxHeight){
        context.font = "30px Arial";
        context.textAlign="center"; 
        context.fillStyle = "#000";
        context.fillText("TYPE YOUR NAME",  rects[0].left + rects[0].width/2, rects[0].top/2);
        for(let i = 0; i < 3; i++){            
                context.drawImage(this.defaultImage, 0, 0, this.defaultImage.width, this.defaultImage.height, rects[i].left + boxWidth/4, rects[i].top + 100, boxWidth/2, boxWidth/2);
        }
        if(this.selected == 0){
            context.fillStyle = "#000";
            context.fillRect(0, 440, 660, 200);
            context.fillStyle = "#3a4e70";
            context.fillRect(10, 450, 640, 180);
        }
        else{
            context.fillStyle = "#3a4e70";
            context.fillRect(0, 440, 660, 200);
        }
        context.fillStyle = "#FFF";
        context.font = "40px Arial";
        if(this.nameString.length > 8) this.nameString = this.nameString.substring(0, 8);
        context.fillText(this.nameString,  330, 540);

        if(this.selected > 0){
            context.fillStyle = "#000";
            context.fillRect(660, 440, 300, 200);
            context.fillStyle = "#FFF";
            context.fillRect(665, 445, 290, 190);
        }
        else{
            context.fillStyle = "#FFF";
            context.fillRect(660, 440, 300, 200);            
        }
        context.font = "30px Arial";
        context.fillStyle = "#000";
        context.fillText("ACCEPT",  820, 510);
        context.fillText("RETURN",  820, 600);
        if(this.selected == 1) context.fillRect(720, 490, 20, 20);
        else if (this.selected == 2) context.fillRect(720, 580, 20, 20);


    }
    

    acceptChoice(){
        switch(this.stage){
            case "choose":
                if(this.profiles[this.selected]){
                    this.chosen = this.profiles[this.selected];
                    console.log(this.chosen);
                    this.stage = "chosen";
                }
                else{
                    this.stage = "choose_name";
                    this.selected = 0;
                
                }
            break;
            case "choose_name":
                this.nameProvided = this.nameString;
                this.stage = "choose_starter";
                this.selected = 0;
            break;
            case "choose_starter":
                this.chosen = new Player(this.nameProvided, new Pokemon(this.selected*3+1, 5));
                this.chosen.pokemon[0].name = this.starters[this.selected]; 
                this.profiles.push(this.chosen);
                this.updateLocalStorage();
                this.stage = "chosen";
            break;
        }
    }
    updateLocalStorage(){
            this.awaitTime = 0;
            this.updateID = setInterval(()=>{
                if(this.chosen.pokemon[0].loaded){
                    localStorage.setItem("profiles", JSON.stringify(this.profiles));
                    clearInterval(this.updateID);
                    console.log("Updating local storage. Await time:", this.awaitTime);        
                }
                else{
                    this.awaitTime += 1;
                }

            }, 1000);
    }
}

export {ProfileHandler};