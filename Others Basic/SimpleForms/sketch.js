let radious = 50;
let width = 100;

function setup(){
	createCanvas(640, 320);
	background(47);
}

function draw(){
	stroke(255);
	fill(0,0,0,0);
	rect(320, 160, width, width);

	ellipse(mouseX, mouseY, radious, radious);
}

function mousePressed(){
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, radious, radious);
}