import detectCollision from './collisionHandler.js';


export default class Block{
    constructor(x,y){
        this.width = 80;
        this.height = 50;
        this.pos = {
            x,
            y,
        }    
        this.isDestroyed = false;
    }

    update = (game) => {
        if(detectCollision(game.ball, this)){
            this.isDestroyed = true;
            game.ball.speed.y = -game.ball.speed.y;
        }
    }

    draw = (ctx) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}