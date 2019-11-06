let CELL_SIZE = 16;

let snake;
let food;

function setup(){
	createCanvas(640,640);
	rectMode(CENTER);
	noStroke();

	frameRate(8);
	
	snake = new Snake(width/2, height/2, 3);
}

function draw(){
	background(50);

	snake.move();
	snake.draw();
}

function mousePressed(){
	snake.grow();
}

function keyPressed() {
	let newDirection = getDirection(keyCode);
	if(newDirection)
		snake.dir = newDirection;

	console.log(newDirection);
}