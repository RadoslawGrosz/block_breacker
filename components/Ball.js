import {GAME_WIDTH, GAME_HEIGHT} from './const.js';
import detectCollision from './collisionHandler.js';

export default class Ball{
    constructor(paddle){
        this.size = 19;
        this.pos = {
            x: GAME_WIDTH / 2 - this.size / 2,
            y: paddle.pos.y - this.size,
        }
        this.speed = {
            x: 5,
            y: 5,
        }
    }

    update = (game) => {
        this.checkCollision();
        if(detectCollision(this, game.paddle)){
            this.speed.y = -this.speed.y;
            this.pos.y = game.paddle.pos.y - this.size;
        }
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }

    draw = (ctx) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    checkCollision = () => {
        if(this.pos.x <= 0 || this.pos.x + this.size >= GAME_WIDTH){
            this.speed.x = -this.speed.x;
        }if(this.pos.y <= 0){
            this.speed.y = -this.speed.y;
        }
    }
}