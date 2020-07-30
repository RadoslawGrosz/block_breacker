import {GAME_WIDTH, GAME_HEIGHT, LEVELS,} from './const.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import LevelBuilder from './LevelBuilder.js'
import InputHandler from './InputHandler.js';

export default class Game {
    constructor(){

        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        this.currentLevel = 0;
        this.isRunning = true;
        this.isOver = false
        this.init();  
    }

    init = () => {
        this.paddle = new Paddle();
        this.ball = new Ball(this.paddle);
        this.level = new LevelBuilder(LEVELS[this.currentLevel]);
        this.inputHandler = new InputHandler(this);
        this.gameObjects = [this.paddle, this.ball, ...this.level.blocks];
        window.requestAnimationFrame(this.mainLoop);
    }

    mainLoop = () => {
        this.update();
        this.draw();
        requestAnimationFrame(this.mainLoop);
    }

    update = () => {
        if(!this.isRunning || this.isOver) return;
        this.gameObjects.forEach(object => object.update(this));
        this.gameObjects = this.gameObjects.filter(object => !object.isDestroyed);
        if(this.gameObjects.length === 2){
            if(this.currentLevel < LEVELS.length - 1){
                this.loadNextLevel();
            }else{
                this.isOver = true;
            }

        }
        if(this.isGameOver()){
            this.isOver = true;
        }
    }

    draw = () => {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.gameObjects.forEach(object => object.draw(this.ctx));

        if(!this.isRunning){
            this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
            this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', GAME_WIDTH / 2, GAME_HEIGHT / 2);
        }
        if(this.isOver){
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
            this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER Press enter', GAME_WIDTH / 2, GAME_HEIGHT / 2);
        }
    }

    loadNextLevel = () => {

        if(this.isOver){
            this.isOver = false;
            this.currentLevel = 0;
        }else{
            this.currentLevel++;
        }
        this.ball.speed.y = -5;
        this.ball.pos = {
            x: GAME_WIDTH / 2 - this.ball.size / 2,
            y: this.paddle.pos.y - this.ball.size,
        }
        
        this.level = new LevelBuilder(LEVELS[this.currentLevel]);
        this.gameObjects = [this.paddle, this.ball, ...this.level.blocks];
    }

    isGameOver = () => {
        if(this.ball.pos.y + this.ball.size >= GAME_HEIGHT) return true;
    }
}