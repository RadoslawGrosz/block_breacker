import { GAME_WIDTH, GAME_HEIGHT } from "./const.js";

export default class Paddle {
    constructor(){
        this.height = 20;
        this.width = 120;
        this.pos = {
            x: GAME_WIDTH / 2 - this.width / 2,
            y: GAME_HEIGHT - this.height - 20,
        };
        this.maxSpeed = 5;
        this.currentSpeed = 0;
    }

    update(){
        this.pos.x += this.currentSpeed;

        if(this.pos.x <= 0){
            this.pos.x = 0;
        } 
        else if(this.pos.x + this.width > GAME_WIDTH) {
            this.pos.x = GAME_WIDTH - this.width;
        }
    }

    moveRight(){
        if(this.speed > 0) return;
        this.currentSpeed = this.maxSpeed;
    }

    moveLeft(){
        if(this.speed < 0) return;
        this.currentSpeed = -this.maxSpeed;
    }

    stop(){
        this.currentSpeed = 0;
    }

    draw(ctx){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.pos.x,this.pos.y, this.width,this.height);
    }
}