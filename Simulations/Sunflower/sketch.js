let angle = 137.5;
let rotation = 0;
let radius = 0;

let lastPoint;

let brightiness = 255;

function setup(){
	createCanvas(640,640);
	background(50);
	angleMode(DEGREES);

	lastPoint = createVector(width/2, height/2);
}

function draw(){
	fill(brightiness,brightiness,0);
	stroke(brightiness,brightiness,0);

	let x = sin(rotation)*radius+width/2;
	let y = cos(rotation)*radius+height/2;

	ellipse(x, y, 2);
	//line(lastPoint.x, lastPoint.y, x, y);

	lastPoint.x = x;
	lastPoint.y = y;
	radius += 0.1;
	rotation += angle;

	if(frameCount % 20 == 0)
		brightiness--;
}