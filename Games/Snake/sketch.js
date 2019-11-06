let snake;
let cellSize = 32;
let food;

function setup(){
	createCanvas(640,640);
	noStroke();
	
	snake = new Snake(width/2, height/2, cellSize);

	food = createVector(0,0);
	setFood();
}

function draw(){
	background(50);

	push();
	fill(255);
	rect(food.x, food.y, cellSize, cellSize);
	pop();

	snake.drawSnake();
	drawGrid([255, 50]);
	
	if(frameCount % 5 == 0){
		if(snake.head.position.equals(food)){
			setFood();
			snake.grow();
		}else{
			snake.move();
		}
	}
}

function keyPressed() {
	snake.setDirection(keyCode);
}

function mousePressed(){
	snake.grow();
}

function drawGrid(color){
	push();
	stroke(color);
	for(let y = 0; y <= height; y += cellSize){
		line(0, y, width, y);
	}

	for(let x = 0; x <= width; x += cellSize){
		line(x, 0, x, height);
	}
	pop();
}

function setFood(){
	let x, y, foodPos;
	let relocate;
	do{
		relocate = false;
		x = Math.floor(Math.random() * width/cellSize) * cellSize;
		y = Math.floor(Math.random() * height/cellSize) * cellSize;
		foodPos = createVector(x, y);

		snake.bodyParts.forEach(e => {
			if(foodPos.equals(e.position))
				relocate = true;
		});
	}while(relocate);
	
	food.set(foodPos);
}