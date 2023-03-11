document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = (width / 4) * 3;
//canvas.width = width;
//canvas.height = height;
canvas.width = 1200
canvas.height = 900

const rectSize = 20;
const rectX = canvas.width / 2 - rectSize / 2;
const rectY = canvas.height / 2 - rectSize / 2;

let controls = {
    'w': false,
    'a': false,
    's': false,
    'd': false,
}

let snake = {
    'direction': [+1, +0], //  [x, y]
    'body': [
        [1, 0],
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0]
    ]
}

function onKeyDown(event) {
    if (controls[event.key] != undefined) {
        controls[event.key] = false;
        translateDirection(event.key);
        console.log(snake.direction)
    }
}

function onKeyUp(event) {
    if (controls[event.key] != undefined) {
        controls[event.key] = true;
        translateDirection(event.key);
        console.log(snake.direction)
    }
}

function translateDirection(newDir) {
    snake.direction = {
        'w': [+0, -1],
        'a': [-1, +0],
        's': [+0, +1],
        'd': [+1, +0],
    } [newDir]
}

function moveSnake() {
    display()
    snake.body[0][0] += snake.direction[0];
    snake.body[0][1] += snake.direction[1];
    for (let i = snake.body.length - 1; i >= 0; i--) {
        //console.log(i, i - 1)
        //console.log(snake.body[i], snake.body[i - 1])
        if (i - 1 >= 0) {
            snake.body[i][0] = snake.body[i - 1][0];
            snake.body[i][1] = snake.body[i - 1][1];
        }
        displaySnakePart(snake.body[i][0], snake.body[i][1])
    }
    console.log(snake)
}

function growSnake() {
    snake.body.push(snake.body[snake.body.length - 1]);
}

function displaySnakePart(x, y) {
    console.log(x, y)
    ctx.fillStyle = "green";
    ctx.fillRect(rectX + (rectSize * x), rectY + (rectSize * y), rectSize, rectSize); // snek
}

function display() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lime";
    ctx.fillRect(rectX + 600, rectY + 450, rectSize, rectSize); // corner
    ctx.fillRect(rectX - 600, rectY + 450, canvas.width, rectSize); // side
    ctx.fillRect(rectX - 600, rectY - 450, canvas.width, rectSize); // side
    ctx.fillRect(rectX + 600, rectY - 450, rectSize, canvas.height); // side
    ctx.fillRect(rectX - 600, rectY - 450, rectSize, canvas.height); // side
    ctx.fillStyle = "white";
    ctx.fillRect(rectX + 20, rectY + 20, rectSize, rectSize); // food
}

function gameLoop() {
    moveSnake();
    setTimeout(gameLoop, 500);
}

gameLoop();