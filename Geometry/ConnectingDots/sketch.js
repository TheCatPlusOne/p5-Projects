var dotSize = 10;
var dots = [];
var dot;

function setup(){
	createCanvas(640, 640);
}

function draw(){
	background(47);
	for(let i = 0; i < dots.length; i++){
		dots[i].drawDot();
		dots[i].drawLines(dots);
	}
}

function mousePressed(){
	dot = new Dot(mouseX, mouseY);
	dots.push(dot);
}

function Dot(x, y){
	this.x = x;
	this.y = y;

	this.drawDot = function(){
		ellipse(x, y, dotSize);
	}

	this.drawLines = function(_dots){
		stroke(255);
		for(let i = 0; i < _dots.length; i++)
			line(this.x, this.y, dots[i].x, dots[i].y);
	}
}