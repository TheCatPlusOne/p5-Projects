let angle;

function setup(){
	createCanvas(640, 640);
	angleMode(DEGREES);
	stroke(255);
}

function draw(){
	background(50);

	angle = map(mouseX, 0, width, 0, 180);

	createTree(width/2, height, 150, angle, 11);
}

function createTree(x, y, size, angle, iteration){
	translate(x, y);
	drawBranch(size, angle, iteration);
}

function drawBranch(size, angle, iteration){
	if(iteration > 0){
		line(0, 0, 0, -size);
		translate(0, -size);

		push();
		rotate(angle);
		drawBranch(size/1.4, angle, iteration-1);
		pop();

		push();
		rotate(-angle);
		drawBranch(size/1.4, -angle, iteration-1);
		pop();
	}
}