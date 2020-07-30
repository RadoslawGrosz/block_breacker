const detectCollision = (ball, object) => {
    const objectLeft = object.pos.x;
    const objectRight = object.pos.x + object.width;
    const objectTop = object.pos.y;
    const objectBot = object.pos.y + object.height;

    //cheching colision with blocks and paddle
    if (
        ball.pos.y + ball.size >= objectTop &&
        ball.pos.y <= objectBot &&
        ball.pos.x + ball.size >= objectLeft &&
        ball.pos.x <= objectRight 
        )
        {
            return true;
        }
    else return false
}

export default detectCollision;