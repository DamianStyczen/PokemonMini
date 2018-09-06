import {Board} from "./board";
import {Character} from "./character";
import {Battle} from "./battle";
import {Player} from "./player";
import {ProfileHandler} from "./profileHandler";
import {PokemonHandler} from "./pokemonHandler";
import { UserInterface } from "./userInterface";
import { Oak } from "./oak";

// SETTING UP CANVAS
const canvas = document.getElementById("board");
const bCtx = canvas.getContext('2d');
const WORLDUNIT = 64;


let stage = "profile";

let profiles = new ProfileHandler();
let pokemonHandler = new PokemonHandler();
let player;
let board = new Board(WORLDUNIT);
let red = new Character(7*WORLDUNIT, 4*WORLDUNIT, WORLDUNIT, board.boardFields);
let ui = new UserInterface(bCtx);
let oak;
let battle;




const update = ()=>{

    bCtx.clearRect(0,0,canvas.width,canvas.height);
    bCtx.fillStyle = "#eaecef";
    bCtx.fillRect(0,0,canvas.width, canvas.height);

    switch(stage){
        case "profile":
        profiles.draw(bCtx);
        if(profiles.stage == "chosen"){
            player = profiles.chosen;
            console.log("Current player:", player);
            stage = "board";
        }
        break;

        case "board":
        board.generateBackground(bCtx);
        red.draw(bCtx);
        if(red.encountered){
            red.encountered = false;
            console.log("Encountered wild pokemon");
            startWildBattle();
        }
        break;

        case "board-oak":
        board.generateBackground(bCtx);
        red.draw(bCtx);
        oak.draw();
        if(oak.over) stage = "board";
        break;

        case "battle":
        if(battle.over){
            stage = "board";
            profiles.updateLocalStorage();
            break;
        }
        bCtx.fillStyle = "#FF0000";
        battle.draw(bCtx, WORLDUNIT);
        break;

    }
}

window.addEventListener('keydown', function(event){
    event.preventDefault();
    switch(stage){
        case "profile":
        profiles.handleKeyPress(event.which);
        break;
        case "board":
        red.handleKeyPress(event.which);
        if(event.which == "90") interactWith(red.checkForInteraction());
        break;

        case "board-oak":
        oak.handleKeyPress(event.which);
        break;

        case "battle":
        battle.handleKeyPress(event.which);
        break;
    }
});

let gameInterval = setInterval(()=>{
    update();
}, 33.33);

function interactWith(object){
    switch(object){
        case "oak":
        oak = new Oak(player, bCtx);
        console.log("hello player");
        stage = "board-oak";
        break;
    }
}
function startWildBattle(){
    battle = new Battle(player, getRandomPokemonId(), bCtx);
    stage = "battle";
}
function getRandomPokemonId(){
    let dice = Math.round(Math.random() * 150 + 1);
    console.log("Dice roll:", dice);
    return dice;
}
