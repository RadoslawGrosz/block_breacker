import LevelBuilder from './LevelBuilder.js';
import {GAME_WIDTH, } from './const.js';

export default class InputHandler{
    constructor(game){
        document.addEventListener('keydown', (e) => {
            switch(e.keyCode){
                case 37:
                    game.paddle.moveLeft();
                    break;
                case 39:
                    game.paddle.moveRight();
                    break;
                case 27:
                    game.isRunning = !game.isRunning;
                case 13:
                    if(game.isOver){
                        game.loadNextLevel();
                    }
            }
        })
        document.addEventListener('keyup', (e) => {
            switch(e.keyCode){
                case 37:
                    if(game.paddle.currentSpeed < 0){
                    game.paddle.stop();
                    }
                    break;
                case 39:
                    if(game.paddle.currentSpeed > 0){
                    game.paddle.stop();
                    }
                    break;
            }
        })
    }
}