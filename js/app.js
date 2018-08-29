import {Board} from "./board";
import {Character} from "./character";
import {Battle} from "./battle";

let boardFields = [
    ["grass","grass", "grass", "grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["bush","grass", "grass", "grass", "grass", "grass", "grass", "grass", "bush", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["bush","grass", "bush", "grass", "bush", "grass", "bush", "grass", "bush", "grass", "grass", "grass", "bush", "bush", "bush"],
    ["bush","bush", "grass", "grass", "bush", "grass", "bush", "grass", "bush", "bush", "bush", "grass", "bush", "grass", "bush"],
    ["bush","grass", "bush", "grass", "bush", "grass", "bush", "grass", "bush", "grass", "bush", "grass", "bush", "bush", "bush"],
    ["bush","grass", "bush", "grass", "bush", "bush", "bush", "grass", "bush", "bush", "bush", "grass", "bush", "grass", "bush"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
    ["grass","grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
];

const canvas = document.getElementById("board");
const bCtx = canvas.getContext('2d');
const WORLDUNIT = 64;

let red = new Character(7*WORLDUNIT, 4*WORLDUNIT, WORLDUNIT, boardFields);
let board = new Board(boardFields, WORLDUNIT);
let battle = new Battle(1, 1, bCtx);

const update = ()=>{

    bCtx.clearRect(0,0,canvas.width,canvas.height);
    bCtx.fillStyle = "#eaecef";
    bCtx.fillRect(0,0,canvas.width, canvas.height);
    //board.generateBackground(bCtx);
    //red.draw(bCtx);
    bCtx.fillStyle = "#FF0000";
    battle.draw(bCtx, WORLDUNIT);

}

window.addEventListener('keydown', function(event){
    event.preventDefault();
    switch(event.which){
        case 37:
        red.rotate("left");
        red.startMoving();
        break;
        case 39:
        red.rotate("right");
        red.startMoving();
        break;
        case 38:
        red.rotate("up");
        red.startMoving();
        break;
        case 40:
        red.rotate("down");
        red.startMoving();
        break;
    }

});

let gameInterval = setInterval(()=>{
    update();
}, 33.33);