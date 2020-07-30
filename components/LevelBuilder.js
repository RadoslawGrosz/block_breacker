import Block from './Block.js'

export default class LevelBuilder{
    constructor(level){
        this.blocks = [];
        for(let i = 0; i < level.length; i++){
            for(let j = 0; j < level[i].length; j++){
                if (level[i][j]){
                    this.blocks.push(new Block(j * 100, i * 70 + 50));
                }
            }
        }
    }
}