let x = 0, y = 0;

function setup(){
	createCanvas(640, 640);
	rectMode(CENTER);
	y = height/2;
}

function draw(){
	background(50);

	rect(x, y, 100, 100)
	x = (x + 1) % (width + 1);
}